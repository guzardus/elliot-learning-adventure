import { useEffect } from 'react';

interface AvatarCreatorProps {
  onComplete: () => void;
}

// DEPRECATED: This component is no longer used.
// The new onboarding uses NameEntry and CompanionSelect instead.
export function AvatarCreator({ onComplete }: AvatarCreatorProps) {
  useEffect(() => {
    // Immediately complete since we use the new onboarding flow
    onComplete();
  }, [onComplete]);

  return null;
}