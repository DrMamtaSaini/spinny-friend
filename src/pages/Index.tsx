
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import SpinWheel from '@/components/SpinWheel';
import WheelSettings from '@/components/WheelSettings';
import AdSpace from '@/components/AdSpace';
import { getDefaultRouletteNumbers, validateEntriesLimit } from '@/utils/wheelUtils';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const [entries, setEntries] = useState<string[]>(getDefaultRouletteNumbers());
  const [showSettings, setShowSettings] = useState<boolean>(true);

  // Ensure we don't exceed the limit of 50 entries
  const handleSetEntries = (newEntries: string[] | ((prev: string[]) => string[])) => {
    if (typeof newEntries === 'function') {
      setEntries((prev) => validateEntriesLimit(newEntries(prev)));
    } else {
      setEntries(validateEntriesLimit(newEntries));
    }
  };

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Spinny Wheel
        </h1>
        <p className="text-lg text-muted-foreground">
          Customize your wheel and spin for a random selection.
        </p>
      </div>

      {/* Top AdSpace - non-sticky */}
      <AdSpace className="mb-8" />

      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleSettings}
          className="flex items-center gap-2"
        >
          {showSettings ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span>Hide Settings</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>Show Settings</span>
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        {showSettings && (
          <div className="order-2 md:order-1 transition-all duration-300 animate-fade-in">
            <WheelSettings 
              entries={entries} 
              setEntries={handleSetEntries} 
            />
          </div>
        )}
        
        <div className={`order-1 md:order-2 flex flex-col items-center gap-4 transition-all duration-300 ${!showSettings ? "w-full" : ""}`}>
          <SpinWheel 
            entries={entries} 
          />
        </div>
      </div>

      {/* Bottom AdSpace - sticky */}
      <AdSpace isSticky adUnit="8272741641" className="mt-8" />
    </MainLayout>
  );
};

export default Index;
