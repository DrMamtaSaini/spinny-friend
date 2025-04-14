
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";
import { getSegmentColor } from "@/utils/wheelUtils";
import { Sparkles } from "lucide-react";

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
    
    // Create confetti pieces with more vibrant colors
    const colors = ['#ea384c', '#66bb6a', '#1EAEDB', '#8B5CF6', '#F97316', '#D946EF', '#FFEB3B', '#00BCD4'];
    
    for (let i = 0; i < 150; i++) { // Increased number of confetti pieces
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
      
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-xl mb-8">
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-600 rounded-full z-10 border-4 border-white shadow-md flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {isSpinning ? "..." : "SPIN"}
          </span>
        </div>
        
        {/* Wheel */}
        <div 
          ref={wheelRef}
          className={`w-full h-full relative transform ${isSpinning ? 'animate-spin-wheel' : ''}`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.3s ease',
            boxShadow: '0 0 30px rgba(0,0,0,0.2)',
            borderRadius: '50%',
            background: 'white',
          }}
        >
          {entries.length > 0 && entries.map((entry, index) => {
            const segmentAngle = 360 / entries.length;
            const rotation = index * segmentAngle;
            const color = getSegmentColor(index);
            
            // Calculate position for number labels - position farther from center
            const labelDistance = 78; // percentage from center
            const labelAngle = rotation + segmentAngle / 2;
            const labelRadians = (labelAngle * Math.PI) / 180;
            const labelX = 50 + labelDistance * Math.cos(labelRadians);
            const labelY = 50 + labelDistance * Math.sin(labelRadians);
            
            return (
              <div 
                key={index}
                className="wheel-segment"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  backgroundColor: color,
                  borderRight: '1px solid rgba(255,255,255,0.3)',
                  borderTop: '1px solid rgba(255,255,255,0.3)'
                }}>
                <div 
                  className="wheel-segment-label"
                  style={{ 
                    position: 'absolute',
                    top: `${labelY}%`,
                    left: `${labelX}%`,
                    transform: `translate(-50%, -50%) rotate(${90 + labelAngle}deg)`,
                  }}>
                  <span className="wheel-number">{entry}</span>
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
        <div className="wheel-pointer"></div>
      </div>
      
      <Button 
        disabled={isSpinning || entries.length === 0}
        onClick={spinWheel}
        className="w-32 transition-all hover:scale-105 bg-purple-600 hover:bg-purple-700 text-white font-bold"
        size="lg"
      >
        {isSpinning ? "Spinning..." : (
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            SPIN
          </span>
        )}
      </Button>
      
      {winner && !isSpinning && (
        <div className="mt-4 bg-purple-600 text-white p-3 px-6 rounded-full shadow-lg animate-fade-in">
          <p className="text-lg font-bold">Winner: {winner}</p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
