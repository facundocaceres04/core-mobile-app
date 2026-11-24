import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Navigation, Trash2, AlertTriangle, ArrowRight, Check } from 'lucide-react';

export default function MyReservationsDrawer({
  bookings,
  onCancelBooking,
  onOpenDirections,
  onGoToBooking,
  onClose,
}) {
  const [confirmCancelId, setConfirmCancelId] = useState(null);

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col justify-end animate-in fade-in duration-200">
      {/* Background dismiss */}
      <div className="flex-1 w-full" onClick={onClose} />

      {/* Drawer Surface */}
      <div className="w-full bg-[#18181C] border-t border-white/10 rounded-t-[32px] p-5 pb-8 shadow-2xl h-[88%] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Top Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3 shrink-0" />

        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-sm font-bold text-white tracking-[0.14em] uppercase">
                CLASES RESERVADAS
              </h3>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5 font-tabular">
              {bookings.length} {bookings.length === 1 ? 'turno confirmado' : 'turnos confirmados'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto no-scrollbar mt-3 space-y-3 pr-0.5">
          {bookings.length > 0 ? (
            bookings.map((booking) => {
              const isConfirming = confirmCancelId === booking.id;

              return (
                <div
                  key={booking.id}
                  className="p-4 rounded-2xl bg-[#121215] border border-white/[0.08] space-y-3 relative overflow-hidden transition-all hover:border-white/15"
                >
                  {/* Left accent hairline */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />

                  {/* Top row: Sede & Status */}
                  <div className="flex items-start justify-between pl-1">
                    <div>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                        CALISTENIA & FUNCIONAL
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-wide mt-0.5">
                        {booking.sedeName}
                      </h4>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                        <span className="truncate">{booking.address}</span>
                      </p>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shrink-0">
                      <Check className="w-3 h-3 stroke-[2.5]" /> Confirmada
                    </span>
                  </div>

                  {/* Middle row: Date & Time */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 pl-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF4D24]" />
                      <span className="font-semibold text-white truncate">{booking.dateFormatted}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF4D24]" />
                      <span className="font-bold font-tabular text-white">{booking.timeLabel || `${booking.time} HS`}</span>
                    </div>
                  </div>

                  {/* Bottom row: Actions */}
                  {isConfirming ? (
                    <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center gap-2 text-xs text-red-300 font-medium">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>¿Liberar este cupo en {booking.sedeName}?</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => {
                            onCancelBooking(booking.id);
                            setConfirmCancelId(null);
                          }}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-colors"
                        >
                          Sí, liberar
                        </button>
                        <button
                          onClick={() => setConfirmCancelId(null)}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-zinc-300 text-xs font-semibold tracking-wider uppercase transition-colors"
                        >
                          Volver
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                      <button
                        onClick={() => onOpenDirections(booking)}
                        className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold tracking-wider uppercase text-zinc-200 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#FF4D24]" />
                        <span>Cómo llegar</span>
                      </button>

                      <button
                        onClick={() => setConfirmCancelId(booking.id)}
                        className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors border border-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancelar</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-zinc-500">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">Sin reservas activas</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Seleccioná un día y horario en tu sede para agendar tu próxima clase.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onGoToBooking();
                }}
                className="mt-2 py-2 px-4 rounded-xl bg-[#FF4D24] hover:bg-[#E53E17] text-white text-xs font-bold tracking-wider uppercase shadow-glow-core inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Ver turnos disponibles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
