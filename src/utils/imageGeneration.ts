// Image Generation Utility for OpenRouter Nano Banana
// CORRECTED MODEL IDs based on OpenRouter API discovery
// 
// Working Models (as of March 2025):
// Primary:   google/gemini-2.5-flash-image      ($0.0000003/image) - "Nano Banana"
// Backup 1:  google/gemini-3-pro-image-preview  ($0.000002/image) - "Nano Banana Pro"  
// Backup 2:  google/gemini-2.5-pro              ($0.00000125/image) - Multimodal with image

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

// PAID Nano Banana Strategy - Priority on quality and reliability
// Standard Nano Banana: $0.0000003/image (extremely cheap, good quality)
// Nano Banana Pro: $0.000002/image (highest quality)
const MODELS = {
  primary: 'google/gemini-2.5-flash-image',      // Standard Nano Banana - PAID
  backup1: 'google/gemini-3-pro-image-preview',  // Nano Banana Pro - PAID (highest quality)
  backup2: 'google/gemini-2.5-pro',              // Gemini Pro - PAID (reliable fallback)
}

export interface GeneratedImage {
  id: string
  prompt: string
  url: string
  alt: string
}

// Generate image using OpenRouter with 3-model fallback strategy
export async function generateImage(
  prompt: string, 
  options: { 
    style?: 'watercolor' | 'pixel' | 'cartoon' | 'realistic'
    background?: 'white' | 'transparent' | 'gradient'
  } = {}
): Promise<string> {
  const { style = 'watercolor', background = 'white' } = options
  
  const stylePrompts = {
    watercolor: 'Watercolor children book illustration style, soft edges, gentle colors, hand-painted feel',
    pixel: 'Pixel art style, retro game aesthetic, crisp edges',
    cartoon: 'Cartoon style, bold outlines, vibrant colors, friendly appeal',
    realistic: 'Realistic 3D render, soft lighting, detailed textures'
  }
  
  const bgPrompts = {
    white: 'clean white background',
    transparent: 'transparent background',
    gradient: 'soft gradient background'
  }
  
  const fullPrompt = `${prompt}. ${stylePrompts[style]}, ${bgPrompts[background]}. Suitable for educational children's game, age 6-10.`
  
  // Try models in order: primary -> backup1 -> backup2
  const modelsToTry = [MODELS.primary, MODELS.backup1, MODELS.backup2]
  const errors: string[] = []
  
  for (const modelId of modelsToTry) {
    try {
      console.log(`🎨 Trying model: ${modelId}...`)
      
      const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://elliots-adventure.local',
          'X-Title': "Elliot's Learning Adventure"
        },
        body: JSON.stringify({
          model: modelId,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: fullPrompt }
              ]
            }
          ]
        })
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: `HTTP ${response.status}` } }))
        errors.push(`${modelId}: ${error.error?.message || response.status}`)
        continue
      }

      const data = await response.json()
      
      // Extract image from response
      const imageData = extractImageFromResponse(data)
      
      if (imageData) {
        console.log(`✅ Success with ${modelId}`)
        return imageData
      }
      
      errors.push(`${modelId}: No image data in response`)
      
    } catch (error) {
      errors.push(`${modelId}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  console.error('All models failed:', errors)
  // Return placeholder SVG as fallback
  return generatePlaceholderSVG(prompt)
}

// Extract image data from OpenRouter response
// Nano Banana returns images in message.images array (OpenRouter format)
function extractImageFromResponse(data: any): string | null {
  try {
    const message = data.choices?.[0]?.message
    if (!message) return null
    
    // NEW: OpenRouter returns images in message.images array
    const images = message.images
    if (Array.isArray(images) && images.length > 0) {
      const imageData = images[0]
      if (imageData.type === 'image_url' && imageData.image_url?.url) {
        return imageData.image_url.url
      }
    }
    
    // Fallback: Check content for various formats
    const content = message.content
    
    // Format: Array of content parts
    if (Array.isArray(content)) {
      for (const part of content) {
        if (part.inline_data) {
          const { mime_type, data } = part.inline_data
          return `data:${mime_type};base64,${data}`
        }
        if (part.type === 'image_url' && part.image_url?.url) {
          return part.image_url.url
        }
      }
    }
    
    // Format: String containing data URL
    if (typeof content === 'string') {
      if (content.startsWith('data:image')) {
        return content
      }
    }
    
    return null
  } catch {
    return null
  }
}

// Generate placeholder SVG when API fails
function generatePlaceholderSVG(description: string): string {
  const hash = description.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = hash % 360
  const initial = description.charAt(0).toUpperCase()
  
  const svg = `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="hsl(${hue},70%,75%)"/>
          <stop offset="100%" stop-color="hsl(${(hue + 40) % 360},70%,55%)"/>
        </linearGradient>
      </defs>
      <rect width="256" height="256" fill="url(#g)" rx="24"/>
      <text x="50%" y="50%" font-family="Georgia,serif" font-size="80" fill="white" 
            text-anchor="middle" dominant-baseline="middle" font-weight="bold">${initial}</text>
    </svg>
  `
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`
}

// Reading Rainforest Image Assets with optimized prompts
export const readingRainforestAssets = {
  // Characters
  readingRanger: {
    id: 'reading-ranger',
    prompt: 'A friendly young explorer character with a safari hat, holding a compass, wearing khaki adventure clothes. Warm and inviting expression.',
    alt: 'Reading Ranger - your guide through the rainforest',
    style: 'watercolor' as const
  },
  
  // Activity Icons
  storyVines: {
    id: 'story-vines',
    prompt: 'A magical vine with leaves wrapped around an open storybook, glowing softly. Green vines, golden light from book pages.',
    alt: 'Story Vines - read passages and explore',
    style: 'watercolor' as const
  },
  
  vocabularyTreasures: {
    id: 'vocab-treasures',
    prompt: 'A treasure chest overflowing with glowing word cards and golden coins. Warm gold and amber tones, magical sparkles.',
    alt: 'Vocabulary Treasures - discover new words',
    style: 'watercolor' as const
  },
  
  templeOfInference: {
    id: 'temple-inference',
    prompt: 'An ancient stone temple entrance with torches, mysterious and inviting. Warm torchlight, cool stone shadows.',
    alt: 'Temple of Inference - solve reading puzzles',
    style: 'watercolor' as const
  },
  
  // Achievement Badges
  badgeBookWorm: {
    id: 'badge-bookworm',
    prompt: 'A cute bookworm character reading a book, circular badge design. Friendly and encouraging.',
    alt: 'Book Worm Badge',
    style: 'cartoon' as const
  },
  
  badgeWordCollector: {
    id: 'badge-wordcollector',
    prompt: 'A collection of glowing word gems in a treasure pouch, circular badge. Magical sparkles, warm colors.',
    alt: 'Word Collector Badge',
    style: 'cartoon' as const
  },
  
  badgeDetective: {
    id: 'badge-detective',
    prompt: 'A magnifying glass revealing hidden clues, detective theme, circular badge. Mystery and discovery feel.',
    alt: 'Detective Badge',
    style: 'cartoon' as const
  },
  
  // Vocabulary Challenge Icons
  vocabDefinition: {
    id: 'vocab-definition',
    prompt: 'An open dictionary book with golden light, educational and magical.',
    alt: 'Definition challenge',
    style: 'watercolor' as const
  },
  
  vocabSynonym: {
    id: 'vocab-synonym',
    prompt: 'Two matching puzzle pieces fitting together, symbolizing similar words. Blue and green tones.',
    alt: 'Synonym challenge',
    style: 'watercolor' as const
  },
  
  vocabContext: {
    id: 'vocab-context',
    prompt: 'A magnifying glass over a sentence, highlighting a word. Soft focus effect.',
    alt: 'Context clue challenge',
    style: 'watercolor' as const
  },
  
  vocabAntonym: {
    id: 'vocab-antonym',
    prompt: 'Two arrows pointing in opposite directions, symbolizing opposites. Contrasting warm and cool colors.',
    alt: 'Antonym challenge',
    style: 'watercolor' as const
  },
  
  // Temple Elements
  templeTorch: {
    id: 'temple-torch',
    prompt: 'A flaming torch illuminating ancient stone walls. Warm orange flames, dramatic shadows.',
    alt: 'Temple torch',
    style: 'watercolor' as const
  },
  
  templeChamber: {
    id: 'temple-chamber',
    prompt: 'An ancient stone chamber with mysterious carvings, torch-lit. Adventure atmosphere.',
    alt: 'Temple chamber',
    style: 'watercolor' as const
  },
  
  templeTreasure: {
    id: 'temple-treasure',
    prompt: 'A golden treasure overflowing from an ancient chest. Magical golden glow, celebration feel.',
    alt: 'Temple treasure',
    style: 'watercolor' as const
  }
}

// Generate all assets
export async function generateAllAssets(
  onProgress?: (id: string, url: string, index: number, total: number) => void
): Promise<Record<string, string>> {
  const assets: Record<string, string> = {}
  const entries = Object.entries(readingRainforestAssets)
  
  for (let i = 0; i < entries.length; i++) {
    const [key, asset] = entries[i]
    console.log(`[${i + 1}/${entries.length}] Generating: ${asset.id}...`)
    
    const url = await generateImage(asset.prompt, { style: asset.style })
    assets[key] = url
    
    if (onProgress) {
      onProgress(asset.id, url, i + 1, entries.length)
    }
    
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500))
  }
  
  return assets
}

// Generate a single asset by ID
export async function generateAsset(assetId: keyof typeof readingRainforestAssets): Promise<string> {
  const asset = readingRainforestAssets[assetId]
  if (!asset) {
    throw new Error(`Unknown asset: ${String(assetId)}`)
  }
  return generateImage(asset.prompt, { style: asset.style })
}
