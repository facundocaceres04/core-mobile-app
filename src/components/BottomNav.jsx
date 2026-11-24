import React from 'react';
import { Home, CalendarDays, Flame, User } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab, bookingsCount = 0 }) {
  const tabs = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: Home,
    },
    {
      id: 'reservar',
      label: 'Reservar',
      icon: CalendarDays,
      badge: bookingsCount > 0 ? bookingsCount : null,
    },
    {
      id: 'workouts',
      label: 'Workouts',
      icon: Flame,
    },
    {
      id: 'cuenta',
      label: 'Cuenta',
      icon: User,
    },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-[68px] bg-[#121215]/95 backdrop-blur-xl border-t border-white/[0.08] px-4 pb-2 z-40 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-3 transition-all duration-200 group ${
              isActive ? 'text-[#FF4D24]' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {/* Active Pill Glow Indicator */}
            {isActive && (
              <span className="absolute -top-1 w-6 h-0.5 rounded-full bg-[#FF4D24] shadow-[0_0_8px_#FF4D24]" />
            )}

            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 stroke-[2.4]' : 'group-hover:scale-105 stroke-[1.8]'
                }`}
              />

              {/* Dynamic Badge for bookings */}
              {tab.badge && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF4D24] text-white text-[10px] font-bold font-tabular flex items-center justify-center border border-[#121215] shadow-sm animate-in zoom-in-50">
                  {tab.badge}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] tracking-wider uppercase mt-1 transition-colors ${
                isActive ? 'text-white font-bold' : 'text-zinc-400 font-medium'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
