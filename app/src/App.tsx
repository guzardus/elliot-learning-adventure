import { useState, useEffect } from 'react';
import { GameProvider, useGameState } from '@/hooks/useGameState';
import { NameEntry, CompanionSelect, LootBox, BossBattle, Inventory } from '@/components/mythic';
import { Dashboard } from '@/sections/Dashboard';
import { MathLand } from '@/sections/MathLand';
import { EnglishLand } from '@/sections/EnglishLand';
import { ActivityScreen } from '@/sections/ActivityScreen';
import { Celebration } from '@/components/Celebration';
import type { ActivityType } from '@/types';

export type Screen = 
  | 'name-entry'
  | 'companion-select'
  | 'dashboard'
  | 'math-land'
  | 'english-land'
  | 'activity'
  | 'boss-battle';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('name-entry');
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [showLootBox, setShowLootBox] = useState(false);
  const [showBossBattle, setShowBossBattle] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const { state, updateStreak } = useGameState();

  // Update streak on app load and check if new user
  useEffect(() => {
    updateStreak();
    // Check if user has already completed onboarding
    if (state.player.name !== 'Explorer' && state.player.selectedCompanions.length > 0) {
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleNameComplete = () => {
    setCurrentScreen('companion-select');
  };

  const handleCompanionComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleSelectLand = (land: 'math' | 'english') => {
    setCurrentScreen(land === 'math' ? 'math-land' : 'english-land');
  };

  const handleSelectActivity = (activity: ActivityType) => {
    setSelectedActivity(activity);
    setCurrentScreen('activity');
  };

  const handleActivityComplete = (xpEarned: number) => {
    if (xpEarned > 0) {
      setCelebrationMessage(`+${xpEarned} XP!`);
      setShowCelebration(true);
    }

    // Award loot box for completing activity
    setTimeout(() => {
      setShowLootBox(true);
    }, 1500);
  };

  const handleLootClose = () => {
    setShowLootBox(false);
  };

  const handleBossBattle = () => {
    setShowBossBattle(true);
  };

  const handleBossClose = () => {
    setShowBossBattle(false);
  };

  const handleOpenInventory = () => {
    setShowInventory(true);
  };

  const handleCloseInventory = () => {
    setShowInventory(false);
  };

  const handleBack = () => {
    if (currentScreen === 'activity') {
      if (selectedActivity?.startsWith('math')) {
        setCurrentScreen('math-land');
      } else {
        setCurrentScreen('english-land');
      }
    } else if (currentScreen === 'math-land' || currentScreen === 'english-land') {
      setCurrentScreen('dashboard');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'name-entry':
        return <NameEntry onComplete={handleNameComplete} />;
      case 'companion-select':
        return <CompanionSelect onComplete={handleCompanionComplete} />;
      case 'dashboard':
        return (
          <Dashboard 
            onSelectLand={handleSelectLand}
            onBossBattle={handleBossBattle}
            onViewInventory={handleOpenInventory}
          />
        );
      case 'math-land':
        return <MathLand onSelectActivity={handleSelectActivity} onBack={handleBack} />;
      case 'english-land':
        return <EnglishLand onSelectActivity={handleSelectActivity} onBack={handleBack} />;
      case 'activity':
        return selectedActivity ? (
          <ActivityScreen 
            activityType={selectedActivity}
            onBack={handleBack}
            onComplete={handleActivityComplete}
          />
        ) : null;
      default:
        return <NameEntry onComplete={handleNameComplete} />;
    }
  };

  return (
    <div className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      {renderScreen()}
      
      {showCelebration && (
        <Celebration 
          message={celebrationMessage}
          onComplete={() => setShowCelebration(false)}
        />
      )}

      <LootBox
        isOpen={showLootBox}
        onClose={handleLootClose}
      />

      <BossBattle
        isOpen={showBossBattle}
        onClose={handleBossClose}
        bossId="math-dragon"
      />

      <Inventory
        isOpen={showInventory}
        onClose={handleCloseInventory}
      />
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;