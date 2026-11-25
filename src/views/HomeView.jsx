import React from 'react';
import { Calendar, Clock, MapPin, Navigation, ArrowRight, ChevronRight, Share2, Flame, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function HomeView({
  user,
  favoriteSede,
  bookings,
  onGoToBooking,
  onOpenMyReservations,
  onOpenDirections,
  onShareWeekPass,
}) {
  const nextClass = bookings.length > 0 ? bookings[0] : null;

  return (
    <div className="space-y-4 md:space-y-5">
      
      {/* Top Header with official CORE wordmark */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2 md:hidden">
            <span className="text-xl font-black tracking-[0.18em] text-white uppercase font-sans">
              CORE
            </span>
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-zinc-400">
              INDOOR
            </span>
          </div>
          <p className="text-xs md:text-xl md:font-bold font-medium text-zinc-300 mt-0.5 md:mt-0">
            Hola, <strong className="text-white font-semibold">{user.shortName}</strong>
          </p>
        </div>

        {/* Minimalist Membership Capsule */}
        <div className="flex shrink-0 items-center gap-1.5 py-1 px-2.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
            {user.status}
          </span>
        </div>
      </div>

      {/* Brand Statement Banner */}
      <div className="py-1 px-0.5">
        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#FF4D24]">
          DESAFÍA TU CUERPO, ENTRENA SIN PESAS
        </p>
      </div>

      {/* Hero Card — "Tu Próxima Clase" */}
      {nextClass ? (
        <div className="relative rounded-2xl bg-[#121215] border border-white/[0.09] p-4 sm:p-5 shadow-xl overflow-hidden">
          {/* Subtle brand glow in corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D24]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Label & Countdown */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#FF4D24]">
              PRÓXIMA CLASE
            </span>
            <span className="text-[10px] font-semibold tracking-wide text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-tabular">
              Empieza en 2h 30m
            </span>
          </div>

          {/* Date & Time Header */}
          <div className="mb-2">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-tabular break-words">
              {nextClass.dateFormatted?.includes('Hoy') ? 'HOY' : nextClass.dateFormatted} • {nextClass.timeLabel || `${nextClass.time} HS`}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5 font-medium">
              {nextClass.duration} • Coach: <span className="text-zinc-200">{nextClass.coach}</span>
            </p>
          </div>

          {/* Sede Location */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-300 py-2.5 border-y border-white/5 my-3">
            <MapPin className="w-3.5 h-3.5 text-[#FF4D24] shrink-0" />
            <span className="font-semibold text-white truncate max-w-[50%] shrink-0">{nextClass.sedeName}</span>
            <span className="text-zinc-600 shrink-0">•</span>
            <span className="text-zinc-400 truncate min-w-0">{nextClass.address}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onOpenDirections(nextClass)}
              className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors border border-white/10"
            >
              <Navigation className="w-3.5 h-3.5 text-[#FF4D24]" />
              <span>Cómo llegar</span>
            </button>

            <button
              onClick={onOpenMyReservations}
              className="min-h-[44px] py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white font-semibold text-xs tracking-wider uppercase transition-colors border border-white/5"
            >
              Gestionar
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#121215] border border-white/[0.08] p-5 text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 text-[#FF4D24] flex items-center justify-center mx-auto border border-white/5">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">No tenés clases agendadas hoy</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Asegurá tu lugar en {favoriteSede.name} para mantener tu disciplina semanal.
            </p>
          </div>
          <button
            onClick={() => onGoToBooking(favoriteSede)}
            className="w-full min-h-[44px] py-2.5 rounded-xl bg-[#FF4D24] hover:bg-[#E53E17] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <span>Reservar clase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Horizontal Carousel — "Tus Reservas de la Semana" */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400">
              Reservas de la Semana
            </h3>
            <span className="w-4 h-4 rounded-full bg-white/5 text-zinc-400 text-[10px] font-bold font-tabular flex items-center justify-center border border-white/5">
              {bookings.length}
            </span>
          </div>
          <button
            onClick={onOpenMyReservations}
            className="shrink-0 py-1 text-xs font-bold text-[#FF4D24] hover:text-[#E53E17] flex items-center gap-0.5 transition-colors tracking-wide"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {bookings.length > 0 ? (
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible">
            {bookings.map((item, idx) => (
              <div
                key={item.id}
                onClick={onOpenMyReservations}
                className="w-40 sm:w-44 md:w-auto shrink-0 snap-start p-3 rounded-2xl bg-[#121215] hover:bg-[#18181C] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                      Turno 0{idx + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-sm font-black text-white font-tabular leading-tight">
                    {item.timeLabel || `${item.time} HS`}
                  </p>
                  <p className="text-xs font-medium text-zinc-300 mt-0.5 truncate">
                    {item.dateFormatted}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="truncate">{item.sedeName}</span>
                  <ChevronRight className="w-3 h-3 shrink-0 text-zinc-600" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#121215]/50 border border-white/5 text-center text-xs text-zinc-500">
            No tenés reservas confirmadas para esta semana.
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
      {/* 1-Tap Quick Booking Shortcut Card */}
      <div
        onClick={() => onGoToBooking(favoriteSede)}
        className="p-3.5 rounded-2xl bg-[#121215] hover:bg-[#18181C] border border-white/[0.08] hover:border-[#FF4D24]/40 transition-all cursor-pointer flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 text-[#FF4D24] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-[#FF4D24] uppercase tracking-[0.14em]">
              Reserva Rápida
            </span>
            <h4 className="text-xs font-bold text-white group-hover:text-[#FF4D24] transition-colors truncate">
              {favoriteSede.name}
            </h4>
            <p className="text-[11px] text-zinc-400 truncate">
              {favoriteSede.address}
            </p>
          </div>
        </div>

        <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-[#FF4D24] text-zinc-400 group-hover:text-white flex items-center justify-center transition-all shrink-0">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Monthly Consistency Tracker Bar */}
      <div className="p-3.5 rounded-2xl bg-[#121215] border border-white/[0.08] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-white/5 text-zinc-300 flex items-center justify-center">
            <Flame className="w-4 h-4 text-[#FF4D24]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white">
              {user.completedThisMonth} clases completadas
            </p>
            <p className="text-[10px] text-zinc-400">
              Racha de {user.streakDays} días consecutivos
            </p>
          </div>
        </div>
        <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-zinc-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 font-tabular">
          {user.membership}
        </span>
      </div>
      </div>

      {/* CORE Week Pass Banner (Somoscore.fit community pass) */}
      <div className="rounded-2xl bg-[#121215] border border-white/[0.08] p-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#FF4D24]">
            CORE WEEK PASS
          </span>
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
            #CHALLENGEYOURSELF
          </span>
        </div>

        <h4 className="text-xs font-bold text-white">
          Compartí CORE con quien quieras
        </h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Invitá a una persona a entrenar gratis por 1 semana en cualquiera de nuestras sedes.
        </p>

        <button
          onClick={onShareWeekPass}
          className="mt-1 w-full min-h-[44px] py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors border border-white/10"
        >
          <Share2 className="w-3.5 h-3.5 text-[#FF4D24]" />
          <span>Compartir Pase por WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
