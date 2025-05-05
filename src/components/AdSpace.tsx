
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

// Define the window.adsbygoogle property to avoid TypeScript errors
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  adUnit: string;
  isSticky?: boolean;
}

const AdSpace: React.FC<AdSpaceProps> = ({ className, adUnit, isSticky, ...props }) => {
  useEffect(() => {
    // Initialize ad after component mounts
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [adUnit]);

  return (
    <div
      className={cn(
        "bg-gray-100/50 border border-gray-200 rounded-md flex items-center justify-center min-h-[90px]",
        isSticky && "fixed bottom-0 left-0 right-0 z-50",
        className
      )}
      {...props}
    >
      <div className="text-xs text-gray-500 mb-1 absolute top-1 left-2">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={adUnit}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSpace;
