#!/usr/bin/env python3
"""
Simple test for OpenRouter image generation
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

# Test with free model first
prompt = "Watercolor illustration of a cute safari explorer character for children's book. Breath of the Wild style, soft edges, transparent background."

print("Testing OpenRouter image generation...")
print(f"API Key: {API_KEY[:20]}...")
print()

# Try Nano Banana 2 (FREE)
print("Trying Nano Banana 2 (FREE)...")
try:
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json={
            "model": "google/gemini-2.0-flash-exp:free",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        },
        timeout=60
    )
    
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Response keys: {data.keys()}")
        
        if 'choices' in data:
            print(f"Choices count: {len(data['choices'])}")
            if len(data['choices']) > 0:
                message = data['choices'][0].get('message', {})
                print(f"Message keys: {message.keys()}")
                print(f"Message content type: {type(message.get('content'))}")
                
                # Check for image in content
                content = message.get('content', '')
                if isinstance(content, str) and content.startswith('data:image'):
                    print("✓ Found image data in content string!")
                elif isinstance(content, list):
                    print(f"Content is list with {len(content)} items")
                    for i, item in enumerate(content):
                        print(f"  Item {i}: {type(item)} - {item.get('type') if isinstance(item, dict) else 'N/A'}")
        else:
            print(f"Response: {json.dumps(data, indent=2)[:500]}")
    else:
        print(f"Error: {response.text[:500]}")
        
except Exception as e:
    print(f"Exception: {e}")

print("\nTest complete.")
