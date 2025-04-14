
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import SpinWheel from '@/components/SpinWheel';
import WheelSettings from '@/components/WheelSettings';
import { getDefaultRouletteNumbers } from '@/utils/wheelUtils';

const Index: React.FC = () => {
  const [entries, setEntries] = useState<string[]>(getDefaultRouletteNumbers());
  const [winners, setWinners] = useState<string[]>([]);

  const handleWinner = (winner: string) => {
    setWinners(prev => [winner, ...prev]);
  };

  return (
    <MainLayout>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
          Spin to Win!
        </h1>
        <p className="text-lg text-muted-foreground">
          Customize your wheel and spin for a random winner.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
        <div className="order-2 md:order-1">
          <WheelSettings 
            entries={entries} 
            setEntries={setEntries} 
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
