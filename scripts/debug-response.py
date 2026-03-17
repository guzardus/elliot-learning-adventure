#!/usr/bin/env python3
"""
Debug the actual response format from OpenRouter Nano Banana
"""

import requests
import json
import os

API_KEY = os.getenv('OPENROUTER_API_KEY', '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')

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://elliot-adventure.local",
    "X-Title": "Elliot's Learning Adventure"
}

PROMPT = "Watercolor illustration of a cute safari explorer character for children's book. Soft colors, white background."

MODELS = [
    "google/gemini-2.5-flash-image",
    "google/gemini-3-pro-image-preview",
]

print("=" * 70)
print("Debugging OpenRouter Response Format")
print("=" * 70)

for model_id in MODELS:
    print(f"\n🎨 Testing: {model_id}")
    print("-" * 50)
    
    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=HEADERS,
            json={
                "model": model_id,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": PROMPT}
                        ]
                    }
                ]
            },
            timeout=120
        )
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Print full response structure
            print("\nFull response:")
            print(json.dumps(data, indent=2)[:2000])
            
            # Deep dive into content
            if 'choices' in data and len(data['choices']) > 0:
                message = data['choices'][0].get('message', {})
                content = message.get('content', '')
                
                print(f"\nContent type: {type(content)}")
                print(f"Content preview: {repr(str(content)[:500])}")
                
                if isinstance(content, list):
                    print(f"\nList has {len(content)} items:")
                    for i, item in enumerate(content):
                        print(f"\n  [{i}] Type: {type(item)}")
                        if isinstance(item, dict):
                            print(f"       Keys: {list(item.keys())}")
                            for k, v in item.items():
                                v_preview = repr(str(v)[:100]) if not isinstance(v, (int, float, bool)) else v
                                print(f"       {k}: {v_preview}")
        else:
            print(f"Error: {response.text[:500]}")
            
    except Exception as e:
        print(f"Exception: {e}")

print("\n" + "=" * 70)
print("Debug complete")
