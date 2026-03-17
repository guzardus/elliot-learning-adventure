#!/usr/bin/env python3
"""
AI Image Generation Pipeline for Elliot's Learning Adventure
Following COMPREHENSIVE-BUILD-PLAN.md 3-Model Strategy

Usage: python3 generate-images.py
"""

import requests
import base64
import os
import json
from pathlib import Path
from typing import Optional

# Configuration
API_KEY = os.getenv('OPENROUTER_API_KEY', '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')
OUTPUT_DIR = Path('/Users/chen/Learning Project 1/prototype/elliot-adventure/public/images/reading')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://elliot-adventure.local",
    "X-Title": "Elliot's Learning Adventure"
}

# Generation tracking
GENERATION_LOG = []

# ============================================================
# 3-MODEL STRATEGY IMPLEMENTATION
# ============================================================

def generate_with_model(prompt: str, model: str, output_path: Path) -> Optional[Path]:
    """Generate image with specified model"""
    try:
        print(f"  → Generating with {model}...")
        
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=HEADERS,
            json={
                "model": model,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    }
                ]
            },
            timeout=120
        )
        
        if response.status_code != 200:
            print(f"  ✗ API error: {response.status_code}")
            return None
        
        data = response.json()
        
        # Extract image data
        if 'choices' in data and len(data['choices']) > 0:
            message = data['choices'][0].get('message', {})
            
            # Handle different response formats
            if 'content' in message:
                content = message['content']
                
                # Check if content is a list (multimodal)
                if isinstance(content, list):
                    for item in content:
                        if item.get('type') == 'image_url':
                            img_url = item.get('image_url', {}).get('url', '')
                            return save_image_from_url(img_url, output_path)
                
                # Check for inline image data
                elif isinstance(content, str) and content.startswith('data:image'):
                    return save_image_from_base64(content, output_path)
                
                # Check for URL in string
                elif isinstance(content, str) and content.startswith('http'):
                    return save_image_from_url(content, output_path)
        
        print(f"  ✗ No image data in response")
        return None
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return None

def save_image_from_base64(data_url: str, output_path: Path) -> Optional[Path]:
    """Save image from base64 data URL"""
    try:
        if ',' in data_url:
            base64_data = data_url.split(',')[1]
        else:
            base64_data = data_url
        
        image_data = base64.b64decode(base64_data)
        
        with open(output_path, 'wb') as f:
            f.write(image_data)
        
        print(f"  ✓ Saved: {output_path.name}")
        return output_path
        
    except Exception as e:
        print(f"  ✗ Save error: {e}")
        return None

def save_image_from_url(url: str, output_path: Path) -> Optional[Path]:
    """Download and save image from URL"""
    try:
        if url.startswith('data:image'):
            return save_image_from_base64(url, output_path)
        
        response = requests.get(url, timeout=60)
        
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            
            print(f"  ✓ Saved: {output_path.name}")
            return output_path
        else:
            print(f"  ✗ Download failed: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"  ✗ Download error: {e}")
        return None

def generate_with_fallback(prompt: str, output_path: Path) -> Optional[Path]:
    """
    3-Model Strategy:
    1. Try Nano Banana Pro (paid, highest quality)
    2. Fall back to Nano Banana 2 (FREE)
    3. Fall back to GPT-5 Image (FREE)
    """
    
    # Model 1: Nano Banana Pro (Primary - paid, best quality)
    print(f"Trying Model 1: Nano Banana Pro...")
    result = generate_with_model(
        prompt,
        "google/gemini-3-pro-image-preview",
        output_path
    )
    if result:
        GENERATION_LOG.append({"file": output_path.name, "model": "nano-banana-pro", "success": True})
        return result
    
    # Model 2: Nano Banana 2 (Backup 1 - FREE)
    print(f"Model 1 failed. Trying Model 2: Nano Banana 2 (FREE)...")
    result = generate_with_model(
        prompt,
        "google/gemini-3.1-flash-image-preview",
        output_path
    )
    if result:
        GENERATION_LOG.append({"file": output_path.name, "model": "nano-banana-2", "success": True})
        return result
    
    # Model 3: GPT-5 Image (Backup 2 - FREE)
    print(f"Model 2 failed. Trying Model 3: GPT-5 Image (FREE)...")
    result = generate_with_model(
        prompt,
        "openai/gpt-5-image",
        output_path
    )
    if result:
        GENERATION_LOG.append({"file": output_path.name, "model": "gpt-5-image", "success": True})
        return result
    
    GENERATION_LOG.append({"file": output_path.name, "model": "all-failed", "success": False})
    return None

# ============================================================
# ASSET GENERATION
# ============================================================

ASSETS_TO_GENERATE = [
    {
        "id": "reading-ranger",
        "filename": "reading-ranger.png",
        "prompt": """Watercolor illustration of a friendly young explorer character for children's educational game.
        
        Character: 8-year-old boy or girl (gender-neutral), adventurous and curious expression
        Clothing: Safari hat (khaki), green explorer vest, compass necklace
        Pose: Standing confidently, holding a compass, slight smile
        Style: Breath of the Wild inspired watercolor aesthetic, soft edges, hand-painted feel
        Background: Transparent or soft watercolor wash
        Colors: Earth tones (khaki, green), warm skin, golden compass accents
        Mood: Friendly, adventurous, welcoming to children
        
        Technical: Centered composition, suitable for circular crop, high detail on face and compass"""
    },
    {
        "id": "story-vines-icon",
        "filename": "story-vines-icon.png",
        "prompt": """Watercolor icon of a magical storybook wrapped in jungle vines.
        
        Subject: Open storybook with visible pages, green vines wrapping around it
        Details: Soft glowing pages, a few leaves sprouting from vines
        Style: Breath of the Wild watercolor aesthetic, children's book illustration
        Background: Transparent or soft white
        Colors: Green vines, cream/yellow pages, soft gold glow
        Shape: Square format, centered, suitable for app icon
        
        Mood: Magical, educational, adventurous"""
    },
    {
        "id": "vocab-treasures-icon",
        "filename": "vocab-treasures-icon.png",
        "prompt": """Watercolor icon of a treasure chest overflowing with word cards and golden coins.
        
        Subject: Classic treasure chest, slightly open, contents spilling out
        Details: Golden coins, word cards visible, magical sparkles
        Style: Breath of the Wild watercolor aesthetic, children's book illustration
        Background: Transparent or soft white
        Colors: Rich browns (chest), gold (coins and sparkles), hints of color from word cards
        Shape: Square format, centered, suitable for app icon
        
        Mood: Discovery, reward, treasure hunting"""
    },
    {
        "id": "temple-inference-icon",
        "filename": "temple-inference-icon.png",
        "prompt": """Watercolor icon of an ancient mysterious temple entrance.
        
        Subject: Stone temple entrance with columns, partially covered in jungle vines
        Details: Two flaming torches on either side, stone steps leading up
        Style: Breath of the Wild watercolor aesthetic, children's book illustration
        Background: Transparent or soft white
        Colors: Gray stones, warm orange torch flames, green vines
        Shape: Square format, centered, suitable for app icon
        
        Mood: Mystery, ancient knowledge, adventure"""
    },
    {
        "id": "reading-background",
        "filename": "reading-background.png",
        "prompt": """Watercolor landscape of a lush jungle rainforest at golden hour.
        
        Scene: Dense jungle with multiple transparent leaf layers
        Elements: Ancient stone ruins partially hidden by vines, distant mountains
        Lighting: Golden sunlight filtering through canopy as watercolor splashes
        Style: Breath of the Wild aesthetic, soft atmospheric perspective
        Colors: Multiple green washes (jade, moss), golden sunlight, earth browns
        Composition: Wide landscape format, suitable for website background
        
        Mood: Mysterious, adventurous, discovery-filled, serene
        
        Technical: Light enough for text overlay, depth through layering"""
    },
    {
        "id": "badge-bookworm",
        "filename": "badge-bookworm.png",
        "prompt": """Watercolor badge icon of a cute bookworm reading a book.
        
        Subject: Friendly bookworm character curled around an open book
        Style: Circular badge design, Breath of the Wild watercolor aesthetic
        Background: Soft green circular badge background
        Colors: Green (worm), cream/yellow (book), soft earth tones
        Shape: Circular, suitable for achievement badge
        
        Mood: Encouraging, cute, educational achievement"""
    },
    {
        "id": "badge-wordcollector",
        "filename": "badge-wordcollector.png",
        "prompt": """Watercolor badge icon of a collection of glowing word gems.
        
        Subject: Magical word gems or crystals in a treasure pouch
        Style: Circular badge design, Breath of the Wild watercolor aesthetic
        Background: Soft gold/amber circular badge background
        Colors: Gold, amber, rainbow hints from gems
        Shape: Circular, suitable for achievement badge
        
        Mood: Treasure, achievement, vocabulary mastery"""
    },
    {
        "id": "badge-detective",
        "filename": "badge-detective.png",
        "prompt": """Watercolor badge icon of a magnifying glass revealing hidden clues.
        
        Subject: Magnifying glass with mystery sparkles or hidden symbols visible
        Style: Circular badge design, Breath of the Wild watercolor aesthetic
        Background: Soft blue/gray circular badge background
        Colors: Silver/glass (magnifier), mysterious blue sparkles
        Shape: Circular, suitable for achievement badge
        
        Mood: Mystery, discovery, reading detective"""
    },
    {
        "id": "vine-platform",
        "filename": "vine-platform.png",
        "prompt": """Watercolor illustration of a jungle tree platform connected by vines.
        
        Subject: Wooden platform high in jungle canopy, connected by thick vines
        Details: Rope bridge, leaves, distant jungle depth
        Style: Breath of the Wild watercolor aesthetic
        Background: Transparent for overlay use
        Colors: Brown (wood), green (vines/leaves)
        
        Mood: Adventure, height, progression marker"""
    }
]

# ============================================================
# MAIN EXECUTION
# ============================================================

def main():
    """Generate all Reading Rainforest assets"""
    print("=" * 60)
    print("AI IMAGE GENERATION - Reading Rainforest Assets")
    print("Following COMPREHENSIVE-BUILD-PLAN.md 3-Model Strategy")
    print("=" * 60)
    print()
    
    successful = 0
    failed = 0
    
    for i, asset in enumerate(ASSETS_TO_GENERATE, 1):
        print(f"[{i}/{len(ASSETS_TO_GENERATE)}] Generating: {asset['id']}")
        print(f"  Output: {asset['filename']}")
        
        output_path = OUTPUT_DIR / asset['filename']
        
        # Skip if already exists
        if output_path.exists():
            print(f"  ⏭ Skipped (already exists)")
            successful += 1
            continue
        
        # Generate with fallback strategy
        result = generate_with_fallback(asset['prompt'], output_path)
        
        if result:
            successful += 1
        else:
            failed += 1
            print(f"  ✗ All models failed for {asset['id']}")
        
        print()
    
    # Summary
    print("=" * 60)
    print("GENERATION COMPLETE")
    print("=" * 60)
    print(f"Successful: {successful}/{len(ASSETS_TO_GENERATE)}")
    print(f"Failed: {failed}/{len(ASSETS_TO_GENERATE)}")
    print()
    
    # Save log
    log_path = OUTPUT_DIR / 'generation-log.json'
    with open(log_path, 'w') as f:
        json.dump(GENERATION_LOG, f, indent=2)
    
    print(f"Log saved: {log_path}")
    print(f"Images saved: {OUTPUT_DIR}")

if __name__ == '__main__':
    main()
