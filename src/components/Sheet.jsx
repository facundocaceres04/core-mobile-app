import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const SIZES = {
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-xl',
};

/**
 * Contenedor modal responsive:
 * - Mobile: bottom sheet anclado abajo, respeta safe-area.
 * - sm+: diálogo centrado.
 * Cierra con Escape o tocando el fondo.
 */
export default function Sheet({
  title,
  subtitle,
  icon,
  onClose,
  children,
  footer,
  size = 'md',
  tall = false,
}) {
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative flex w-full flex-col overflow-hidden rounded-t-[28px] border border-b-0 border-white/10 bg-[#18181C] shadow-2xl outline-none animate-in fade-in slide-in-from-bottom-8 duration-300 sm:rounded-3xl sm:border-b sm:slide-in-from-bottom-0 sm:zoom-in-95 ${
          SIZES[size]
        } ${tall ? 'h-[92dvh] sm:h-[85dvh]' : 'max-h-[92dvh] sm:max-h-[85dvh]'} mt-[env(safe-area-inset-top,0px)]`}
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/20 sm:hidden" />

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-5 pb-3 pt-3 sm:pt-5">
          <div className="min-w-0">
            <h3 className="flex min-w-0 items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-white">
              {icon && <span className="shrink-0">{icon}</span>}
              <span className="truncate">{title}</span>
            </h3>
            {subtitle && <p className="mt-0.5 truncate text-[11px] text-zinc-400">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body (scroll) */}
        <div
          className={`app-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pt-4 ${
            footer ? 'pb-4' : 'pb-[calc(env(safe-area-inset-bottom,0px)+20px)]'
          }`}
        >
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-white/[0.06] px-5 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
