import React, { useEffect } from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type !== 'error' && toast.type !== 'info';

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center px-3 pt-[calc(env(safe-area-inset-top,0px)+12px)] md:justify-end md:px-6 md:pt-6"
    >
      <div className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-[#18181C]/95 p-3 text-sm shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
            isSuccess
              ? 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
              : toast.type === 'error'
              ? 'border border-red-500/30 bg-red-500/15 text-red-400'
              : 'border border-[#FF4D24]/30 bg-[#FF4D24]/15 text-[#FF4D24]'
          }`}
        >
          {isSuccess ? (
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="h-3.5 w-3.5 stroke-[2.5]" />
          ) : (
            <Info className="h-3.5 w-3.5 stroke-[2.5]" />
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="break-words text-xs font-bold uppercase leading-tight tracking-wide text-white">
            {toast.title}
          </p>
          {toast.message && (
            <p className="mt-0.5 break-words text-[11px] leading-snug text-zinc-400">{toast.message}</p>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="shrink-0 rounded-lg p-1 text-zinc-400 transition-colors hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
