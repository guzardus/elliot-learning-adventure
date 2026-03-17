#!/usr/bin/env python3
"""
Generate Grammar Galaxy achievement badges
"""

import requests
import os
import json
import base64
from pathlib import Path

API_KEY = os.getenv('OPENROUTER_API_KEY', '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')
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images" / "galaxy"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://elliot-adventure.local",
    "X-Title": "Elliot's Learning Adventure"
}

MODELS = ["google/gemini-2.5-flash-image"]

ASSETS = [
    {
        "id": "badge-grammar-master",
        "filename": "badge-grammar-master.png",
        "prompt": "A golden trophy shaped like a shooting star with a grammar book, circular badge design. Cosmic purple and gold colors, magical sparkles. Watercolor illustration, children book style.",
    },
    {
        "id": "badge-spelling-star",
        "filename": "badge-spelling-star.png",
        "prompt": "A glowing star with letters swirling around it, spelling theme, circular badge. Golden and teal cosmic colors. Watercolor illustration, children book style.",
    },
    {
        "id": "badge-punctuation-pro",
        "filename": "badge-punctuation-pro.png",
        "prompt": "A cosmic medal with punctuation marks (period, exclamation, question mark) floating around it, circular badge. Purple and blue nebula colors. Watercolor illustration, children book style.",
    },
]

def extract_image_from_response(data):
    try:
        message = data.get('choices', [{}])[0].get('message', {})
        images = message.get('images', [])
        if images and len(images) > 0:
            image_data = images[0]
            if image_data.get('type') == 'image_url':
                url = image_data.get('image_url', {}).get('url', '')
                if url.startswith('data:'):
                    header, b64data = url.split(',', 1)
                    return base64.b64decode(b64data), header.split(';')[0].split(':')[1]
    except Exception as e:
        print(f"    Extraction error: {e}")
    return None

def generate_image(prompt, asset_id):
    for model_id in MODELS:
        try:
            print(f"    Trying {model_id.split('/')[-1]}...", end=" ", flush=True)
            
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=HEADERS,
                json={
                    "model": model_id,
                    "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}]}],
                },
                timeout=120
            )
            
            if response.status_code != 200:
                print(f"❌ (HTTP {response.status_code})")
                continue
            
            data = response.json()
            result = extract_image_from_response(data)
            
            if result:
                image_data, mime_type = result
                print(f"✅ ({len(image_data)} bytes)")
                return image_data
            else:
                print(f"❌ (no image)")
                
        except Exception as e:
            print(f"❌ ({str(e)[:30]}...)")
    
    return None

def main():
    print("=" * 70)
    print("Grammar Galaxy Badge Generator")
    print("=" * 70)
    
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    generated = []
    
    for i, asset in enumerate(ASSETS, 1):
        print(f"\n[{i}/{len(ASSETS)}] Generating: {asset['id']}")
        
        output_path = OUTPUT_DIR / asset['filename']
        
        image_data = generate_image(asset['prompt'], asset['id'])
        
        if image_data:
            with open(output_path, 'wb') as f:
                f.write(image_data)
            generated.append(asset['id'])
            print(f"    💾 Saved: {output_path}")
        
        if i < len(ASSETS):
            import time
            time.sleep(1)
    
    print("\n" + "=" * 70)
    print(f"✅ Generated: {len(generated)}/{len(ASSETS)} badges")
    print(f"💰 Estimated cost: ~${len(generated) * 0.0000003:.6f}")

if __name__ == "__main__":
    main()
