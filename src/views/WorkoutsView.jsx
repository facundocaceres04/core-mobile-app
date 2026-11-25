import React, { useState, useMemo } from 'react';
import { Search, Bookmark, Play, Clock, Flame, Dumbbell } from 'lucide-react';
import { WORKOUT_CATEGORIES, WORKOUTS } from '../data/mockData';

export default function WorkoutsView({
  favoriteWorkoutIds,
  onToggleFavorite,
  onOpenPlayer,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredWorkouts = useMemo(() => {
    return WORKOUTS.filter((w) => {
      let matchCat = true;
      if (selectedCategory === 'favorites') {
        matchCat = favoriteWorkoutIds.includes(w.id);
      } else if (selectedCategory !== 'all') {
        matchCat = w.category === selectedCategory;
      }

      const matchSearch =
        w.title.toLowerCase().includes(search.toLowerCase()) ||
        w.description.toLowerCase().includes(search.toLowerCase()) ||
        w.subtitle.toLowerCase().includes(search.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [selectedCategory, search, favoriteWorkoutIds]);

  return (
    <div className="space-y-4 md:space-y-5">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D24]" />
            <span className="text-[10px] font-bold tracking-[0.16em] text-[#FF4D24] uppercase">
              ENTRENAMIENTOS ON-DEMAND
            </span>
          </div>
          <h2 className="text-lg font-black text-white tracking-wide uppercase mt-0.5">
            CORE Workouts
          </h2>
        </div>

        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 font-tabular">
          {filteredWorkouts.length} rutinas
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar rutinas, músculos..."
          className="w-full bg-[#121215] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF4D24] transition-colors"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
        {WORKOUT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 py-2 px-3.5 rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#FF4D24] text-white shadow-glow-core'
                  : 'bg-[#121215] hover:bg-[#18181C] text-zinc-400 hover:text-zinc-200 border border-white/5'
              }`}
            >
              {cat.id === 'favorites' && <Bookmark className="w-3 h-3 fill-current" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Routine Cards Grid */}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {filteredWorkouts.map((w) => {
          const isFav = favoriteWorkoutIds.includes(w.id);

          return (
            <div
              key={w.id}
              onClick={() => onOpenPlayer(w)}
              className="min-w-0 flex flex-col rounded-2xl bg-[#121215] hover:bg-[#18181C] border border-white/[0.08] hover:border-white/20 transition-all overflow-hidden cursor-pointer group shadow-lg"
            >
              {/* Card Thumbnail / Header */}
              <div
                className={`h-28 bg-gradient-to-br ${w.thumbnailGradient} p-4 flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

                {/* Top row: Level Badge & Bookmark button */}
                <div className="flex items-center justify-between z-10">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded border ${w.levelColor}`}
                  >
                    {w.level}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(w.id);
                    }}
                    aria-label={isFav ? 'Quitar de guardados' : 'Guardar rutina'}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                      isFav
                        ? 'bg-[#FF4D24] text-white'
                        : 'bg-black/40 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Bottom row in thumbnail: Title & Play CTA */}
                <div className="flex items-end justify-between gap-3 z-10">
                  <div className="min-w-0">
                    <span className="block truncate text-[9px] font-bold text-[#FF4D24] uppercase tracking-wider">
                      {w.subtitle}
                    </span>
                    <h3 className="text-sm font-black text-white tracking-wide uppercase leading-tight group-hover:text-[#FF4D24] transition-colors">
                      {w.title}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-[#FF4D24] text-white flex items-center justify-center shadow-glow-core group-hover:scale-105 transition-transform shrink-0">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body details */}
              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {w.description}
                </p>

                {/* Stats metadata */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px] text-zinc-400 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#FF4D24]" />
                    <span className="font-semibold text-zinc-200">{w.duration}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span>{w.calories}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Dumbbell className="w-3 h-3 text-zinc-400" />
                    <span>{w.exercisesCount} bloques</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredWorkouts.length === 0 && (
          <div className="sm:col-span-2 py-16 px-4 text-center rounded-2xl bg-[#121215]/50 border border-white/5 space-y-2">
            <Dumbbell className="w-6 h-6 text-zinc-600 mx-auto" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">No se encontraron rutinas</h4>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              {selectedCategory === 'favorites'
                ? 'Marcá cualquier rutina para tenerla guardada en tu lista rápida.'
                : 'Seleccioná otra categoría o ajustá los términos de búsqueda.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
