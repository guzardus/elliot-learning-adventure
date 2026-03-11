import { useState, useEffect } from 'react';
import { GameProvider, useGameState } from '@/hooks/useGameState';
import { NameEntry } from '@/components/mythic/NameEntry';
import { AdventureHub } from '@/sections/AdventureHub';
import { ActivityScreen } from '@/sections/ActivityScreen';
import { BossBattle } from '@/components/mythic/BossBattle';
import { LootBox } from '@/components/mythic/LootBox';
import { Collection } from '@/components/mythic/Collection';
import { Celebration } from '@/components/Celebration';
import type { ActivityType } from '@/types';

export type Screen = 
  | 'name-entry'
  | 'adventure-hub'
  | 'activity'
  | 'collection';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('name-entry');
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [showLootBox, setShowLootBox] = useState(false);
  const [showBossBattle, setShowBossBattle] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const { state, updateStreak } = useGameState();

  // Update streak on app load and check if returning user
  useEffect(() => {
    updateStreak();
    // Check if user has already entered their name
    if (state.player.name !== 'Wizard' && state.player.name !== '') {
      setCurrentScreen('adventure-hub');
    }
  }, []);

  const handleNameComplete = () => {
    setCurrentScreen('adventure-hub');
  };

  const handleSelectActivity = (activity: ActivityType) => {
    setSelectedActivity(activity);
    setCurrentScreen('activity');
  };

  const handleActivityComplete = (xpEarned: number, lootId?: string) => {
    if (xpEarned > 0) {
      setCelebrationMessage(`+${xpEarned} XP!`);
      setShowCelebration(true);
    }

    // Award loot box for completing activity
    if (lootId) {
      setTimeout(() => {
        setShowLootBox(true);
      }, 1500);
    }
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

  const handleOpenCollection = () => {
    setShowCollection(true);
  };

  const handleCloseCollection = () => {
    setShowCollection(false);
  };

  const handleBack = () => {
    if (currentScreen === 'activity') {
      setCurrentScreen('adventure-hub');
      setSelectedActivity(null);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'name-entry':
        return <NameEntry onComplete={handleNameComplete} />;
      case 'adventure-hub':
        return (
          <AdventureHub 
            onSelectActivity={handleSelectActivity}
            onBossBattle={handleBossBattle}
            onViewCollection={handleOpenCollection}
          />
        );
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
        bossId="weekly-boss"
      />

      <Collection
        isOpen={showCollection}
        onClose={handleCloseCollection}
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