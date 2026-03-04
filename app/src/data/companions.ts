import type { Companion, LootItem, Boss } from '@/types';

export const COMPANIONS: Companion[] = [
  {
    id: 'ember-dragon',
    name: 'Ember',
    type: 'dragon',
    theme: 'fire',
    stats: { power: 12, wisdom: 6, speed: 5, defense: 7 },
    image: '/assets/characters/dragon.png',
    description: 'A fierce but loyal dragon who breathes courage into every challenge.'
  },
  {
    id: 'solara-phoenix',
    name: 'Solara',
    type: 'phoenix',
    theme: 'rebirth',
    stats: { power: 8, wisdom: 12, speed: 7, defense: 3 },
    image: '/assets/characters/phoenix.png',
    description: 'A wise phoenix whose flames of knowledge never extinguish.'
  },
  {
    id: 'luna-unicorn',
    name: 'Luna',
    type: 'unicorn',
    theme: 'magic',
    stats: { power: 6, wisdom: 10, speed: 8, defense: 6 },
    image: '/assets/characters/unicorn.png',
    description: 'A gentle unicorn whose magic heals and inspires.'
  },
  {
    id: 'talon-griffin',
    name: 'Talon',
    type: 'griffin',
    theme: 'strength',
    stats: { power: 10, wisdom: 6, speed: 10, defense: 4 },
    image: '/assets/characters/griffin.png',
    description: 'A noble griffin who soars to great heights with unwavering courage.'
  },
  {
    id: 'frost-direwolf',
    name: 'Frost',
    type: 'direwolf',
    theme: 'loyalty',
    stats: { power: 7, wisdom: 7, speed: 6, defense: 10 },
    image: '/assets/characters/direwolf.png',
    description: 'A loyal direwolf who protects friends with unbreakable devotion.'
  }
];

export const LOOT_TABLE: LootItem[] = [
  // Weapons
  {
    id: 'legendary-sword',
    name: 'Blade of Valor',
    type: 'weapon',
    rarity: 'legendary',
    stats: { power: 10 },
    image: '/assets/loot/legendary-sword.png',
    equipped: false
  },
  {
    id: 'wizard-staff',
    name: 'Staff of Wisdom',
    type: 'weapon',
    rarity: 'epic',
    stats: { wisdom: 8 },
    image: '/assets/loot/wizard-staff.png',
    equipped: false
  },
  {
    id: 'basic-sword',
    name: 'Trainee Blade',
    type: 'weapon',
    rarity: 'common',
    stats: { power: 3 },
    image: '/assets/loot/sword-common.png',
    equipped: false
  },
  
  // Armor
  {
    id: 'dragon-shield',
    name: 'Dragon Scale Shield',
    type: 'armor',
    rarity: 'epic',
    stats: { defense: 8 },
    image: '/assets/loot/enchanted-shield.png',
    equipped: false
  },
  {
    id: 'dragon-armor',
    name: 'Scale Mail',
    type: 'armor',
    rarity: 'legendary',
    stats: { power: 3, wisdom: 3, speed: 3, defense: 5 },
    image: '/assets/loot/dragon-armor.png',
    equipped: false
  },
  {
    id: 'hero-helmet',
    name: 'Helm of Courage',
    type: 'armor',
    rarity: 'rare',
    stats: { power: 5 },
    image: '/assets/loot/hero-helmet.png',
    equipped: false
  },
  
  // Accessories
  {
    id: 'spellbook',
    name: 'Tome of Knowledge',
    type: 'accessory',
    rarity: 'epic',
    stats: { wisdom: 6 },
    effect: 'reveal-hint',
    image: '/assets/loot/spellbook.png',
    equipped: false
  },
  {
    id: 'crystal-orb',
    name: 'Orb of Insight',
    type: 'accessory',
    rarity: 'rare',
    stats: { wisdom: 4 },
    effect: 'reveal-answer',
    image: '/assets/loot/crystal-orb.png',
    equipped: false
  },
  {
    id: 'speed-boots',
    name: 'Boots of Swiftness',
    type: 'accessory',
    rarity: 'rare',
    stats: { speed: 7 },
    image: '/assets/loot/speed-boots.png',
    equipped: false
  },
  
  // Consumables
  {
    id: 'healing-potion',
    name: 'Potion of Renewal',
    type: 'consumable',
    rarity: 'common',
    effect: 'heal-50',
    image: '/assets/loot/healing-potion.png',
    equipped: false
  },
  
  // Treasure
  {
    id: 'gold-coin',
    name: 'Mythic Coin',
    type: 'treasure',
    rarity: 'common',
    image: '/assets/loot/gold-coin.png',
    equipped: false
  }
];

export const BOSSES: Boss[] = [
  {
    id: 'math-dragon',
    name: 'The Math Dragon',
    subject: 'math',
    difficulty: 'hard',
    health: 100,
    maxHealth: 100,
    image: '/assets/bosses/math-dragon.png',
    description: 'An ancient dragon who breathes geometric fire and guards the secrets of numbers.',
    rewards: ['dragon-scale-armor', 'math-master-badge']
  },
  {
    id: 'grammar-golem',
    name: 'The Grammar Golem',
    subject: 'english',
    difficulty: 'hard',
    health: 100,
    maxHealth: 100,
    image: '/assets/bosses/grammar-golem.png',
    description: 'A stone giant formed from ancient words and punctuation, testing your language mastery.',
    rewards: ['golem-shield', 'grammar-master-badge']
  },
  {
    id: 'science-sphinx',
    name: 'The Science Sphinx',
    subject: 'science',
    difficulty: 'hard',
    health: 100,
    maxHealth: 100,
    image: '/assets/bosses/science-sphinx.png',
    description: 'A mystical creature who asks riddles of science and nature.',
    rewards: ['sphinx-claw', 'science-master-badge']
  }
];

// Generate random loot based on rarity weights
export function generateRandomLoot(): LootItem {
  const rand = Math.random();
  let rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  
  if (rand < 0.5) rarity = 'common';
  else if (rand < 0.75) rarity = 'rare';
  else if (rand < 0.9) rarity = 'epic';
  else if (rand < 0.98) rarity = 'legendary';
  else rarity = 'mythic';
  
  const possibleLoot = LOOT_TABLE.filter(item => item.rarity === rarity);
  const selected = possibleLoot[Math.floor(Math.random() * possibleLoot.length)];
  
  return {
    ...selected,
    id: `${selected.id}-${Date.now()}`, // Unique ID
    equipped: false
  };
}