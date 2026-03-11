import type { LootItem, SuperItem } from '@/types';

// Helper to calculate sprite position (10 columns, 6 rows)
// Each item is 10% wide and ~16.67% tall
const SPRITE_COLS = 10;
const SPRITE_ROWS = 6;
const CELL_WIDTH = 100 / SPRITE_COLS; // 10%
const CELL_HEIGHT = 100 / SPRITE_ROWS; // ~16.67%

function getSpritePos(col: number, row: number) {
  return {
    spriteSheet: '/assets/loot/inventory.png',
    x: col * CELL_WIDTH,
    y: row * CELL_HEIGHT,
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
  };
}

// Common Loot Items (Rows 0-2)
export const commonLoot: LootItem[] = [
  // Row 0
  { id: 'staff-archmage-green', name: 'Archmage Staff', icon: '🪄', image: getSpritePos(0, 0), rarity: 'common', description: 'A staff infused with arcane energy' },
  { id: 'staff-archmage-red', name: 'Crimson Staff', icon: '🪄', image: getSpritePos(1, 0), rarity: 'common', description: 'A staff with a glowing red crystal' },
  { id: 'staff-crystal-blue', name: 'Crystal Staff', icon: '🪄', image: getSpritePos(2, 0), rarity: 'common', description: 'A staff topped with blue crystal' },
  { id: 'tome-brown', name: 'Spell Tome', icon: '📖', image: getSpritePos(3, 0), rarity: 'common', description: 'A dusty tome containing basic spells' },
  { id: 'tome-star', name: 'Stardust Tome', icon: '📖', image: getSpritePos(4, 0), rarity: 'common', description: 'A magical book with star patterns' },
  { id: 'hat-wizard-purple', name: 'Wizard Hat', icon: '🎩', image: getSpritePos(5, 0), rarity: 'common', description: 'A classic pointed wizard hat' },
  { id: 'hat-wizard-star', name: 'Star Hat', icon: '🎩', image: getSpritePos(6, 0), rarity: 'common', description: 'A hat adorned with magical stars' },
  { id: 'artifact-eye', name: 'All-Seeing Eye', icon: '👁️', image: getSpritePos(7, 0), rarity: 'common', description: 'An artifact that watches everything' },
  { id: 'scepter-golden', name: 'Golden Scepter', icon: '⚜️', image: getSpritePos(8, 0), rarity: 'common', description: 'A ceremonial golden scepter' },
  { id: 'shield-magic', name: 'Magic Shield', icon: '🛡️', image: getSpritePos(9, 0), rarity: 'common', description: 'A shield imbued with protective magic' },
  
  // Row 1
  { id: 'key-ancient', name: 'Ancient Key', icon: '🗝️', image: getSpritePos(0, 1), rarity: 'common', description: 'A key to forgotten doors' },
  { id: 'wand-purple', name: 'Apprentice Wand', icon: '🪄', image: getSpritePos(1, 1), rarity: 'common', description: 'A wand for beginner spellcasters' },
  { id: 'wand-blue', name: 'Azure Wand', icon: '🪄', image: getSpritePos(2, 1), rarity: 'common', description: 'A wand that glows with blue light' },
  { id: 'potion-blue-small', name: 'Small Mana Potion', icon: '🧪', image: getSpritePos(3, 1), rarity: 'common', description: 'Restores a small amount of mana' },
  { id: 'potion-blue-large', name: 'Mana Potion', icon: '🧪', image: getSpritePos(4, 1), rarity: 'common', description: 'Restores magical energy' },
  { id: 'scroll-magic', name: 'Magic Scroll', icon: '📜', image: getSpritePos(5, 1), rarity: 'common', description: 'A scroll with magical inscriptions' },
  { id: 'orb-blue', name: 'Crystal Orb', icon: '🔮', image: getSpritePos(6, 1), rarity: 'common', description: 'An orb for scrying and divination' },
  { id: 'potion-green', name: 'Health Potion', icon: '🧪', image: getSpritePos(7, 1), rarity: 'common', description: 'Restores health and vitality' },
  { id: 'starfish-magic', name: 'Starfish Charm', icon: '⭐', image: getSpritePos(8, 1), rarity: 'common', description: 'A charm from the cosmic seas' },
  { id: 'feather-quill', name: 'Magic Quill', icon: '🪶', image: getSpritePos(9, 1), rarity: 'common', description: 'A quill that writes on its own' },
  
  // Row 2
  { id: 'potion-blue-vial', name: 'Vial of Essence', icon: '🧪', image: getSpritePos(0, 2), rarity: 'common', description: 'Contains pure magical essence' },
  { id: 'ring-gold-green', name: 'Emerald Ring', icon: '💍', image: getSpritePos(1, 2), rarity: 'common', description: 'A ring with a green gem' },
  { id: 'ring-gold-blue', name: 'Sapphire Ring', icon: '💍', image: getSpritePos(2, 2), rarity: 'common', description: 'A ring with a blue gem' },
  { id: 'cloak-blue', name: 'Apprentice Cloak', icon: '🧥', image: getSpritePos(3, 2), rarity: 'common', description: 'A simple magical cloak' },
  { id: 'staff-hook', name: 'Hooked Staff', icon: '🪝', image: getSpritePos(4, 2), rarity: 'common', description: 'A staff with a curved top' },
  { id: 'hat-pointed', name: 'Pointed Hat', icon: '🎩', image: getSpritePos(5, 2), rarity: 'common', description: 'A traditional wizard hat' },
  { id: 'artifact-crystal', name: 'Crystal Artifact', icon: '💎', image: getSpritePos(6, 2), rarity: 'common', description: 'A mysterious crystal device' },
  { id: 'lantern-ornate', name: 'Ornate Lantern', icon: '🏮', image: getSpritePos(7, 2), rarity: 'common', description: 'A lantern that never goes out' },
  { id: 'wand-crystal', name: 'Crystal Wand', icon: '🪄', image: getSpritePos(8, 2), rarity: 'common', description: 'A wand made of pure crystal' },
  { id: 'scroll-ancient', name: 'Ancient Scroll', icon: '📜', image: getSpritePos(9, 2), rarity: 'common', description: 'A scroll from ancient times' },
];

// Rare Loot Items (Rows 3-4)
export const rareLoot: LootItem[] = [
  // Row 3
  { id: 'wand-crystal-green', name: 'Emerald Wand', icon: '🪄', image: getSpritePos(0, 3), rarity: 'rare', description: 'A wand with an emerald tip' },
  { id: 'lantern-golden', name: 'Golden Lantern', icon: '🏮', image: getSpritePos(1, 3), rarity: 'rare', description: 'A lantern of pure gold' },
  { id: 'boots-leather', name: 'Wizard Boots', icon: '👢', image: getSpritePos(2, 3), rarity: 'rare', description: 'Boots that increase movement speed' },
  { id: 'quill-purple', name: 'Phoenix Quill', icon: '🪶', image: getSpritePos(3, 3), rarity: 'rare', description: 'A quill made from phoenix feathers' },
  { id: 'robe-green', name: 'Emerald Robe', icon: '👘', image: getSpritePos(4, 3), rarity: 'rare', description: 'A robe woven with emerald thread' },
  { id: 'robe-purple', name: 'Royal Robe', icon: '👘', image: getSpritePos(5, 3), rarity: 'rare', description: 'A robe fit for royalty' },
  { id: 'cloak-purple', name: 'Mystic Cloak', icon: '🧥', image: getSpritePos(6, 3), rarity: 'rare', description: 'A cloak that enhances magic' },
  { id: 'scroll-gold', name: 'Golden Scroll', icon: '📜', image: getSpritePos(7, 3), rarity: 'rare', description: 'A scroll written in gold ink' },
  { id: 'glove-armor', name: 'Arcane Gauntlet', icon: '🥊', image: getSpritePos(8, 3), rarity: 'rare', description: 'A gauntlet that channels magic' },
  { id: 'scepter-orb', name: 'Orb Scepter', icon: '⚜️', image: getSpritePos(9, 3), rarity: 'rare', description: 'A scepter with a floating orb' },
  
  // Row 4
  { id: 'potion-purple', name: 'Mystic Potion', icon: '🧪', image: getSpritePos(0, 4), rarity: 'rare', description: 'A potion of mysterious origin' },
  { id: 'key-silver', name: 'Silver Key', icon: '🗝️', image: getSpritePos(1, 4), rarity: 'rare', description: 'A key that opens secret doors' },
  { id: 'key-golden', name: 'Golden Key', icon: '🗝️', image: getSpritePos(2, 4), rarity: 'rare', description: 'A key to the greatest treasures' },
  { id: 'cloak-dark', name: 'Shadow Cloak', icon: '🧥', image: getSpritePos(3, 4), rarity: 'rare', description: 'A cloak that blends with shadows' },
  { id: 'orb-astral', name: 'Astral Orb', icon: '🔮', image: getSpritePos(4, 4), rarity: 'rare', description: 'An orb showing the stars' },
  { id: 'globe-magic', name: 'Magic Globe', icon: '🌍', image: getSpritePos(5, 4), rarity: 'rare', description: 'A globe showing all magical realms' },
  { id: 'robe-blue', name: 'Celestial Robe', icon: '👘', image: getSpritePos(6, 4), rarity: 'rare', description: 'A robe woven from starlight' },
  { id: 'cloak-star', name: 'Starlight Cloak', icon: '🧥', image: getSpritePos(7, 4), rarity: 'rare', description: 'A cloak that shines like the night sky' },
  { id: 'orb-constellation', name: 'Constellation Orb', icon: '🔮', image: getSpritePos(8, 4), rarity: 'rare', description: 'An orb showing constellations' },
  { id: 'hourglass', name: 'Time Hourglass', icon: '⏳', image: getSpritePos(9, 4), rarity: 'rare', description: 'An hourglass that controls time' },
];

// Epic Loot Items (Row 5)
export const epicLoot: LootItem[] = [
  { id: 'hat-ultimate', name: 'Hat of Power', icon: '🎩', image: getSpritePos(0, 5), rarity: 'epic', description: 'The ultimate wizard hat' },
  { id: 'staff-ultimate', name: 'Archstaff', icon: '🪄', image: getSpritePos(1, 5), rarity: 'epic', description: 'A staff of ultimate power' },
  { id: 'scepter-royal', name: 'Royal Scepter', icon: '⚜️', image: getSpritePos(2, 5), rarity: 'epic', description: 'A scepter wielded by archmages' },
  { id: 'hourglass-golden', name: 'Golden Hourglass', icon: '⏳', image: getSpritePos(3, 5), rarity: 'epic', description: 'Controls the flow of time itself' },
  { id: 'armor-chest', name: 'Arcane Armor', icon: '🛡️', image: getSpritePos(4, 5), rarity: 'epic', description: 'Armor that protects against all magic' },
  { id: 'crown-magic', name: 'Crown of Magic', icon: '👑', image: getSpritePos(5, 5), rarity: 'epic', description: 'A crown that amplifies magical power' },
  { id: 'glasses-round', name: 'Spectacles of Truth', icon: '👓', image: getSpritePos(6, 5), rarity: 'epic', description: 'Glasses that reveal hidden truths' },
  { id: 'boots-magic', name: 'Boots of Speed', icon: '👢', image: getSpritePos(7, 5), rarity: 'epic', description: 'Boots that let you move instantly' },
  { id: 'amulet-legendary', name: 'Legendary Amulet', icon: '📿', image: getSpritePos(8, 5), rarity: 'epic', description: 'An amulet of legendary power' },
  { id: 'glasses-gold', name: 'Golden Spectacles', icon: '👓', image: getSpritePos(9, 5), rarity: 'epic', description: 'Spectacles that see the future' },
];

// All loot combined
export const allLoot = [...commonLoot, ...rareLoot, ...epicLoot];

// Super Items (Crafted) - These use emojis since they're unique crafted items
export const superItemRecipes: SuperItem[] = [
  {
    id: 'super-wand-apprentice',
    name: 'Apprentice Wand',
    description: 'A basic wand for beginner wizards. Crafted from 10 common items.',
    icon: '🪄',
    craftedAt: '',
    recipe: '10 Common Items'
  },
  {
    id: 'super-orb-seer',
    name: 'Seer\'s Orb',
    description: 'An orb that reveals hidden truths. Crafted from a mix of common and rare items.',
    icon: '🔮',
    craftedAt: '',
    recipe: '5 Common + 5 Rare Items'
  },
  {
    id: 'super-staff-sorcerer',
    name: 'Sorcerer\'s Staff',
    description: 'A powerful staff channeling arcane energy. Crafted from rare items.',
    icon: '🏔️',
    craftedAt: '',
    recipe: '10 Rare Items'
  },
  {
    id: 'super-tome-legendary',
    name: 'Legendary Spellbook',
    description: 'An ancient tome containing lost magic. Crafted from epic items.',
    icon: '📖',
    craftedAt: '',
    recipe: '10 Epic Items'
  },
  {
    id: 'super-artifact-ultimate',
    name: 'Ultimate Wizard Artifact',
    description: 'The pinnacle of magical crafting. Requires the finest materials.',
    icon: '👑',
    craftedAt: '',
    recipe: 'Mix of all rarities'
  }
];

// Generate random loot based on rarity chances
export function generateRandomLoot(): LootItem {
  const roll = Math.random();
  let selectedLoot: LootItem[];
  
  if (roll < 0.6) {
    // 60% common
    selectedLoot = commonLoot;
  } else if (roll < 0.9) {
    // 30% rare
    selectedLoot = rareLoot;
  } else {
    // 10% epic
    selectedLoot = epicLoot;
  }
  
  const baseItem = selectedLoot[Math.floor(Math.random() * selectedLoot.length)];
  
  // Create a unique instance with new ID
  return {
    ...baseItem,
    id: `${baseItem.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
}

// Get super item based on loot composition
export function craftSuperItem(lootItems: LootItem[]): SuperItem | null {
  if (lootItems.length < 10) return null;
  
  const commonCount = lootItems.filter(l => l.rarity === 'common').length;
  const rareCount = lootItems.filter(l => l.rarity === 'rare').length;
  const epicCount = lootItems.filter(l => l.rarity === 'epic').length;
  
  let recipe: SuperItem;
  
  if (epicCount >= 10) {
    recipe = superItemRecipes.find(s => s.id === 'super-tome-legendary')!;
  } else if (rareCount >= 10) {
    recipe = superItemRecipes.find(s => s.id === 'super-staff-sorcerer')!;
  } else if (commonCount >= 10) {
    recipe = superItemRecipes.find(s => s.id === 'super-wand-apprentice')!;
  } else if (commonCount >= 5 && rareCount >= 5) {
    recipe = superItemRecipes.find(s => s.id === 'super-orb-seer')!;
  } else {
    // Mixed recipe
    recipe = superItemRecipes.find(s => s.id === 'super-artifact-ultimate')!;
  }
  
  return {
    ...recipe,
    id: `${recipe.id}-${Date.now()}`,
    craftedAt: new Date().toISOString()
  };
}