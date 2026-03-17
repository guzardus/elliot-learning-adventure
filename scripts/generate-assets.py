#!/usr/bin/env python3
"""
Generate Reading Rainforest assets using OpenRouter Nano Banana (PAID)
Fixed extraction logic - images are in message.images array
"""

import requests
import os
import json
import base64
import re
from pathlib import Path
from typing import Optional, Tuple

API_KEY = os.getenv('OPENROUTER_API_KEY', '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')
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images" / "reading-rainforest"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://elliot-adventure.local",
    "X-Title": "Elliot's Learning Adventure"
}

# PAID Nano Banana Strategy
MODELS = [
    "google/gemini-2.5-flash-image",       # Standard Nano Banana - PAID
    "google/gemini-3-pro-image-preview",   # Nano Banana Pro - PAID (premium quality)
]

# Asset definitions with prompts
ASSETS = [
    {
        "id": "reading-ranger",
        "filename": "reading-ranger.png",
        "prompt": "A friendly young explorer character with a safari hat, holding a compass, wearing khaki adventure clothes. Warm and inviting expression. Watercolor children book illustration style, soft green jungle tones, white background.",
        "category": "characters"
    },
    {
        "id": "story-vines",
        "filename": "story-vines.png", 
        "prompt": "A magical vine with leaves wrapped around an open storybook, glowing softly. Green vines, golden light from book pages. Watercolor illustration, children book style, white background.",
        "category": "activities"
    },
    {
        "id": "vocab-treasures",
        "filename": "vocab-treasures.png",
        "prompt": "A treasure chest overflowing with glowing word cards and golden coins. Warm gold and amber tones, magical sparkles. Watercolor illustration, children book style, white background.",
        "category": "activities"
    },
    {
        "id": "temple-inference",
        "filename": "temple-inference.png",
        "prompt": "An ancient stone temple entrance with torches, mysterious and inviting. Warm torchlight, cool stone shadows. Watercolor illustration, adventure game style, white background.",
        "category": "activities"
    },
    {
        "id": "badge-bookworm",
        "filename": "badge-bookworm.png",
        "prompt": "A cute bookworm character reading a book, circular badge design. Friendly and encouraging. Cartoon style, bold outlines, vibrant colors.",
        "category": "badges"
    },
    {
        "id": "badge-wordcollector",
        "filename": "badge-wordcollector.png",
        "prompt": "A collection of glowing word gems in a treasure pouch, circular badge. Magical sparkles, warm colors. Cartoon style, bold outlines.",
        "category": "badges"
    },
    {
        "id": "badge-detective",
        "filename": "badge-detective.png",
        "prompt": "A magnifying glass revealing hidden clues, detective theme, circular badge. Mystery and discovery feel. Cartoon style, bold outlines.",
        "category": "badges"
    },
    {
        "id": "vocab-definition",
        "filename": "vocab-definition.png",
        "prompt": "An open dictionary book with golden light, educational and magical. Watercolor illustration, warm tones, white background.",
        "category": "vocab"
    },
    {
        "id": "vocab-synonym",
        "filename": "vocab-synonym.png",
        "prompt": "Two matching puzzle pieces fitting together, symbolizing similar words. Blue and green tones. Watercolor illustration, white background.",
        "category": "vocab"
    },
    {
        "id": "vocab-context",
        "filename": "vocab-context.png",
        "prompt": "A magnifying glass over a sentence, highlighting a word. Soft focus effect. Watercolor illustration, white background.",
        "category": "vocab"
    },
    {
        "id": "vocab-antonym",
        "filename": "vocab-antonym.png",
        "prompt": "Two arrows pointing in opposite directions, symbolizing opposites. Contrasting warm and cool colors. Watercolor illustration, white background.",
        "category": "vocab"
    },
]


def extract_image_from_response(data: dict) -> Optional[Tuple[bytes, str]]:
    """Extract image bytes and mime type from OpenRouter response.
    
    OpenRouter Nano Banana returns images in message.images array:
    message: {
        content: "text description...",
        images: [{
            type: "image_url",
            image_url: { url: "data:image/png;base64,..." }
        }]
    }
    """
    try:
        message = data.get('choices', [{}])[0].get('message', {})
        
        # NEW: Images are in message.images array (OpenRouter format)
        images = message.get('images', [])
        if images and len(images) > 0:
            image_data = images[0]
            if image_data.get('type') == 'image_url':
                url = image_data.get('image_url', {}).get('url', '')
                if url.startswith('data:'):
                    # Parse data URL: data:image/png;base64,XXXXX
                    header, b64data = url.split(',', 1)
                    mime_type = header.split(';')[0].split(':')[1]
                    return base64.b64decode(b64data), mime_type
        
        # Fallback: Check content for inline data (legacy format)
        content = message.get('content', '')
        if isinstance(content, list):
            for part in content:
                if isinstance(part, dict) and 'inline_data' in part:
                    inline = part['inline_data']
                    mime_type = inline.get('mime_type', 'image/png')
                    return base64.b64decode(inline['data']), mime_type
                    
                if isinstance(part, dict) and part.get('type') == 'image_url':
                    url = part.get('image_url', {}).get('url', '')
                    if url.startswith('data:'):
                        header, b64data = url.split(',', 1)
                        mime_type = header.split(';')[0].split(':')[1]
                        return base64.b64decode(b64data), mime_type
        
        if isinstance(content, str) and content.startswith('data:image'):
            header, b64data = content.split(',', 1)
            mime_type = header.split(';')[0].split(':')[1]
            return base64.b64decode(b64data), mime_type
            
    except Exception as e:
        print(f"    Extraction error: {e}")
    
    return None


def generate_image(prompt: str, asset_id: str) -> Optional[bytes]:
    """Generate image with fallback strategy."""
    errors = []
    
    for model_id in MODELS:
        try:
            print(f"    Trying {model_id.split('/')[-1]}...", end=" ", flush=True)
            
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=HEADERS,
                json={
                    "model": model_id,
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": prompt}
                            ]
                        }
                    ]
                },
                timeout=120
            )
            
            if response.status_code != 200:
                error_msg = f"HTTP {response.status_code}"
                try:
                    error_data = response.json()
                    error_msg = error_data.get('error', {}).get('message', error_msg)
                except:
                    pass
                errors.append(f"{model_id}: {error_msg}")
                print(f"❌ ({error_msg[:30]}...)")
                continue
            
            data = response.json()
            result = extract_image_from_response(data)
            
            if result:
                image_data, mime_type = result
                print(f"✅ ({len(image_data)} bytes, {mime_type})")
                return image_data
            else:
                # Debug: show what we got
                msg_keys = list(data.get('choices', [{}])[0].get('message', {}).keys())
                errors.append(f"{model_id}: No image found. Keys: {msg_keys}")
                print(f"❌ (no image - keys: {msg_keys})")
                
        except requests.exceptions.Timeout:
            errors.append(f"{model_id}: Timeout after 120s")
            print("❌ (timeout)")
        except Exception as e:
            errors.append(f"{model_id}: {str(e)}")
            print(f"❌ ({str(e)[:30]}...)")
    
    print(f"    All models failed: {errors}")
    return None


def create_placeholder(asset_id: str, size: int = 256) -> bytes:
    """Create a simple SVG placeholder."""
    hue = hash(asset_id) % 360
    initial = asset_id[0].upper() if asset_id else '?'
    
    svg = f'''<svg width="{size}" height="{size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="hsl({hue},70%,75%)"/>
                <stop offset="100%" stop-color="hsl({(hue + 40) % 360},70%,55%)"/>
            </linearGradient>
        </defs>
        <rect width="{size}" height="{size}" fill="url(#g)" rx="24"/>
        <text x="50%" y="50%" font-family="Georgia,serif" font-size="80" 
              fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">{initial}</text>
    </svg>'''
    
    return svg.encode('utf-8')


def main():
    """Main generation routine."""
    print("=" * 70)
    print("Reading Rainforest Asset Generator")
    print("Using PAID OpenRouter Nano Banana Models")
    print("=" * 70)
    
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"\nOutput directory: {OUTPUT_DIR}")
    
    generated = []
    failed = []
    
    for i, asset in enumerate(ASSETS, 1):
        print(f"\n[{i}/{len(ASSETS)}] Generating: {asset['id']}")
        print(f"    Prompt: {asset['prompt'][:60]}...")
        
        output_path = OUTPUT_DIR / asset['filename']
        
        image_data = generate_image(asset['prompt'], asset['id'])
        
        if image_data:
            with open(output_path, 'wb') as f:
                f.write(image_data)
            generated.append(asset['id'])
            print(f"    💾 Saved: {output_path}")
        else:
            placeholder_data = create_placeholder(asset['id'])
            placeholder_path = output_path.with_suffix('.svg')
            with open(placeholder_path, 'wb') as f:
                f.write(placeholder_data)
            failed.append(asset['id'])
            print(f"    ⚠️  Placeholder saved: {placeholder_path}")
        
        if i < len(ASSETS):
            import time
            time.sleep(1)
    
    print("\n" + "=" * 70)
    print("GENERATION COMPLETE")
    print("=" * 70)
    print(f"\n✅ Successfully generated: {len(generated)}/{len(ASSETS)}")
    for g in generated:
        print(f"   • {g}")
    
    if failed:
        print(f"\n⚠️  Placeholders created: {len(failed)}")
        for f in failed:
            print(f"   • {f}")
    
    print(f"\n💰 Estimated cost: ~${len(generated) * 0.0000003:.6f}")
    print(f"📁 Output: {OUTPUT_DIR}")
    
    manifest = {
        "generated": generated,
        "failed": failed,
        "total": len(ASSETS),
        "models_used": MODELS,
        "output_dir": str(OUTPUT_DIR)
    }
    
    manifest_path = OUTPUT_DIR / "manifest.json"
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    print(f"📝 Manifest saved: {manifest_path}")


if __name__ == "__main__":
    main()
