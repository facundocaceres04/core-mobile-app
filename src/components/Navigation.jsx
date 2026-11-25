import React from 'react';
import { Home, CalendarDays, Flame, User } from 'lucide-react';

const TABS = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'reservar', label: 'Reservar', icon: CalendarDays, showBadge: true },
  { id: 'workouts', label: 'Workouts', icon: Flame },
  { id: 'cuenta', label: 'Cuenta', icon: User },
];

function Badge({ count, className = '' }) {
  if (!count) return null;
  return (
    <span
      className={`min-w-[16px] h-4 px-1 rounded-full bg-[#FF4D24] text-white text-[10px] font-bold font-tabular flex items-center justify-center ${className}`}
    >
      {count}
    </span>
  );
}

/** Tab bar inferior — sólo mobile (< md) */
export function BottomNav({ activeTab, onSelectTab, bookingsCount = 0 }) {
  return (
    <nav
      aria-label="Navegación principal"
      className="md:hidden shrink-0 border-t border-white/[0.08] bg-[#121215]/95 backdrop-blur-xl pb-safe-b"
    >
      <div className="mx-auto flex h-16 max-w-2xl items-stretch">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 transition-colors active:scale-95 ${
                isActive ? 'text-[#FF4D24]' : 'text-zinc-400'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-[#FF4D24] shadow-[0_0_8px_#FF4D24]" />
              )}
              <span className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {tab.showBadge && (
                  <Badge count={bookingsCount} className="absolute -top-1.5 -right-2.5 border border-[#121215]" />
                )}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider ${
                  isActive ? 'font-bold text-white' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** Barra lateral — tablet y escritorio (md+) */
export function SideNav({ activeTab, onSelectTab, bookingsCount = 0 }) {
  return (
    <nav
      aria-label="Navegación principal"
      className="hidden md:flex w-20 lg:w-60 shrink-0 flex-col border-r border-white/[0.08] bg-[#0C0C0F] pt-[calc(env(safe-area-inset-top,0px)+24px)] pb-6 px-3"
    >
      <div className="mb-8 flex items-baseline justify-center gap-2 lg:justify-start lg:px-3">
        <span className="text-lg font-black uppercase tracking-[0.18em] text-white">CORE</span>
        <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">
          Indoor
        </span>
      </div>

      <ul className="flex flex-col gap-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <li key={tab.id}>
              <button
                onClick={() => onSelectTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                title={tab.label}
                className={`group relative flex w-full flex-col items-center gap-1 rounded-xl px-2 py-2.5 transition-colors lg:flex-row lg:gap-3 lg:px-3 ${
                  isActive
                    ? 'bg-[#FF4D24]/10 text-[#FF4D24]'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="relative">
                  <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                  {tab.showBadge && (
                    <Badge count={bookingsCount} className="absolute -top-1.5 -right-2.5 border border-[#0C0C0F] lg:hidden" />
                  )}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-wider lg:text-xs ${
                    isActive ? 'font-bold text-white' : 'font-semibold'
                  }`}
                >
                  {tab.label}
                </span>
                {tab.showBadge && <Badge count={bookingsCount} className="ml-auto hidden lg:flex" />}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-auto hidden lg:block px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
        somoscore.fit
      </p>
    </nav>
  );
}
