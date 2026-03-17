#!/usr/bin/env python3
"""
Test the CORRECT Nano Banana model IDs from OpenRouter
"""

import requests
import os

API_KEY = os.getenv('OPENROUTER_API_KEY', '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')

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://elliot-adventure.local",
    "X-Title": "Elliot's Learning Adventure"
}

# Reading Rainforest asset prompt
prompt = "Watercolor illustration of a friendly young explorer character with a safari hat, holding a compass, wearing khaki adventure clothes. Children's book illustration style, soft green jungle tones, warm and inviting expression, white background."

models = [
    ("google/gemini-2.5-flash-image", "Nano Banana (Gemini 2.5 Flash Image) - CHEAPEST"),
    ("google/gemini-3-pro-image-preview", "Nano Banana Pro (Gemini 3 Pro Image) - HIGHEST QUALITY"),
]

print("=" * 70)
print("Testing CORRECT Nano Banana Model IDs")
print("=" * 70)
print(f"\nPrompt: {prompt[:80]}...")
print()

for model_id, model_name in models:
    print(f"\n🎨 {model_name}")
    print(f"   ID: {model_id}")
    print("-" * 50)
    
    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
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
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            
            if 'choices' in data and len(data['choices']) > 0:
                message = data['choices'][0].get('message', {})
                content = message.get('content', '')
                
                print(f"Content type: {type(content)}")
                
                if isinstance(content, list):
                    print(f"Multimodal response with {len(content)} parts:")
                    for i, part in enumerate(content):
                        part_type = part.get('type', 'unknown') if isinstance(part, dict) else 'text'
                        print(f"  [{i}] Type: {part_type}")
                        
                        # Check for inline_data (base64 image)
                        if isinstance(part, dict) and 'inline_data' in part:
                            inline = part['inline_data']
                            mime = inline.get('mime_type', 'unknown')
                            data_len = len(inline.get('data', ''))
                            print(f"      🖼️  IMAGE FOUND! MIME: {mime}, Data length: {data_len} chars")
                            
                            # Save the image
                            import base64
                            img_data = inline['data']
                            ext = 'png' if 'png' in mime else 'jpeg'
                            filename = f"test-output-{model_id.split('/')[-1]}.{ext}"
                            with open(filename, 'wb') as f:
                                f.write(base64.b64decode(img_data))
                            print(f"      💾 Saved to: {filename}")
                            
                elif isinstance(content, str):
                    if content.startswith('data:image'):
                        print(f"🖼️  Image data URL found! Length: {len(content)}")
                    elif '![' in content:
                        print(f"🖼️  Markdown image found: {content[:100]}...")
                    else:
                        print(f"Text response: {content[:200]}...")
            else:
                print(f"Unexpected response: {data.keys()}")
        else:
            try:
                error = response.json()
                print(f"❌ Error: {error.get('error', {}).get('message', response.text[:200])}")
            except:
                print(f"❌ Error: {response.text[:200]}")
                
    except Exception as e:
        print(f"❌ Exception: {e}")

print("\n" + "=" * 70)
print("Test complete!")
