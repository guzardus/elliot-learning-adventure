// ============================================
// BADGE ICONS - SVG Components
// Watercolor-style SVG icons to replace emojis
// ============================================

interface IconProps {
  size?: number;
  className?: string;
}

// MATH BADGES

export function MathBeginnerIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B7AA8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#6B5B8A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4A3D6B" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path
        d="M32 8L8 56H56L32 8Z"
        fill="url(#mountainGrad)"
        stroke="#4A3D6B"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M32 16L18 44H46L32 16Z"
        fill="white"
        fillOpacity="0.3"
      />
    </svg>
  );
}

export function MathExplorerIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="compassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#A67C52" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="24" fill="url(#compassGrad)" stroke="#8B6914" strokeWidth="2" />
      <circle cx="32" cy="32" r="4" fill="#8B6914" />
      <path d="M32 12L36 28H28L32 12Z" fill="#8B6914" />
      <path d="M32 52L28 36H36L32 52Z" fill="#A67C52" />
      <text x="32" y="20" textAnchor="middle" fill="#8B6914" fontSize="10" fontWeight="bold">N</text>
    </svg>
  );
}

export function MathMasterIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="abacusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A227" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#B8941F" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect x="12" y="16" width="40" height="32" rx="4" fill="url(#abacusGrad)" stroke="#8B7355" strokeWidth="2" />
      <line x1="20" y1="20" x2="20" y2="44" stroke="#8B7355" strokeWidth="2" />
      <line x1="32" y1="20" x2="32" y2="44" stroke="#8B7355" strokeWidth="2" />
      <line x1="44" y1="20" x2="44" y2="44" stroke="#8B7355" strokeWidth="2" />
      <circle cx="20" cy="26" r="3" fill="#8B4513" />
      <circle cx="20" cy="34" r="3" fill="#8B4513" />
      <circle cx="32" cy="30" r="3" fill="#8B4513" />
      <circle cx="44" cy="24" r="3" fill="#8B4513" />
      <circle cx="44" cy="38" r="3" fill="#8B4513" />
    </svg>
  );
}

export function PerfectMathematicianIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FFC107" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF8F00" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M32 4L38 24H60L42 36L48 56L32 44L16 56L22 36L4 24H26L32 4Z"
        fill="url(#starGrad)"
        stroke="#FF8F00"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="8" fill="white" fillOpacity="0.4" />
    </svg>
  );
}

export function MathStreakIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF4500" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#FF6347" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M32 60C20 60 12 48 12 32C12 20 18 12 24 4C24 16 28 20 32 20C36 20 40 16 40 4C46 12 52 20 52 32C52 48 44 60 32 60Z"
        fill="url(#flameGrad)"
        stroke="#FF4500"
        strokeWidth="1"
      />
      <path
        d="M32 52C24 52 20 44 20 36C20 28 24 24 28 20C28 28 30 32 32 32C34 32 36 28 36 20C40 24 44 28 44 36C44 44 40 52 32 52Z"
        fill="#FFD700"
        fillOpacity="0.8"
      />
    </svg>
  );
}

// READING BADGES

export function ReadingRangerIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2E5A3C" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect x="12" y="8" width="20" height="48" rx="2" fill="url(#bookGrad)" stroke="#1E3A2B" strokeWidth="2" />
      <rect x="32" y="8" width="20" height="48" rx="2" fill="url(#bookGrad)" stroke="#1E3A2B" strokeWidth="2" />
      <path d="M32 12C32 12 28 24 32 32C36 24 32 12 32 12Z" fill="#8FBC8F" />
      <line x1="32" y1="8" x2="32" y2="56" stroke="#1E3A2B" strokeWidth="2" />
    </svg>
  );
}

export function BookwormIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="wormGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#90EE90" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7CFC00" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="48" rx="20" ry="8" fill="#8B4513" />
      <circle cx="20" cy="36" r="10" fill="url(#wormGrad)" stroke="#228B22" strokeWidth="1" />
      <circle cx="32" cy="28" r="10" fill="url(#wormGrad)" stroke="#228B22" strokeWidth="1" />
      <circle cx="44" cy="36" r="10" fill="url(#wormGrad)" stroke="#228B22" strokeWidth="1" />
      <circle cx="18" cy="34" r="2" fill="#000" />
      <circle cx="22" cy="34" r="2" fill="#000" />
      <path d="M16 38Q20 42 24 38" stroke="#000" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function StoryMasterIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="storyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9370DB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7B68EE" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect x="16" y="8" width="32" height="44" rx="2" fill="url(#storyGrad)" stroke="#4B0082" strokeWidth="2" />
      <circle cx="32" cy="24" r="8" fill="#FFD700" fillOpacity="0.8" />
      <path d="M24 36H40" stroke="#4B0082" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 42H36" stroke="#4B0082" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PerfectReaderIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#DAA520" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path
        d="M20 12H44V16C44 24 40 28 36 32V40H28V32C24 28 20 24 20 16V12Z"
        fill="url(#trophyGrad)"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <rect x="26" y="40" width="12" height="4" fill="#DAA520" />
      <rect x="22" y="44" width="20" height="4" rx="2" fill="#B8860B" />
      <path d="M20 16C16 16 16 24 20 24" stroke="#B8860B" strokeWidth="2" fill="none" />
      <path d="M44 16C48 16 48 24 44 24" stroke="#B8860B" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function VocabCollectorIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00CED1" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#40E0D0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#48D1CC" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M32 8L56 24L32 56L8 24L32 8Z"
        fill="url(#gemGrad)"
        stroke="#008B8B"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M32 8L32 56" stroke="#008B8B" strokeWidth="1" />
      <path d="M8 24H56" stroke="#008B8B" strokeWidth="1" />
      <path d="M16 16L32 24L48 16" stroke="#008B8B" strokeWidth="1" fill="none" />
    </svg>
  );
}

// GRAMMAR BADGES

export function GrammarGuardianIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4169E1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1E90FF" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M32 4L56 12V28C56 44 32 60 32 60C32 60 8 44 8 28V12L32 4Z"
        fill="url(#shieldGrad)"
        stroke="#0000CD"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M32 16L36 28H48L38 36L42 48L32 40L22 48L26 36L16 28H28L32 16Z"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />
    </svg>
  );
}

export function SpellingStarIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="spellingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF1493" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M32 4L38 24H60L42 36L48 56L32 44L16 56L22 36L4 24H26L32 4Z"
        fill="url(#spellingGrad)"
        stroke="#C71585"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <text x="32" y="36" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="serif">A+</text>
    </svg>
  );
}

export function GrammarGuruIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="guruGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9370DB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="20" r="12" fill="#F5DEB3" stroke="#D2691E" strokeWidth="1" />
      <path
        d="M20 32C20 32 20 56 32 56C44 56 44 32 44 32"
        fill="url(#guruGrad)"
        stroke="#4B0082"
        strokeWidth="2"
      />
      <rect x="28" y="12" width="8" height="4" fill="#4B0082" />
      <circle cx="28" cy="18" r="2" fill="#000" />
      <circle cx="36" cy="18" r="2" fill="#000" />
      <path d="M30 24Q32 26 34 24" stroke="#000" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function GrammarPerfectionistIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="perfectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFA500" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="26" fill="url(#perfectGrad)" stroke="#FF8C00" strokeWidth="2" />
      <circle cx="32" cy="32" r="20" fill="white" fillOpacity="0.3" />
      <text x="32" y="40" textAnchor="middle" fill="#FF8C00" fontSize="24" fontWeight="bold" fontFamily="serif">100%</text>
    </svg>
  );
}

export function PunctuationProIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="punctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC143C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#B22222" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect x="20" y="8" width="8" height="36" rx="4" fill="url(#punctGrad)" stroke="#8B0000" strokeWidth="1" />
      <circle cx="24" cy="52" r="6" fill="url(#punctGrad)" stroke="#8B0000" strokeWidth="1" />
      <rect x="40" y="8" width="8" height="36" rx="4" fill="url(#punctGrad)" stroke="#8B0000" strokeWidth="1" />
      <circle cx="44" cy="52" r="6" fill="url(#punctGrad)" stroke="#8B0000" strokeWidth="1" />
    </svg>
  );
}

// STREAK BADGES

export function Streak3Icon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="streak3Grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6347" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFA500" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M32 56C20 56 12 44 12 28C12 16 18 8 24 4C24 16 28 20 32 20C36 20 40 16 40 4C46 8 52 16 52 28C52 44 44 56 32 56Z"
        fill="url(#streak3Grad)"
        stroke="#FF4500"
        strokeWidth="1"
      />
      <text x="32" y="44" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">3</text>
    </svg>
  );
}

export function Streak7Icon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="streak7Grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF4500" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FF6347" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="26" fill="url(#streak7Grad)" stroke="#FF4500" strokeWidth="2" />
      <text x="32" y="42" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">7</text>
      <path d="M20 20L24 24M44 20L40 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Streak14Icon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="streak14Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF1493" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF4500" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#streak14Grad)" stroke="#C71585" strokeWidth="2" />
      <text x="32" y="40" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">14</text>
      <path d="M16 16L20 20M48 16L44 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Streak30Icon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="streak30Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FFA500" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF4500" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path
        d="M32 4L38 24H60L42 36L48 56L32 44L16 56L22 36L4 24H26L32 4Z"
        fill="url(#streak30Grad)"
        stroke="#FF8C00"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <text x="32" y="40" textAnchor="middle" fill="#8B4513" fontSize="16" fontWeight="bold">30</text>
    </svg>
  );
}

// GENERAL BADGES

export function FirstStepsIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="stepsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4682B4" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M20 48C20 48 20 56 24 56C28 56 28 48 28 48V36C28 36 28 28 24 28C20 28 20 36 20 36V48Z"
        fill="url(#stepsGrad)"
        stroke="#2F4F4F"
        strokeWidth="1"
      />
      <path
        d="M36 44C36 44 36 52 40 52C44 52 44 44 44 44V32C44 32 44 24 40 24C36 24 36 32 36 32V44Z"
        fill="url(#stepsGrad)"
        stroke="#2F4F4F"
        strokeWidth="1"
      />
    </svg>
  );
}

export function WorldTravelerIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="worldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#228B22" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#4169E1" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8B7AA8" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="24" fill="url(#worldGrad)" stroke="#2F4F4F" strokeWidth="2" />
      <path
        d="M20 20C20 20 24 32 20 44"
        stroke="white"
        strokeWidth="2"
        strokeOpacity="0.5"
        fill="none"
      />
      <path
        d="M44 20C44 20 40 32 44 44"
        stroke="white"
        strokeWidth="2"
        strokeOpacity="0.5"
        fill="none"
      />
      <path d="M12 32H52" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
    </svg>
  );
}

export function CenturyClubIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="centuryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFA500" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect x="8" y="16" width="48" height="32" rx="4" fill="url(#centuryGrad)" stroke="#DAA520" strokeWidth="2" />
      <text x="32" y="40" textAnchor="middle" fill="#8B4513" fontSize="20" fontWeight="bold">100</text>
    </svg>
  );
}

// Map badge IDs to icon components
export const BADGE_ICONS: Record<string, React.FC<IconProps>> = {
  // Math
  'math_beginner': MathBeginnerIcon,
  'math_explorer': MathExplorerIcon,
  'math_master': MathMasterIcon,
  'perfect_mathematician': PerfectMathematicianIcon,
  'math_streak': MathStreakIcon,
  // Reading
  'reading_beginner': ReadingRangerIcon,
  'bookworm': BookwormIcon,
  'story_master': StoryMasterIcon,
  'perfect_reader': PerfectReaderIcon,
  'vocab_collector': VocabCollectorIcon,
  // Grammar
  'grammar_beginner': GrammarGuardianIcon,
  'spelling_star': SpellingStarIcon,
  'grammar_guru': GrammarGuruIcon,
  'perfect_grammar': GrammarPerfectionistIcon,
  'punctuation_pro': PunctuationProIcon,
  // Streak
  'streak_3': Streak3Icon,
  'streak_7': Streak7Icon,
  'streak_14': Streak14Icon,
  'streak_30': Streak30Icon,
  // General
  'first_steps': FirstStepsIcon,
  'world_traveler': WorldTravelerIcon,
  'question_hundred': CenturyClubIcon,
  'question_five_hundred': CenturyClubIcon,
  'question_thousand': CenturyClubIcon,
};

// Default icon for badges without specific icons
export function DefaultBadgeIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="24" fill="#6B7280" fillOpacity="0.3" stroke="#6B7280" strokeWidth="2" />
      <path
        d="M32 20L36 30H48L38 38L42 48L32 40L22 48L26 38L16 30H28L32 20Z"
        fill="#6B7280"
      />
    </svg>
  );
}
