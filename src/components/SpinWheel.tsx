
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";
import { getSegmentColor } from "@/utils/wheelUtils";

interface SpinWheelProps {
  entries: string[];
  onSpin?: (winner: string) => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ entries, onSpin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { toast: uiToast } = useToast();
  
  const spinWheel = () => {
    if (isSpinning || entries.length === 0) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Calculate a random spin (at least 5 full rotations + random position)
    const spinAngle = 5 * 360 + Math.floor(Math.random() * 360);
    const newRotation = rotation + spinAngle;
    
    // Update CSS variable for animation
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--spin-wheel-angle', `${spinAngle}deg`);
    }

    // Determine the winner based on where the wheel stops
    setTimeout(() => {
      const segmentAngle = 360 / entries.length;
      const normalizedRotation = spinAngle % 360;
      const winnerIndex = Math.floor((360 - normalizedRotation) / segmentAngle);
      const actualWinner = entries[winnerIndex % entries.length];
      
      setRotation(newRotation);
      setWinner(actualWinner);
      setIsSpinning(false);
      showConfetti();
      
      if (onSpin) {
        onSpin(actualWinner);
      }
      
      toast.success(`Winner: ${actualWinner}`, {
        description: 'Congratulations!',
      });
    }, 5000); // Match this with the CSS animation duration
  };
  
  const showConfetti = () => {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create confetti pieces
    const colors = ['#ea384c', '#66bb6a', '#1EAEDB', '#8B5CF6', '#F97316', '#D946EF'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti animate-confetti-fall';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      container.appendChild(confetti);
    }
    
    // Clean up confetti after animation completes
    setTimeout(() => {
      if (container) {
        container.innerHTML = '';
      }
    }, 5000);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div id="confetti-container" className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden" />
      
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg mb-8">
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full z-10 border-2 border-gray-400"></div>
        
        {/* Wheel */}
        <div 
          ref={wheelRef}
          className="w-full h-full relative transform"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {entries.length > 0 && entries.map((entry, index) => {
            const segmentAngle = 360 / entries.length;
            const rotation = index * segmentAngle;
            const color = getSegmentColor(index);
            
            return (
              <div 
                key={index}
                className="wheel-segment"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  backgroundColor: color
                }}>
                <div 
                  className="wheel-segment-label"
                  style={{
                    transform: `rotate(${segmentAngle / 2}deg) translateY(-150%) rotate(-${rotation + segmentAngle / 2}deg)`,
                    left: '50%',
                    fontSize: entries.length > 20 ? '0.65rem' : entries.length > 10 ? '0.8rem' : '1rem',
                  }}>
                  <span className="max-w-16 truncate">{entry}</span>
                </div>
              </div>
            );
          })}

          {entries.length === 0 && (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-muted-foreground text-center p-4">
                Add items to the wheel to begin
              </p>
            </div>
          )}
        </div>
        
        {/* Pointer */}
        <div className="wheel-pointer bg-black"></div>
      </div>
      
      <Button 
        disabled={isSpinning || entries.length === 0}
        onClick={spinWheel}
        className="w-32 transition-all hover:scale-105"
        size="lg"
      >
        {isSpinning ? "Spinning..." : "SPIN"}
      </Button>
      
      {winner && !isSpinning && (
        <div className="mt-4 bg-primary text-primary-foreground p-3 rounded-md shadow-md animate-fade-in">
          <p className="text-lg font-bold">Winner: {winner}</p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
