import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Flame,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Phone,
  HelpCircle,
  Check,
  CreditCard,
  QrCode,
} from 'lucide-react';

export default function AccountView({
  user,
  favoriteSede,
  bookingsCount,
  onOpenSedeSelector,
  onOpenMyReservations,
}) {
  const [showRules, setShowRules] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-24 space-y-4 animate-in fade-in duration-200">
      
      {/* Member Digital Credential Card */}
      <div className="relative rounded-2xl bg-[#121215] border border-white/[0.09] p-4 shadow-xl overflow-hidden space-y-3.5">
        
        {/* Top row: Brand & Member ID */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black tracking-[0.18em] text-white uppercase font-sans">
              CORE
            </span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">
              PASAPORTE INDOOR
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            {user.memberId}
          </span>
        </div>

        {/* Member Name & Status */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-white tracking-wide uppercase">
              {user.name}
            </h2>
            <p className="text-xs text-zinc-400">{user.email}</p>
          </div>

          <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
              {user.status}
            </span>
          </div>
        </div>

        {/* Membership Details Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              Plan Activo
            </span>
            <p className="text-xs font-bold text-white mt-0.5">{user.membership}</p>
            <p className="text-[10px] text-zinc-400">{user.membershipPlan}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              Vigencia / Renovación
            </span>
            <p className="text-xs font-bold text-white mt-0.5 font-tabular">{user.validUntil}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <Check className="w-2.5 h-2.5 stroke-[3]" /> Pagos al día
            </p>
          </div>
        </div>
      </div>

      {/* Sede Predeterminada Card */}
      <div className="p-4 rounded-2xl bg-[#121215] border border-white/[0.08] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
              Sede Predeterminada
            </h3>
          </div>
          <button
            onClick={onOpenSedeSelector}
            className="text-[11px] font-bold text-[#FF4D24] uppercase tracking-wider hover:text-[#E53E17] flex items-center gap-1 transition-colors"
          >
            <span>Cambiar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          onClick={onOpenSedeSelector}
          className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 cursor-pointer transition-colors flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-bold text-white tracking-wide">{favoriteSede.name}</p>
            <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-zinc-500" />
              {favoriteSede.address}
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md">
            {favoriteSede.country}
          </span>
        </div>
      </div>

      {/* Monthly Attendance Stats */}
      <div className="p-4 rounded-2xl bg-[#121215] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
            Registro Mensual
          </h3>
          <span className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-tabular">
            Noviembre 2026
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <span className="text-xl font-black text-white font-tabular">
              {user.completedThisMonth}
            </span>
            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mt-0.5">Clases hechas</p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <span className="text-xl font-black text-emerald-400 font-tabular">
              {bookingsCount}
            </span>
            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mt-0.5">Reservadas</p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <span className="text-xl font-black text-[#FF4D24] font-tabular">
              {user.streakDays}d
            </span>
            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mt-0.5">Racha actual</p>
          </div>
        </div>

        <button
          onClick={onOpenMyReservations}
          className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white flex items-center justify-between transition-colors border border-white/5"
        >
          <span>Ver reservas activas ({bookingsCount})</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </div>

      {/* Accordion: Reglas de Reserva & Convivencia */}
      <div className="rounded-2xl bg-[#121215] border border-white/[0.08] overflow-hidden">
        <button
          onClick={() => setShowRules(!showRules)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#FF4D24]" />
            <span className="text-xs font-bold text-white tracking-wider uppercase">
              Condiciones de Reserva y Cancelación
            </span>
          </div>
          {showRules ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
        </button>

        {showRules && (
          <div className="p-4 pt-0 text-xs text-zinc-400 space-y-2 border-t border-white/5 bg-black/20 leading-relaxed animate-in fade-in duration-200">
            <p>
              • <strong>Ventana de 7 días:</strong> Podés asegurar tus clases con hasta una semana de antelación en cualquiera de los centros de la red.
            </p>
            <p>
              • <strong>Cancelación anticipada:</strong> Hasta 1 hora antes de que inicie la clase para no perder tu turno y habilitar el cupo.
            </p>
            <p>
              • <strong>Cancelación dentro de la última hora:</strong> Liberás el lugar a la lista de espera, pero computará como clase utilizada.
            </p>
            <p>
              • <strong>Pausa de 48 horas:</strong> Dos ausencias consecutivas sin aviso aplican una pausa preventiva de reservas para respetar los cupos del grupo.
            </p>
          </div>
        )}
      </div>

      {/* Accordion: Ayuda y Contacto */}
      <div className="rounded-2xl bg-[#121215] border border-white/[0.08] overflow-hidden">
        <button
          onClick={() => setShowFaq(!showFaq)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-bold text-white tracking-wider uppercase">
              Atención y Soporte Sede
            </span>
          </div>
          {showFaq ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
        </button>

        {showFaq && (
          <div className="p-4 pt-0 text-xs text-zinc-400 space-y-3 border-t border-white/5 bg-black/20 animate-in fade-in duration-200">
            <p>Por consultas sobre tu plan o pausas temporales, comunicate directamente con el equipo de tu sede:</p>
            <a
              href="https://wa.me/5491158210000"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors border border-emerald-500/25"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp de {favoriteSede.name}</span>
            </a>
          </div>
        )}
      </div>

      {/* App Version & Credits */}
      <div className="text-center pt-2 space-y-1">
        <p className="text-[10px] font-bold text-zinc-400 tracking-[0.16em] uppercase">
          CORE STUDIO APP • v9.8.0 NATIVE
        </p>
        <p className="text-[10px] text-zinc-400">
          Entrenamiento con peso corporal • somoscore.fit
        </p>
      </div>
    </div>
  );
}
