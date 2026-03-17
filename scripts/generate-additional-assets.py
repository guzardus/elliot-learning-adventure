#!/usr/bin/env python3
"""
Generate additional assets for Elliot's Adventure
- World Icons (3)
- Math Mountains Activity Icons (3)
"""

import requests
import os
import json
import base64
from pathlib import Path
from typing import Optional, Tuple

API_KEY = os.getenv('OPENROUTER_API_KEY', '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')
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://elliot-adventure.local",
    "X-Title": "Elliot's Learning Adventure"
}

MODELS = [
    "google/gemini-2.5-flash-image",       # Standard Nano Banana
    "google/gemini-3-pro-image-preview",   # Nano Banana Pro
]

# Additional assets needed
ASSETS = [
    # World Icons (for main selector)
    {
        "id": "world-math",
        "filename": "worlds/world-math.png",
        "prompt": "Majestic snow-capped mountain peaks reaching into clouds, misty valleys below. Watercolor illustration, soft purple and blue tones, children's book adventure style, magical atmosphere. White background, suitable for game icon.",
        "category": "worlds"
    },
    {
        "id": "world-rainforest",
        "filename": "worlds/world-rainforest.png",
        "prompt": "Lush tropical rainforest canopy with tall trees, hanging vines, exotic flowers and birds peeking through leaves. Watercolor illustration, vibrant greens and jungle tones, children's book style. White background, suitable for game icon.",
        "category": "worlds"
    },
    {
        "id": "world-galaxy",
        "filename": "worlds/world-galaxy.png",
        "prompt": "Magical galaxy scene with swirling nebula, sparkling stars, a crescent moon, and a comet. Deep purple, blue and gold cosmic colors. Watercolor illustration, dreamy space adventure style. White background, suitable for game icon.",
        "category": "worlds"
    },
    
    # Math Mountains Activity Icons
    {
        "id": "math-peak-climbing",
        "filename": "math/peak-climbing.png",
        "prompt": "A brave young climber with a backpack and climbing gear standing triumphantly on a snowy mountain peak, holding an ice axe. Other peaks visible in background. Watercolor illustration, adventure style, soft blue and white tones. White background.",
        "category": "math"
    },
    {
        "id": "math-cave-fractions",
        "filename": "math/cave-fractions.png",
        "prompt": "A mysterious glowing crystal cave interior with colorful gems embedded in rock walls, sparkling light reflections. Purple, blue and pink crystal colors. Watercolor illustration, magical underground atmosphere. White background.",
        "category": "math"
    },
    {
        "id": "math-bridge-builder",
        "filename": "math/bridge-builder.png",
        "prompt": "A wooden rope bridge spanning across a misty mountain chasm, with clouds below and peaks in distance. Green valley visible beneath. Watercolor illustration, adventure game style. White background.",
        "category": "math"
    },
]


def extract_image_from_response(data: dict) -> Optional[Tuple[bytes, str]]:
    """Extract image from OpenRouter response."""
    try:
        message = data.get('choices', [{}])[0].get('message', {})
        
        # OpenRouter returns images in message.images array
        images = message.get('images', [])
        if images and len(images) > 0:
            image_data = images[0]
            if image_data.get('type') == 'image_url':
                url = image_data.get('image_url', {}).get('url', '')
                if url.startswith('data:'):
                    header, b64data = url.split(',', 1)
                    mime_type = header.split(';')[0].split(':')[1]
                    return base64.b64decode(b64data), mime_type
        
        # Fallback
        content = message.get('content', '')
        if isinstance(content, list):
            for part in content:
                if isinstance(part, dict) and 'inline_data' in part:
                    inline = part['inline_data']
                    return base64.b64decode(inline['data']), inline.get('mime_type', 'image/png')
                if isinstance(part, dict) and part.get('type') == 'image_url':
                    url = part.get('image_url', {}).get('url', '')
                    if url.startswith('data:'):
                        header, b64data = url.split(',', 1)
                        return base64.b64decode(b64data), header.split(';')[0].split(':')[1]
        
        if isinstance(content, str) and content.startswith('data:image'):
            header, b64data = content.split(',', 1)
            return base64.b64decode(b64data), header.split(';')[0].split(':')[1]
            
    except Exception as e:
        print(f"    Extraction error: {e}")
    
    return None


def generate_image(prompt: str, asset_id: str) -> Optional[bytes]:
    """Generate image with fallback strategy."""
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
                try:
                    error_data = response.json()
                    error_msg = error_data.get('error', {}).get('message', f"HTTP {response.status_code}")
                except:
                    error_msg = f"HTTP {response.status_code}"
                print(f"❌ ({error_msg[:30]}...)")
                continue
            
            data = response.json()
            result = extract_image_from_response(data)
            
            if result:
                image_data, mime_type = result
                print(f"✅ ({len(image_data)} bytes)")
                return image_data
            else:
                msg_keys = list(data.get('choices', [{}])[0].get('message', {}).keys())
                print(f"❌ (no image - keys: {msg_keys})")
                
        except requests.exceptions.Timeout:
            print("❌ (timeout)")
        except Exception as e:
            print(f"❌ ({str(e)[:30]}...)")
    
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
    print("Additional Assets Generator")
    print("World Icons + Math Mountains Activities")
    print("=" * 70)
    
    # Ensure output directories exist
    (OUTPUT_DIR / "worlds").mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "math").mkdir(parents=True, exist_ok=True)
    
    print(f"\nOutput directory: {OUTPUT_DIR}")
    
    generated = []
    failed = []
    
    for i, asset in enumerate(ASSETS, 1):
        print(f"\n[{i}/{len(ASSETS)}] Generating: {asset['id']}")
        print(f"    File: {asset['filename']}")
        
        output_path = OUTPUT_DIR / asset['filename']
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
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
            print(f"    ⚠️  Placeholder: {placeholder_path}")
        
        if i < len(ASSETS):
            import time
            time.sleep(1)
    
    print("\n" + "=" * 70)
    print("GENERATION COMPLETE")
    print("=" * 70)
    print(f"\n✅ Generated: {len(generated)}/{len(ASSETS)}")
    for g in generated:
        print(f"   • {g}")
    
    if failed:
        print(f"\n⚠️  Placeholders: {len(failed)}")
        for f in failed:
            print(f"   • {f}")
    
    print(f"\n💰 Estimated cost: ~${len(generated) * 0.0000003:.6f}")
    print(f"📁 Output: {OUTPUT_DIR}")
    
    manifest = {
        "generated": generated,
        "failed": failed,
        "total": len(ASSETS),
        "models_used": MODELS
    }
    
    manifest_path = OUTPUT_DIR / "additional-manifest.json"
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    print(f"📝 Manifest: {manifest_path}")


if __name__ == "__main__":
    main()
