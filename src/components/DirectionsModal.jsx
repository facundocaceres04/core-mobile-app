import React, { useState } from 'react';
import { X, MapPin, Navigation, Copy, Check, ExternalLink, Clock, Phone } from 'lucide-react';

export default function DirectionsModal({ target, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!target) return null;

  const address = target.address || "Cabello 3629, CABA";
  const name = target.sedeName || target.name || "CORE Palermo Chico";

  const handleCopy = () => {
    navigator.clipboard?.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end animate-in fade-in duration-200">
      <div className="flex-1 w-full" onClick={onClose} />

      <div className="w-full bg-[#18181C] border-t border-white/10 rounded-t-[32px] p-5 pb-8 shadow-2xl max-h-[85%] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-8 duration-300">
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#FF4D24]" />
            <h3 className="text-sm font-bold text-white tracking-[0.14em] uppercase">Cómo llegar • {name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Simulated Map View */}
        <div className="mt-4 relative h-36 rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden flex items-center justify-center group">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent" />
          
          <div className="relative flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#FF4D24] text-white flex items-center justify-center shadow-glow-core ring-4 ring-[#FF4D24]/20">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="w-2 h-2 rounded-full bg-black/50 mt-1 blur-[1px]" />
          </div>

          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] tracking-wider uppercase text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <span className="font-bold text-white truncate">{name}</span>
            <span className="text-emerald-400 font-bold shrink-0">Abierto ahora</span>
          </div>
        </div>

        {/* Address Card */}
        <div className="mt-3 p-3.5 rounded-2xl bg-[#121215] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Dirección oficial</span>
            <button
              onClick={handleCopy}
              className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copied ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Copiado
                </span>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copiar
                </>
              )}
            </button>
          </div>
          <p className="text-sm font-bold text-white">{address}</p>
        </div>

        {/* Opening Hours & Contact */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold tracking-wider uppercase">
              <Clock className="w-3.5 h-3.5 text-[#FF4D24]" /> Horarios
            </div>
            <p className="text-xs text-white font-semibold">07:00 a 21:00 hs</p>
            <p className="text-[10px] text-zinc-400">Lunes a Viernes</p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold tracking-wider uppercase">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Sede
            </div>
            <p className="text-xs text-white font-semibold">+54 11 5821-CORE</p>
            <p className="text-[10px] text-zinc-400">Atención al socio</p>
          </div>
        </div>

        {/* External Map Buttons */}
        <div className="mt-4 space-y-2">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#FF4D24] hover:bg-[#E53E17] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-glow-core transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Abrir en Google Maps / Apple Maps</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
