import React, { useState, useMemo } from 'react';
import {
  Star,
  ChevronDown,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  UserCheck,
  Bell,
  Calendar,
  Info,
} from 'lucide-react';
import { DAYS_WINDOW, generateScheduleForDay } from '../data/mockData';

export default function BookingView({
  currentSede,
  favoriteSedeId,
  bookings,
  waitlistSlotIds = [],
  onOpenSedeSelector,
  onOpenMyReservations,
  onInitiateBooking,
  onCancelBooking,
  onToggleWaitlist,
}) {
  const [selectedDateId, setSelectedDateId] = useState(DAYS_WINDOW[0].id);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Generate slots for this date and sede
  const rawSlots = useMemo(() => {
    return generateScheduleForDay(selectedDateId, currentSede.id);
  }, [selectedDateId, currentSede.id]);

  // Set of booked slot signatures
  const userBookedMap = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => {
      map.set(`${b.dateId}_${b.time}`, b);
    });
    return map;
  }, [bookings]);

  // Set of dates that have at least one booking
  const bookedDatesSet = useMemo(() => {
    return new Set(bookings.map((b) => b.dateId));
  }, [bookings]);

  // Computed slots with live reservation states
  const computedSlots = useMemo(() => {
    return rawSlots.map((slot) => {
      const userBooking = userBookedMap.get(`${selectedDateId}_${slot.time}`);
      const isUserBooked = Boolean(userBooking);
      const isWaitlisted = waitlistSlotIds.includes(slot.id);

      let freeSpots = slot.freeSpots;
      if (isUserBooked && freeSpots === 0) {
        freeSpots = 1;
      }

      return {
        ...slot,
        isUserBooked,
        userBooking,
        isWaitlisted,
        effectiveFreeSpots: isUserBooked ? Math.max(1, freeSpots) : freeSpots,
        isEffectivelyFull: !isUserBooked && slot.freeSpots === 0,
      };
    });
  }, [rawSlots, userBookedMap, selectedDateId, waitlistSlotIds]);

  // Filter if "Solo disponibles" is ON
  const displaySlots = useMemo(() => {
    if (!onlyAvailable) return computedSlots;
    return computedSlots.filter((s) => s.isUserBooked || s.effectiveFreeSpots > 0);
  }, [computedSlots, onlyAvailable]);

  const selectedDateObj = DAYS_WINDOW.find((d) => d.id === selectedDateId) || DAYS_WINDOW[0];
  const isFavorite = favoriteSedeId === currentSede.id;

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-24 space-y-4 animate-in fade-in duration-200">
      
      {/* 1. Minimalist Header: Sede Selector & My Bookings Pill */}
      <div className="flex items-center gap-2 pt-1">
        {/* Left: Sede Selector Pill */}
        <button
          onClick={onOpenSedeSelector}
          className="flex-1 min-w-0 flex items-center justify-between py-2 px-3 rounded-2xl bg-[#121215] hover:bg-[#18181C] border border-white/[0.08] hover:border-white/20 transition-all text-left group"
        >
          <div className="min-w-0 flex-1 pr-1">
            <div className="flex items-center gap-1.5">
              <Star className={`w-3.5 h-3.5 shrink-0 ${isFavorite ? 'text-amber-400 fill-amber-400' : 'text-zinc-500'}`} />
              <h2 className="text-xs font-bold text-white group-hover:text-[#FF4D24] transition-colors truncate tracking-wide">
                {currentSede.name}
              </h2>
            </div>
            <p className="text-[10px] text-zinc-400 truncate pl-5">
              {currentSede.address}
            </p>
          </div>
          <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white shrink-0">
            <ChevronDown className="w-3 h-3" />
          </div>
        </button>

        {/* Right: Pill Button "Reservas (5)" */}
        <button
          onClick={onOpenMyReservations}
          className="py-2.5 px-3 rounded-2xl bg-[#FF4D24]/10 hover:bg-[#FF4D24]/20 text-[#FF4D24] border border-[#FF4D24]/30 transition-all flex items-center gap-1.5 shrink-0 active:scale-95 shadow-sm whitespace-nowrap"
        >
          <CalendarDays className="w-3.5 h-3.5 stroke-[2.2]" />
          <span className="text-[10px] font-bold font-tabular tracking-wider uppercase">
            Reservas ({bookings.length})
          </span>
        </button>
      </div>

      {/* 2. 7-Day Window Strip */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
          <span>Próximos 7 días habilitados</span>
          <span className="text-[#FF4D24] font-semibold">Reserva directa</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {DAYS_WINDOW.map((day) => {
            const isSelected = selectedDateId === day.id;
            const hasBooking = bookedDatesSet.has(day.id);

            return (
              <button
                key={day.id}
                onClick={() => setSelectedDateId(day.id)}
                className={`w-[52px] h-[72px] shrink-0 rounded-2xl flex flex-col items-center justify-center p-1 transition-all duration-150 relative ${
                  isSelected
                    ? 'bg-[#FF4D24] text-white shadow-glow-core scale-[1.02]'
                    : 'bg-[#121215] hover:bg-[#18181C] text-zinc-300 border border-white/[0.06] hover:border-white/15'
                }`}
              >
                {/* Day name (e.g. LUN) */}
                <span
                  className={`text-[9px] font-bold tracking-wider uppercase ${
                    isSelected ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {day.dayName}
                </span>

                {/* Day Number (e.g. 23) */}
                <span
                  className={`text-base font-black font-tabular my-0.5 ${
                    isSelected ? 'text-white' : 'text-zinc-100'
                  }`}
                >
                  {day.dateNum}
                </span>

                {/* Booking Indicator Dot (Emerald #10B981) */}
                <div className="h-2 flex items-center justify-center">
                  {hasBooking ? (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected
                          ? 'bg-white shadow-sm'
                          : 'bg-emerald-400 shadow-[0_0_6px_#10B981]'
                      }`}
                      title="Clase agendada este día"
                    />
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-transparent" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Grid Control Bar: Total slots + "Solo disponibles" toggle */}
      <div className="flex items-center justify-between py-2.5 px-3 rounded-2xl bg-[#121215] border border-white/[0.06]">
        <div className="flex items-center gap-1.5 text-xs text-zinc-300">
          <Calendar className="w-3.5 h-3.5 text-[#FF4D24]" />
          <span className="font-bold text-white tracking-wide uppercase text-[11px]">
            {selectedDateObj.dayName} {selectedDateObj.dateNum}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-[11px] font-tabular text-zinc-400">
            {displaySlots.length} turnos
          </span>
        </div>

        {/* Solo disponibles Toggle Switch */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-[11px] font-medium text-zinc-400">
            Solo disponibles
          </span>
          <div
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`w-8 h-4.5 rounded-full p-0.5 transition-colors relative ${
              onlyAvailable ? 'bg-[#FF4D24]' : 'bg-zinc-700'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                onlyAvailable ? 'translate-x-3.5' : 'translate-x-0'
              }`}
            />
          </div>
        </label>
      </div>

      {/* 4. Redesigned Schedule Grid */}
      <div className="space-y-2.5">
        {displaySlots.map((slot) => {
          const isUserBooked = slot.isUserBooked;
          const isFull = slot.isEffectivelyFull;
          const isAvailable = !isUserBooked && !isFull;
          const isWaitlisted = slot.isWaitlisted;

          // Capacity calculation
          const capacityPercent = Math.min(
            100,
            Math.round(((slot.totalCapacity - slot.effectiveFreeSpots) / slot.totalCapacity) * 100)
          );

          return (
            <div
              key={slot.id}
              className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                isUserBooked
                  ? 'bg-emerald-500/[0.06] border-emerald-500/35 shadow-sm'
                  : isFull
                  ? 'bg-[#121215]/50 border-white/[0.03] opacity-65'
                  : 'bg-[#121215] hover:bg-[#18181C] border-white/[0.08] hover:border-white/20'
              }`}
            >
              {/* Left Column: Hour & Details */}
              <div className="min-w-[100px]">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black font-tabular tracking-tight text-white">
                    {slot.time}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-400">HS</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-medium truncate">
                  50 min • Calistenia
                </p>
                {slot.coach && (
                  <p className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                    <UserCheck className="w-2.5 h-2.5 text-zinc-400" />
                    <span className="truncate">{slot.coach}</span>
                  </p>
                )}
              </div>

              {/* Center Column: Capacity status & Micro visual capacity bar */}
              <div className="flex-1 px-1">
                {isUserBooked ? (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Lugar asegurado
                    </span>
                    <div className="w-full h-1 rounded-full bg-emerald-950/60 overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-full" />
                    </div>
                  </div>
                ) : isFull ? (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Sin cupo (12/12)
                    </span>
                    <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-zinc-600 rounded-full w-full" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] leading-none">
                      <span className="font-semibold text-emerald-400">
                        {slot.effectiveFreeSpots} libres
                      </span>
                      <span className="text-[10px] text-zinc-500 font-tabular">
                        {slot.totalCapacity - slot.effectiveFreeSpots}/{slot.totalCapacity}
                      </span>
                    </div>
                    {/* Visual capacity bar */}
                    <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500/80 rounded-full transition-all duration-300"
                        style={{ width: `${capacityPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: State CTAs */}
              <div className="shrink-0">
                {/* State 1: Booked by current user */}
                {isUserBooked && (
                  <button
                    onClick={() => onCancelBooking(slot.userBooking.id)}
                    className="py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-red-500/15 border border-emerald-500/30 hover:border-red-500/30 text-emerald-400 hover:text-red-400 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1 group/btn"
                    title="Tocar para cancelar reserva"
                  >
                    <span className="group-hover/btn:hidden flex items-center gap-1 text-[11px]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Reservada
                    </span>
                    <span className="hidden group-hover/btn:inline text-[11px]">
                      Cancelar
                    </span>
                  </button>
                )}

                {/* State 2: Available to book */}
                {isAvailable && (
                  <button
                    onClick={() =>
                      onInitiateBooking({
                        slot,
                        sede: currentSede,
                        dateObj: selectedDateObj,
                      })
                    }
                    className="py-2 px-3.5 rounded-xl bg-[#FF4D24] hover:bg-[#E53E17] text-white text-xs font-bold tracking-wider uppercase shadow-glow-core transition-all duration-150 active:scale-95"
                  >
                    <span>Reservar</span>
                  </button>
                )}

                {/* State 3: Full class (Waitlist button) */}
                {isFull && (
                  <button
                    onClick={() => onToggleWaitlist(slot.id, slot.time, currentSede.name)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1 text-[11px] ${
                      isWaitlisted
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 border border-white/10'
                    }`}
                  >
                    <Bell className={`w-3.5 h-3.5 ${isWaitlisted ? 'fill-amber-400' : ''}`} />
                    <span>{isWaitlisted ? 'En lista' : 'En espera'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {displaySlots.length === 0 && (
          <div className="py-12 text-center rounded-2xl bg-[#121215]/50 border border-white/5 space-y-2">
            <Info className="w-5 h-5 text-zinc-500 mx-auto" />
            <p className="text-xs font-medium text-zinc-400">
              No hay turnos con cupos libres para este día con el filtro activo.
            </p>
            <button
              onClick={() => setOnlyAvailable(false)}
              className="text-xs font-bold text-[#FF4D24] uppercase tracking-wider hover:underline"
            >
              Ver todos los turnos
            </button>
          </div>
        )}
      </div>

      {/* Helpful footnote */}
      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-[10px] text-zinc-400">
        <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        <span>
          Ventana de reserva de 7 días. Podés cancelar sin cargo hasta 1 hora antes de la clase.
        </span>
      </div>
    </div>
  );
}
