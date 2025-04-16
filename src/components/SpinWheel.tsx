import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { getSegmentColor } from "@/utils/wheelUtils";

interface SpinWheelProps {
  entries: string[];
  onSpin?: (winner: string) => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ entries, onSpin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const spinWheel = () => {
    if (isSpinning || entries.length === 0) return;
    
    setIsSpinning(true);
    
    const spinAngle = 5 * 360 + Math.floor(Math.random() * 360);
    const newRotation = rotation + spinAngle;
    
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--spin-wheel-angle', `${spinAngle}deg`);
    }

    setTimeout(() => {
      // Calculate the final angle (normalized to 0-360 range)
      const finalAngle = newRotation % 360;
      const totalSegments = entries.length;
      const degreesPerSegment = 360 / totalSegments;
      
      // Corrected winner calculation logic:
      // Since wheel rotates clockwise, we need to figure out which segment
      // ends up at the top pointer (0 degrees) after spinning
      
      // Step 1: Convert the final angle to a position on the wheel (which segment is at the top)
      // We need to invert the angle because the wheel spins clockwise
      const normalizedAngle = (360 - finalAngle) % 360;
      
      // Step 2: Calculate which segment lands at the pointer
      const winnerIndex = Math.floor(normalizedAngle / degreesPerSegment);
      
      // Step 3: Ensure the index is within bounds
      const safeWinnerIndex = (winnerIndex >= 0 && winnerIndex < entries.length) ? 
        winnerIndex : winnerIndex % entries.length;
      
      // Step 4: Get the actual winner
      const winner = entries[safeWinnerIndex];
      
      console.log({
        finalAngle,
        normalizedAngle,
        degreesPerSegment,
        winnerIndex,
        safeWinnerIndex,
        winner,
        entriesLength: entries.length
      });
      
      setRotation(newRotation);
      setIsSpinning(false);
      showConfetti();
      
      if (onSpin) {
        onSpin(winner);
      }
    }, 5000);
  };
  
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
  
  const renderSegmentLabel = (entry: string, index: number, totalEntries: number) => {
    const segmentAngle = 360 / totalEntries;
    const rotation = index * segmentAngle;
    
    const labelDistance = 40;
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
          whiteSpace: 'nowrap',
        }}
      >
        {entry}
      </div>
    );
  };

  const showConfetti = () => {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    container.innerHTML = '';
    
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

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin-wheel {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(var(--spin-wheel-angle)); }
      }
      .animate-spin-wheel {
        animation: spin-wheel 5s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
      }
      @keyframes confetti-fall {
        0% {
          transform: translateY(-50px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
      .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 10%;
        pointer-events: none;
        opacity: 0;
      }
      .animate-confetti-fall {
        animation: confetti-fall 3s linear forwards;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full">
      <div id="confetti-container" className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden" />
      
      <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]">
        <div 
          className="w-full h-full rounded-full border-[12px] border-white relative bg-white shadow-xl"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
        >
          <div 
            ref={wheelRef}
            className={`w-full h-full relative rounded-full overflow-hidden ${isSpinning ? 'animate-spin-wheel' : ''}`}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease',
            }}
          >
            {renderWheelSegments()}
            
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10
                        w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer
                        hover:bg-purple-700 transition-colors"
              onClick={spinWheel}
            >
              <span className="text-white font-bold text-lg md:text-2xl">SPIN</span>
            </div>
          </div>
          
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10"
            style={{
              width: '20px',
              height: '50px', 
              backgroundColor: '#FF4081',
              clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))',
              position: 'absolute', 
              top: '-25px',
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
    </div>
  );
};

export default SpinWheel;
