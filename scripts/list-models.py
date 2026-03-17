#!/usr/bin/env python3
"""
Fetch and filter actual available models from OpenRouter
"""

import requests
import json

API_KEY = "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"

headers = {"Authorization": f"Bearer {API_KEY}"}

print("Fetching available models from OpenRouter...")

response = requests.get(
    "https://openrouter.ai/api/v1/models",
    headers=headers,
    timeout=30
)

if response.status_code != 200:
    print(f"Failed: {response.status_code}")
    print(response.text[:500])
    exit(1)

data = response.json()
models = data.get('data', [])

print(f"\nTotal models available: {len(models)}\n")

# Look for image/multimodal models
image_keywords = ['image', 'vision', 'diffusion', 'flux', 'dall', 'stable', 'gemini', 'gpt-4o', 'claude']
image_models = []

for model in models:
    model_id = model.get('id', '').lower()
    model_name = model.get('name', '').lower()
    description = model.get('description', '').lower()
    
    # Check if it might support images
    is_multimodal = any(kw in model_id or kw in model_name or kw in description for kw in image_keywords)
    
    if is_multimodal:
        pricing = model.get('pricing', {})
        prompt_price = pricing.get('prompt', 'N/A')
        completion_price = pricing.get('completion', 'N/A')
        image_price = pricing.get('image', 'N/A')
        
        image_models.append({
            'id': model.get('id'),
            'name': model.get('name'),
            'description': model.get('description', '')[:100],
            'prompt_price': prompt_price,
            'completion_price': completion_price,
            'image_price': image_price,
            'context_length': model.get('context_length'),
        })

# Sort by likely image generation capability (image pricing indicates image output)
image_models.sort(key=lambda x: (0 if x['image_price'] != 'N/A' else 1, x['id']))

print("=" * 80)
print("POTENTIAL IMAGE GENERATION MODELS:")
print("=" * 80)

for m in image_models[:30]:  # Top 30
    print(f"\n🖼️  {m['name']}")
    print(f"   ID: {m['id']}")
    print(f"   Description: {m['description']}")
    if m['image_price'] != 'N/A':
        print(f"   💰 Image price: ${m['image_price']}")
    elif m['prompt_price'] != 'N/A':
        print(f"   💰 Prompt: ${m['prompt_price']}/1M tokens")

# Also look for free models specifically
print("\n" + "=" * 80)
print("FREE MODELS (':free' suffix):")
print("=" * 80)

free_models = [m for m in models if ':free' in m.get('id', '')]
for m in free_models[:20]:
    print(f"  • {m.get('id')} - {m.get('name')}")
