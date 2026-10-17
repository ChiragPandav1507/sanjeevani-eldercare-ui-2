'use client';

import React from 'react';
import { ArrowLeft, Droplets, Plus } from 'lucide-react';

interface WaterTrackerScreenProps {
  waterCount: number;
  setWaterCount: React.Dispatch<React.SetStateAction<number>>;
  onBack: () => void;
}

export function WaterTrackerScreen({
  waterCount,
  setWaterCount,
  onBack,
}: WaterTrackerScreenProps) {
  const handleAddGlass = () => {
    if (waterCount < 8) {
      setWaterCount((prev) => prev + 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 pb-10 select-none">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 shadow-xs sticky top-0 z-10">
        <button
          type="button"
          onClick={onBack}
          className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-base font-black text-slate-900 tracking-tight">Water Tracker</h1>
        <div className="size-9" />
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-6 space-y-6">
        <div className="rounded-3xl border border-blue-200 bg-blue-50/80 p-6 text-center shadow-sm space-y-3">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
            <Droplets className="size-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-blue-900">{waterCount} / 8 Glasses</h2>
            <p className="text-xs text-blue-700 font-medium mt-1">Aaj ka hydration goal track karein</p>
          </div>

          <button
            type="button"
            onClick={handleAddGlass}
            className="w-full mt-2 rounded-2xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="size-4" />
            <span>Ek Glass Paani Pee Liya (Log Glass)</span>
          </button>
        </div>
      </main>
    </div>
  );
}
