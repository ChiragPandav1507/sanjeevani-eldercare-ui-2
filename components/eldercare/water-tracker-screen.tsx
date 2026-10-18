'use client';

import React, { useEffect } from 'react';
import { ArrowLeft, Droplets, Plus, Minus, Bell } from 'lucide-react';
import { getStoredWater, setStoredWater } from './state-store';

interface WaterTrackerScreenProps {
  onBack: () => void;
  waterCount: number;
  setWaterCount: React.Dispatch<React.SetStateAction<number>>;
  language: string;
}

export function WaterTrackerScreen({
  onBack,
  waterCount,
  setWaterCount,
  language,
}: WaterTrackerScreenProps) {
  const totalGoal = 8;
  const isEn = language === 'en';

  useEffect(() => {
    const storedCount = getStoredWater();
    setWaterCount(storedCount);
  }, [setWaterCount]);

  const glasses = waterCount;
  const progressPercent = Math.min(
    Math.round((glasses / totalGoal) * 100),
    100
  );

  const addGlass = () => {
    setWaterCount((prev) => {
      const next = prev < 15 ? prev + 1 : prev;
      setStoredWater(next);
      return next;
    });
  };

  const removeGlass = () => {
    setWaterCount((prev) => {
      const next = prev > 0 ? prev - 1 : prev;
      setStoredWater(next);
      return next;
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800 pb-12 select-none">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          aria-label={isEn ? 'Go back' : 'वापस जाएँ'}
        >
          <ArrowLeft className="size-5" />
        </button>
        <h2 className="text-sm font-bold text-slate-900">
          {isEn ? 'Water Tracker' : 'पानी ट्रैकर'}
        </h2>
        <div className="w-10" />
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 space-y-4">
        <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-500 to-cyan-600 p-6 text-white shadow-lg text-center space-y-3">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs">
            <Droplets className="size-8 text-white fill-current" />
          </div>
          <div>
            <h3 className="text-3xl font-black">
              {glasses} / {totalGoal} {isEn ? 'Glasses' : 'गिलास'}
            </h3>
            <p className="text-xs text-blue-100 mt-0.5">
              {isEn ? 'Daily Hydration Goal' : 'दैनिक पानी पीने का लक्ष्य'}
            </p>
          </div>

          <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] font-bold text-cyan-100">
            {progressPercent}% {isEn ? 'Completed' : 'पूरा हुआ'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <button
            type="button"
            onClick={removeGlass}
            disabled={glasses === 0}
            aria-label={isEn ? 'Remove one glass' : 'एक गिलास कम करें'}
            className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 active:scale-95 transition-all"
          >
            <Minus className="size-6" />
          </button>

          <div className="text-center">
            <span className="text-2xl font-black text-slate-900">
              {glasses * 250} ml
            </span>
            <p className="text-[11px] text-slate-400">
              {isEn ? 'Total Drank Today' : 'आज कुल पिया'}
            </p>
          </div>

          <button
            type="button"
            onClick={addGlass}
            aria-label={isEn ? 'Add one glass' : 'एक गिलास जोड़ें'}
            className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Plus className="size-6" />
          </button>
        </div>

        <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 flex items-start gap-3">
          <Bell className="size-5 text-cyan-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-cyan-950">
              {isEn ? 'Next Reminder: 3:00 PM' : 'अगली याद दिलाने का समय: 3:00 PM'}
            </h4>
            <p className="text-[11px] text-cyan-800/80 mt-0.5 leading-relaxed">
              {isEn
                ? 'Drink 1 full glass of warm or normal water after your afternoon rest.'
                : 'दोपहर के आराम के बाद एक पूरा गिलास गर्म या सामान्य पानी पिएँ।'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
          <h4 className="text-xs font-bold text-slate-800">
            {isEn
              ? "Today's Log (Glass Breakdown)"
              : 'आज का रिकॉर्ड (गिलास का विवरण)'}
          </h4>
          <div className="grid grid-cols-4 gap-2 pt-1">
            {Array.from({ length: totalGoal }).map((_, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center rounded-xl p-3 border transition-colors ${
                  idx < glasses
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-slate-100 bg-slate-50 text-slate-300'
                }`}
              >
                <Droplets className="size-5 fill-current" />
                <span className="text-[10px] font-bold mt-1">
                  {isEn ? `G ${idx + 1}` : `गिलास ${idx + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
