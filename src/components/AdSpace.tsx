
import React from 'react';
import { cn } from '@/lib/utils';

interface AdSpaceProps extends React.HTMLAttributes<HTMLDivElement> {}

const AdSpace: React.FC<AdSpaceProps> = ({ className, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center",
        className
      )} 
      {...props}
    >
      <p className="text-sm text-gray-400">Ad Space</p>
    </div>
  );
};

export default AdSpace;
