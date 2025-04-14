
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
      // The segmentAngle is the angle taken by each segment
      const segmentAngle = 360 / entries.length;
      
      // Get normalized rotation between 0-359 degrees
      const normalizedRotation = newRotation % 360;
      
      // Calculate which segment is at the top indicator (pointer)
      // When the wheel stops, we need to find which segment is at the top (0 degrees)
      
      // IMPORTANT FIX: The key insight is that the wheel rotates clockwise,
      // so we need to find which segment is at the top position after rotation
      
      // Since we're rotating clockwise, we can determine the segment
      // by calculating how many segments have passed the top indicator
      
      // First, convert the rotation to segment index (how many segments have passed)
      const segmentsPassed = Math.floor(normalizedRotation / segmentAngle);
      
      // Then calculate which segment is now at the top (index in entries array)
      // We need to go counterclockwise from the starting position (entry[0] at top)
      // The formula is: (total segments - segments passed) % total segments
      const winningSegmentIndex = (entries.length - segmentsPassed) % entries.length;
      
      // Get the actual winner from entries array
      const actualWinner = entries[winningSegmentIndex];
      
      console.log({
        normalizedRotation,
        segmentAngle,
        segmentsPassed,
        winningSegmentIndex,
        actualWinner,
        entriesLength: entries.length,
        // Log full entries array for debugging
        entries: entries
      });
      
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
  
  // Render wheel segments and labels
  const renderWheelSegments = () => {
    if (entries.length === 0) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-muted-foreground text-center p-4">
            Add items to the wheel to begin
          </p>
        </div>
      );
    }
    
    return entries.map((entry, index) => {
      const segmentAngle = 360 / entries.length;
      const rotation = index * segmentAngle;
      const color = getSegmentColor(index);
      
      return (
        <div 
          key={index}
          className="absolute w-full h-full"
          style={{ 
            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(rotation * Math.PI / 180)}% ${50 + 50 * Math.sin(rotation * Math.PI / 180)}%, ${50 + 50 * Math.cos((rotation + segmentAngle) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation + segmentAngle) * Math.PI / 180)}%)`,
            backgroundColor: color,
          }}
        >
          {renderSegmentLabel(entry, index, entries.length)}
        </div>
      );
    });
  };
  
  // Add a function to correctly render the numbers on the wheel
  // This ensures visual alignment with the winner calculation
  const renderSegmentLabel = (entry: string, index: number, totalEntries: number) => {
    const segmentAngle = 360 / totalEntries;
    const rotation = index * segmentAngle;
    
    // Calculate position for labels - placing them at mid-radius for better visibility
    const labelDistance = 45; // percentage from center - moved closer for better visibility
    const labelAngle = rotation + segmentAngle / 2;
    const labelRadians = (labelAngle * Math.PI) / 180;
    const labelX = 50 + labelDistance * Math.cos(labelRadians);
    const labelY = 50 + labelDistance * Math.sin(labelRadians);
    
    return (
      <div 
        className="wheel-segment-label"
        style={{ 
          position: 'absolute',
          top: `${labelY}%`,
          left: `${labelX}%`,
          transform: `translate(-50%, -50%) rotate(${labelAngle + 90}deg)`,
          fontSize: totalEntries > 20 ? '12px' : '16px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
          zIndex: 5,
        }}
      >
        <span>{entry}</span>
      </div>
    );
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
      
      {/* Wheel Container with thick white border */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        <div 
          className="w-full h-full rounded-full border-[12px] border-white relative bg-white shadow-xl"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
        >
          {/* Wheel */}
          <div 
            ref={wheelRef}
            className={`w-full h-full relative rounded-full overflow-hidden ${isSpinning ? 'animate-spin-wheel' : ''}`}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease',
            }}
          >
            {renderWheelSegments()}
            
            {/* Center SPIN button */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10
                        w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer"
              onClick={spinWheel}
            >
              <span className="text-white font-bold text-2xl">SPIN</span>
            </div>
          </div>
          
          {/* Triangle Pointer */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: 'black',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        </div>
      </div>
      
      <Button 
        disabled={isSpinning || entries.length === 0}
        onClick={spinWheel}
        className="w-32 mt-6 transition-all hover:scale-105 bg-purple-600 hover:bg-purple-700 text-white font-bold"
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
