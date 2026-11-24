import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function PhoneContainer({ children, currentTime = "9:11" }) {
  return (
    <div className="relative flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Outer Phone Shell (iPhone 14 / Pro Form Factor: 390x844 inner) */}
      <div className="relative w-[390px] h-[844px] max-w-full bg-[#09090B] text-[#FAFAFA] rounded-[50px] p-3 shadow-phone border-[8px] border-[#202024] ring-1 ring-white/10 overflow-hidden flex flex-col">
        
        {/* Dynamic Island / Top Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-inner border border-white/5 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#101014] border border-white/10 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#18233c]" />
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#0d131f] border border-white/5" />
        </div>

        {/* Clean iOS Status Bar */}
        <div className="w-full h-11 pt-1.5 px-6 flex items-center justify-between text-xs font-semibold tracking-tight text-white/90 z-40 select-none">
          <span className="font-tabular text-[13px] tracking-tight pl-1">{currentTime}</span>
          <div className="flex items-center gap-1.5 pr-1">
            <Signal className="w-3.5 h-3.5 text-white/90 stroke-[2.5]" />
            <span className="text-[10px] font-bold tracking-tight">5G</span>
            <Wifi className="w-3.5 h-3.5 text-white/90 stroke-[2.5]" />
            <div className="flex items-center gap-0.5 ml-0.5">
              <span className="text-[10px] font-medium text-white/80 font-tabular">59%</span>
              <Battery className="w-4 h-4 text-white/90 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Main Screen Content Area */}
        <div className="relative flex-1 w-full overflow-hidden flex flex-col">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />
      </div>

      {/* Subtle branding hint on desktop wrapper */}
      <div className="hidden lg:flex items-center gap-2 mt-3 text-xs text-zinc-500 font-medium">
        <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
        <span>CORE Mobile Experience — 390 × 844px Retina Native Container</span>
      </div>
    </div>
  );
}

