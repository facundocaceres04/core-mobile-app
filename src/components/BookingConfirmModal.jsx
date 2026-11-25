import React, { useState } from 'react';
import Sheet from './Sheet';
import { Calendar, Clock, MapPin, ShieldCheck, ChevronDown, ChevronUp, UserCheck, Check } from 'lucide-react';

export default function BookingConfirmModal({ slot, sede, dateObj, onConfirm, onClose }) {
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!slot || !sede || !dateObj) return null;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm(slot, sede, dateObj);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <Sheet
      title="Confirmar Reserva"
      icon={<span className="block w-2 h-2 rounded-full bg-[#FF4D24]" />}
      onClose={onClose}
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button
            onClick={onClose}
            className="w-full sm:w-auto sm:flex-1 min-h-[44px] py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Volver
          </button>
          <button
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="w-full sm:flex-[2] min-h-[48px] py-3 px-4 rounded-xl bg-[#FF4D24] hover:bg-[#E53E17] active:scale-[0.99] disabled:opacity-80 text-white font-bold text-xs tracking-wider uppercase shadow-glow-core transition-all duration-150 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Confirmar Reserva</span>
            )}
          </button>
        </div>
      }
    >
        {/* Class Details Card */}
        <div className="p-4 rounded-2xl bg-[#121215] border border-white/[0.08] space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-[#FF4D24] uppercase tracking-[0.14em]">
                CORE CALISTENIA & FUNCIONAL
              </span>
              <h4 className="text-base font-bold text-white tracking-wide mt-0.5 break-words">
                {sede.name}
              </h4>
            </div>
            <div className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
              50 min
            </div>
          </div>

          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2 pt-2 border-t border-white/5">
            <div className="flex min-w-0 items-center gap-2 text-xs text-zinc-300">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-[#FF4D24]" />
              <span className="truncate">{dateObj.fullLabel || dateObj.dayName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Clock className="w-3.5 h-3.5 shrink-0 text-[#FF4D24]" />
              <span className="font-bold font-tabular text-white">{slot.time} HS</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{sede.address}</span>
          </div>

          {slot.coach && (
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <UserCheck className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Coach: <strong className="text-zinc-200 font-semibold">{slot.coach}</strong></span>
            </div>
          )}
        </div>

        {/* Highlighted Business Cancellation Rule (Clean 1-liner) */}
        <div className="mt-3 p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-300 leading-snug">
            <strong>Cancelación sin cargo</strong> hasta 1 hora antes de la clase para liberar el lugar y permitir que otro alumno entrene.
          </p>
        </div>

        {/* Expandable Terms Accordion */}
        <div className="mt-3">
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 flex items-center justify-between text-xs text-zinc-400 transition-colors"
          >
            <span className="text-left">Términos y condiciones de cupos</span>
            {showTerms ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
          </button>

          {showTerms && (
            <div className="mt-2 p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-zinc-400 space-y-1.5 leading-relaxed animate-in fade-in duration-200">
              <p>• <strong>Ventana de reserva:</strong> Podés agendar turnos con hasta 7 días de antelación.</p>
              <p>• <strong>Cancelación tardía:</strong> Dentro de la última hora podés cancelar para ceder tu cupo a la lista de espera, pero la clase computará como ausente.</p>
              <p>• <strong>Pausa de convivencia:</strong> Dos ausencias consecutivas sin aviso aplican una pausa preventiva de 48 horas para agendar nuevos turnos.</p>
              <p>• <strong>Lista de espera:</strong> Al liberarse un cupo, se notifica a los alumnos en orden de registro.</p>
            </div>
          )}
        </div>
    </Sheet>
  );
}
