
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import SpinWheel from '@/components/SpinWheel';
import WheelSettings from '@/components/WheelSettings';
import { getDefaultRouletteNumbers, validateEntriesLimit } from '@/utils/wheelUtils';

const Index: React.FC = () => {
  const [entries, setEntries] = useState<string[]>(getDefaultRouletteNumbers());
  const [winners, setWinners] = useState<string[]>([]);

  const handleWinner = (winner: string) => {
    setWinners(prev => [winner, ...prev]);
  };

  // Ensure we don't exceed the limit of 100 entries
  const handleSetEntries = (newEntries: string[] | ((prev: string[]) => string[])) => {
    if (typeof newEntries === 'function') {
      setEntries((prev) => validateEntriesLimit(newEntries(prev)));
    } else {
      setEntries(validateEntriesLimit(newEntries));
    }
  };

  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Spinny Saga
        </h1>
        <p className="text-lg text-muted-foreground">
          Customize your wheel and spin for a random winner.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        <div className="order-2 md:order-1">
          <WheelSettings 
            entries={entries} 
            setEntries={handleSetEntries} 
            winners={winners} 
          />
        </div>
        
        <div className="order-1 md:order-2 flex flex-col items-center gap-4">
          <SpinWheel 
            entries={entries} 
            onSpin={handleWinner} 
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
