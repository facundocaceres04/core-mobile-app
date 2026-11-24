import React, { useEffect } from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type !== 'error' && toast.type !== 'info';

  return (
    <div className="absolute top-12 left-3 right-3 z-50 animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-auto">
      <div className="bg-[#18181C]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              isSuccess
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : toast.type === 'error'
                ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                : 'bg-[#FF4D24]/15 text-[#FF4D24] border border-[#FF4D24]/30'
            }`}
          >
            {isSuccess ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <Info className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-white text-xs tracking-wide uppercase leading-tight truncate">
              {toast.title}
            </p>
            {toast.message && (
              <p className="text-zinc-400 text-[11px] leading-snug mt-0.5 truncate">
                {toast.message}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
