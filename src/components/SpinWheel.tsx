
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
    
    // Create confetti pieces with more vibrant colors
    const colors = ['#ea384c', '#66bb6a', '#1EAEDB', '#8B5CF6', '#F97316', '#D946EF', '#FFEB3B', '#00BCD4'];
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti animate-confetti-fall';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      container.appendChild(confetti);
    }
    
    setTimeout(() => {
      if (container) {
        container.innerHTML = '';
      }
    }, 5000);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div id="confetti-container" className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden" />
      
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl mb-8">
        {/* Wheel Container with White Border */}
        <div 
          className="w-full h-full rounded-full border-8 border-white relative bg-white shadow-lg"
          style={{ boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}
        >
          {/* Wheel */}
          <div 
            ref={wheelRef}
            className={`w-full h-full relative ${isSpinning ? 'animate-spin-wheel' : ''}`}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            {entries.length > 0 && entries.map((entry, index) => {
              const segmentAngle = 360 / entries.length;
              const rotation = index * segmentAngle;
              const color = getSegmentColor(index);
              
              // Calculate position for labels - placing them in the middle of the segment but closer to the edge
              const labelDistance = 35; // percentage from center to edge
              const labelAngle = rotation + segmentAngle / 2;
              const labelRadians = ((labelAngle - 90) * Math.PI) / 180; // Subtract 90 to start from the top
              const labelX = 50 + labelDistance * Math.cos(labelRadians);
              const labelY = 50 + labelDistance * Math.sin(labelRadians);
              
              return (
                <div 
                  key={index}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ 
                    clipPath: `path('M ${50}% ${50}% L ${50 + 50 * Math.cos((rotation - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation - 90) * Math.PI / 180)}% A 50% 50% 0 0 1 ${50 + 50 * Math.cos((rotation + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation + segmentAngle - 90) * Math.PI / 180)}% Z')`,
                    backgroundColor: color,
                  }}
                >
                  <div 
                    className="wheel-segment-label"
                    style={{ 
                      top: `${labelY}%`,
                      left: `${labelX}%`,
                      transform: `translate(-50%, -50%) rotate(${labelAngle}deg)`,
                    }}
                  >
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
          
          {/* Center SPIN button */}
          <div className="spin-button" onClick={spinWheel}>
            SPIN
          </div>
          
          {/* Triangle Pointer */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'black',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        </div>
      </div>
      
      <Button 
        disabled={isSpinning || entries.length === 0}
        onClick={spinWheel}
        className="w-32 transition-all hover:scale-105 bg-purple-600 hover:bg-purple-700 text-white font-bold"
        size="lg"
      >
        {isSpinning ? "Spinning..." : "SPIN"}
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
