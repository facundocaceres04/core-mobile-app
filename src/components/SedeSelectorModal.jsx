import React, { useState, useMemo } from 'react';
import { X, Search, Star, MapPin, Check, Building2 } from 'lucide-react';
import { SEDES } from '../data/mockData';

export default function SedeSelectorModal({
  currentSede,
  favoriteSedeId,
  onSelectSede,
  onSetFavoriteSede,
  onClose,
}) {
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('ALL');

  const countries = [
    { id: 'ALL', label: 'Todas' },
    { id: 'Argentina', label: 'Argentina' },
    { id: 'España', label: 'España' },
    { id: 'Uruguay', label: 'Uruguay' },
  ];

  const filteredSedes = useMemo(() => {
    return SEDES.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase()) ||
        s.zone.toLowerCase().includes(search.toLowerCase());
      const matchCountry = countryFilter === 'ALL' || s.country === countryFilter;
      return matchSearch && matchCountry;
    });
  }, [search, countryFilter]);

  const favoriteSede = useMemo(() => {
    return SEDES.find((s) => s.id === favoriteSedeId) || SEDES[0];
  }, [favoriteSedeId]);

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end animate-in fade-in duration-200">
      {/* Tap backdrop to close */}
      <div className="flex-1 w-full" onClick={onClose} />

      {/* Modal Surface */}
      <div className="w-full bg-[#18181C] border-t border-white/10 rounded-t-[32px] p-5 pb-8 shadow-2xl h-[88%] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Top Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] shrink-0">
          <div>
            <h3 className="text-sm font-bold text-white tracking-[0.14em] uppercase flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#FF4D24]" />
              <span>SEDES CORE</span>
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">+40 centros habilitados con tu pase</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-3 relative shrink-0">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por sede, barrio o calle..."
            className="w-full bg-[#121215] border border-white/10 rounded-xl py-2.5 pl-10 pr-9 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF4D24] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Country Filter Pills */}
        <div className="flex items-center gap-1.5 mt-2.5 pb-2 overflow-x-auto no-scrollbar shrink-0">
          {countries.map((c) => {
            const isSelected = countryFilter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCountryFilter(c.id)}
                className={`py-1 px-3 rounded-full text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#FF4D24] text-white shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 border border-white/5'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Current Favorite Sede Highlight Card */}
        {favoriteSede && !search && countryFilter === 'ALL' && (
          <div className="mt-2 p-3 rounded-2xl bg-[#121215] border border-[#FF4D24]/30 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-[#FF4D24] uppercase tracking-[0.14em] flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-[#FF4D24]" /> SEDE PREDETERMINADA
              </span>
              {currentSede.id === favoriteSede.id && (
                <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Seleccionada
                </span>
              )}
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <div>
                <p className="text-sm font-bold text-white tracking-wide">{favoriteSede.name}</p>
                <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {favoriteSede.address}
                </p>
              </div>
              <button
                onClick={() => {
                  onSelectSede(favoriteSede);
                  onClose();
                }}
                className="py-1.5 px-3 rounded-xl bg-[#FF4D24] text-white text-[11px] font-bold tracking-wider uppercase hover:bg-[#E53E17] transition-colors"
              >
                Ver clases
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Sedes List */}
        <div className="flex-1 overflow-y-auto no-scrollbar mt-3 space-y-2 pr-0.5">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.14em] px-1">
            {filteredSedes.length} {filteredSedes.length === 1 ? 'Sede encontrada' : 'Sedes disponibles'}
          </p>

          {filteredSedes.map((sede) => {
            const isSelected = currentSede.id === sede.id;
            const isFav = favoriteSedeId === sede.id;

            return (
              <div
                key={sede.id}
                className={`p-3 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-2 group ${
                  isSelected
                    ? 'bg-[#121215] border-[#FF4D24]/50 shadow-sm'
                    : 'bg-[#121215]/70 hover:bg-[#121215] border-white/[0.06] hover:border-white/15'
                }`}
              >
                <div
                  className="flex-1 min-w-0 cursor-pointer pr-1"
                  onClick={() => {
                    onSelectSede(sede);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-bold text-white group-hover:text-[#FF4D24] transition-colors truncate">
                      {sede.name}
                    </p>
                    <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5 shrink-0">
                      {sede.country}
                    </span>
                    {isFav && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-0.5 bg-amber-400/10 px-1.5 py-0.5 rounded-full shrink-0">
                        <Star className="w-2.5 h-2.5 fill-amber-400" /> Favorita
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                    <span className="truncate">{sede.address}</span>
                  </p>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    title={isFav ? "Es tu sede predeterminada" : "Fijar como sede predeterminada"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSetFavoriteSede(sede);
                    }}
                    className={`p-1.5 rounded-xl transition-all ${
                      isFav
                        ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
                        : 'text-zinc-500 hover:text-amber-400 hover:bg-white/5'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => {
                      onSelectSede(sede);
                      onClose();
                    }}
                    className={`py-1.5 px-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all shrink-0 ${
                      isSelected
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 hover:bg-[#FF4D24] text-zinc-300 hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> Activa
                      </span>
                    ) : (
                      'Elegir'
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredSedes.length === 0 && (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No se encontraron sedes para "{search}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
