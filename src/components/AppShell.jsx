import React, { forwardRef } from 'react';
import { SideNav, BottomNav } from './Navigation';

/**
 * Layout raíz tipo web app:
 * - Mobile: pantalla completa, contenido con scroll propio y tab bar inferior.
 * - Tablet / escritorio (md+): barra lateral fija y contenido centrado.
 */
const AppShell = forwardRef(function AppShell({ activeTab, onSelectTab, bookingsCount, children }, scrollRef) {
  return (
    <div className="app-height flex w-full overflow-hidden bg-[#09090B] text-[#FAFAFA]">
      <SideNav activeTab={activeTab} onSelectTab={onSelectTab} bookingsCount={bookingsCount} />

      <div className="flex min-w-0 flex-1 flex-col">
        <main
          ref={scrollRef}
          className="app-scroll relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
        >
          <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-[calc(env(safe-area-inset-top,0px)+12px)] sm:px-6 md:pt-8 lg:max-w-3xl lg:px-8 lg:pt-10">
            {children}
          </div>
        </main>

        <BottomNav activeTab={activeTab} onSelectTab={onSelectTab} bookingsCount={bookingsCount} />
      </div>
    </div>
  );
});

export default AppShell;
