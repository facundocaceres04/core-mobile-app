import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Bookmark, Flame, Timer, ChevronRight, Check } from 'lucide-react';

export default function WorkoutPlayerModal({
  workout,
  isFavorite,
  onToggleFavorite,
  onClose,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(45);

  if (!workout) return null;

  const currentExercise = workout.exercises[currentExerciseIdx] || workout.exercises[0];

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (currentExerciseIdx < workout.exercises.length - 1) {
              setCurrentExerciseIdx((idx) => idx + 1);
              return 45;
            } else {
              setIsPlaying(false);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentExerciseIdx, workout.exercises.length]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentExerciseIdx(0);
    setSecondsRemaining(45);
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col justify-end animate-in fade-in duration-200">
      <div className="w-full h-full bg-[#09090B] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 pt-3 pb-3 flex items-center justify-between border-b border-white/[0.08] bg-[#121215] shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center px-2">
            <span className="text-[9px] font-bold tracking-[0.16em] uppercase text-[#FF4D24]">
              CORE ON-DEMAND
            </span>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate max-w-[200px]">
              {workout.title}
            </h4>
          </div>

          <button
            onClick={() => onToggleFavorite(workout.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isFavorite
                ? 'bg-[#FF4D24] text-white'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Video / Visual Simulated Screen */}
        <div className="relative h-56 bg-[#121215] border-b border-white/10 flex flex-col items-center justify-center px-6 overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Exercise Index Pill */}
          <div className="z-10 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-2">
            BLOQUE {currentExerciseIdx + 1} DE {workout.exercises.length}
          </div>

          {/* Current Exercise Name */}
          <h2 className="z-10 text-lg font-black text-white text-center uppercase tracking-wide max-w-xs">
            {currentExercise.name}
          </h2>

          <p className="z-10 text-xs text-zinc-400 mt-1 font-medium">
            Foco: <span className="text-zinc-200">{currentExercise.target}</span>
          </p>

          <p className="z-10 text-xs font-bold text-[#FF4D24] mt-0.5 font-tabular">
            {currentExercise.reps}
          </p>

          {/* Big Digital Countdown */}
          <div className="z-10 mt-3 flex items-center gap-2">
            <div className="text-3xl font-black font-tabular tracking-tight text-white px-4 py-1 rounded-xl bg-black/80 border border-white/10 shadow-inner">
              {formatTimer(secondsRemaining)}
            </div>
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="px-6 py-3.5 bg-[#121215] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Timer className="w-3.5 h-3.5 text-[#FF4D24]" />
            <span className="font-semibold text-white">{workout.duration}</span>
          </div>

          {/* Center Play/Pause CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 rounded-xl bg-[#FF4D24] hover:bg-[#E53E17] text-white flex items-center justify-center shadow-glow-core transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white stroke-[2.5]" />
              ) : (
                <Play className="w-4 h-4 fill-white stroke-[2.5] ml-0.5" />
              )}
            </button>

            <button
              onClick={() => {
                if (currentExerciseIdx < workout.exercises.length - 1) {
                  setCurrentExerciseIdx((idx) => idx + 1);
                  setSecondsRemaining(45);
                }
              }}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-tabular">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{workout.calories}</span>
          </div>
        </div>

        {/* Exercises Breakdown List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.14em] mb-2">
            Circuito Completo ({workout.exercises.length} bloques)
          </p>

          {workout.exercises.map((ex, idx) => {
            const isCurrent = currentExerciseIdx === idx;
            const isDone = idx < currentExerciseIdx;

            return (
              <div
                key={idx}
                onClick={() => {
                  setCurrentExerciseIdx(idx);
                  setSecondsRemaining(45);
                }}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-[#FF4D24]/10 border-[#FF4D24]/50 shadow-sm'
                    : isDone
                    ? 'bg-white/[0.02] border-white/5 opacity-65'
                    : 'bg-[#121215] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-[#FF4D24] text-white shadow-sm'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-bold truncate ${
                        isCurrent ? 'text-white' : 'text-zinc-300'
                      }`}
                    >
                      {ex.name}
                    </p>
                    <p className="text-[10px] text-zinc-400 truncate">{ex.target}</p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-zinc-400 font-tabular shrink-0">
                  {ex.reps}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
