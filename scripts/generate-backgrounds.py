#!/usr/bin/env python3
"""
Generate full-screen background scenes for all worlds
Watercolor style, suitable for CSS background-size: cover
"""

import requests
import os
import json
import base64
from pathlib import Path
from typing import Optional, Tuple

API_KEY = os.getenv('OPENROUTER_API_KEY', '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')
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images" / "backgrounds"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://elliot-adventure.local",
    "X-Title": "Elliot's Learning Adventure"
}

MODELS = [
    "google/gemini-2.5-flash-image",
    "google/gemini-3-pro-image-preview",
]

# Wide landscape format backgrounds for full-screen coverage
ASSETS = [
    {
        "id": "bg-math-mountains",
        "filename": "bg-math-mountains.png",
        "prompt": "Panoramic mountain landscape with snow-capped peaks, rolling hills, winding river valley below. Misty clouds between peaks, soft morning light. Watercolor illustration, children book adventure style. Soft purple, blue and white tones. Wide landscape composition suitable for game background.",
        "category": "backgrounds"
    },
    {
        "id": "bg-reading-rainforest", 
        "filename": "bg-reading-rainforest.png",
        "prompt": "Dense tropical rainforest jungle with towering trees, hanging vines, exotic birds and butterflies. Sun rays filtering through canopy creating god rays. Lush green foliage, distant waterfall. Watercolor illustration, children book adventure style. Rich greens with golden light accents. Wide landscape composition suitable for game background.",
        "category": "backgrounds"
    },
    {
        "id": "bg-grammar-galaxy",
        "filename": "bg-grammar-galaxy.png", 
        "prompt": "Magical deep space scene with swirling purple and blue nebula, countless stars, distant planets, a spiral galaxy arm, shooting stars. Ethereal cosmic clouds in violet, indigo and gold. Watercolor illustration, dreamy space adventure style. Wide landscape composition suitable for game background.",
        "category": "backgrounds"
    },
]


def extract_image_from_response(data: dict) -> Optional[Tuple[bytes, str]]:
    try:
        message = data.get('choices', [{}])[0].get('message', {})
        images = message.get('images', [])
        if images and len(images) > 0:
            image_data = images[0]
            if image_data.get('type') == 'image_url':
                url = image_data.get('image_url', {}).get('url', '')
                if url.startswith('data:'):
                    header, b64data = url.split(',', 1)
                    mime_type = header.split(';')[0].split(':')[1]
                    return base64.b64decode(b64data), mime_type
        
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


def main():
    print("=" * 70)
    print("Background Scene Generator")
    print("Full-screen watercolor backgrounds for all worlds")
    print("=" * 70)
    
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"\nOutput directory: {OUTPUT_DIR}")
    
    generated = []
    failed = []
    
    for i, asset in enumerate(ASSETS, 1):
        print(f"\n[{i}/{len(ASSETS)}] Generating: {asset['id']}")
        print(f"    File: {asset['filename']}")
        
        output_path = OUTPUT_DIR / asset['filename']
        
        image_data = generate_image(asset['prompt'], asset['id'])
        
        if image_data:
            with open(output_path, 'wb') as f:
                f.write(image_data)
            generated.append(asset['id'])
            print(f"    💾 Saved: {output_path}")
        else:
            failed.append(asset['id'])
            print(f"    ❌ Failed")
        
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
        print(f"\n❌ Failed: {len(failed)}")
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
    
    manifest_path = OUTPUT_DIR / "background-manifest.json"
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    print(f"📝 Manifest: {manifest_path}")


if __name__ == "__main__":
    main()
