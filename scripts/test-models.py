#!/usr/bin/env python3
"""
Test actual working image generation models on OpenRouter
"""

import requests
import os
import json

API_KEY = os.getenv('OPENROUTER_API_KEY', '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')

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://elliot-adventure.local",
    "X-Title": "Elliot's Learning Adventure"
}

prompt = "Watercolor illustration of a cute safari explorer character with a hat, children's book style, soft colors, white background"

# Models to test (prioritized by cost/quality)
models = [
    # FREE options (if available)
    ("google/gemma-3-27b-it:free", "Gemma 3 27B (FREE)"),
    
    # Budget options (~$0.01-0.03/image)
    ("black-forest-labs/flux-schnell", "Flux Schnell (Fast/Cheap)"),
    ("black-forest-labs/flux-2-pro", "Flux 2 Pro (Quality/$0.03)"),
    
    # Mid-range
    ("stabilityai/stable-diffusion-xl-base", "SDXL Base"),
    
    # Premium
    ("openai/dall-e-3", "DALL-E 3 (Premium)"),
]

print("=" * 60)
print("OpenRouter Image Generation - Model Testing")
print("=" * 60)
print(f"Prompt: {prompt[:60]}...")
print()

working_models = []

for model_id, model_name in models:
    print(f"\n🧪 Testing: {model_name}")
    print(f"   Model ID: {model_id}")
    
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
                            {"type": "text", "text": f"Generate an image: {prompt}"}
                        ]
                    }
                ]
            },
            timeout=60
        )
        
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check various response formats
            if 'choices' in data and len(data['choices']) > 0:
                message = data['choices'][0].get('message', {})
                content = message.get('content', '')
                
                # Check if content contains image data
                if isinstance(content, str):
                    if content.startswith('data:image') or content.startswith('http'):
                        print(f"   ✅ SUCCESS - Image URL/data found")
                        working_models.append((model_id, model_name, "direct"))
                    elif '![image]' in content or '![' in content:
                        print(f"   ✅ SUCCESS - Markdown image found")
                        working_models.append((model_id, model_name, "markdown"))
                    else:
                        print(f"   ⚠️ Text response: {content[:100]}...")
                elif isinstance(content, list):
                    print(f"   ✅ Content is list (multimodal response)")
                    working_models.append((model_id, model_name, "multimodal"))
            else:
                print(f"   Response: {json.dumps(data, indent=2)[:300]}")
        else:
            error = response.json() if response.text else {"error": "No response"}
            print(f"   ❌ Error: {error.get('error', {}).get('message', response.text[:100])}")
            
    except Exception as e:
        print(f"   ❌ Exception: {e}")

print("\n" + "=" * 60)
print("WORKING MODELS:")
print("=" * 60)
for model_id, model_name, response_type in working_models:
    print(f"  ✅ {model_name}")
    print(f"     ID: {model_id}")
    print(f"     Response type: {response_type}")
    print()

if not working_models:
    print("❌ No working image generation models found!")
    print("\nNote: Image generation on OpenRouter typically requires:")
    print("  1. Proper multimodal request format (content as array)")
    print("  2. Models that support image output (not just text)")
    print("  3. Sufficient credits for paid models")
