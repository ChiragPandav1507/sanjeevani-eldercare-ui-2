'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  HeartPulse,
  Check,
  Save,
} from 'lucide-react';

interface DailyWellbeingScreenProps {
  onBack: () => void;
  language: string;
}

const MOODS = [
  {
    id: 'happy',
    labelEn: 'Good',
    labelHi: 'अच्छा',
    icon: '😊',
    color: 'bg-emerald-100 border-emerald-500 text-emerald-800',
  },
  {
    id: 'okay',
    labelEn: 'Okay',
    labelHi: 'ठीक',
    icon: '😐',
    color: 'bg-amber-100 border-amber-500 text-amber-800',
  },
  {
    id: 'sad',
    labelEn: 'Tired / Low',
    labelHi: 'थका / उदास',
    icon: '😔',
    color: 'bg-rose-100 border-rose-500 text-rose-800',
  },
];

export function DailyWellbeingScreen({
  onBack,
  language,
}: DailyWellbeingScreenProps) {
  const isEn = language === 'en';

  const [selectedMood, setSelectedMood] = useState('happy');
  const [sleepHours, setSleepHours] = useState(7);
  const [walkMinutes, setWalkMinutes] = useState(20);
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800 pb-12 select-none">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          aria-label={isEn ? 'Go back' : 'वापस जाएँ'}
          className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h2 className="text-sm font-bold text-slate-900">
          {isEn ? 'Daily Wellbeing' : 'दैनिक स्वास्थ्य'}
        </h2>
        <div className="w-10" />
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <HeartPulse className="size-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900">
              {isEn
                ? 'How are you feeling today?'
                : 'आज आप कैसा महसूस कर रहे हैं?'}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                type="button"
                onClick={() => setSelectedMood(mood.id)}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 p-3 text-center transition-all ${
                  selectedMood === mood.id
                    ? `${mood.color} shadow-sm font-black`
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span className="text-3xl">{mood.icon}</span>
                <span className="text-[11px] font-bold">
                  {isEn ? mood.labelEn : mood.labelHi}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500">
              {isEn ? 'Sleep Last Night' : 'पिछली रात की नींद'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">
                {sleepHours}
              </span>
              <span className="text-xs text-slate-600">
                {isEn ? 'Hours' : 'घंटे'}
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSleepHours((p) => Math.max(1, p - 1))}
                aria-label={isEn ? 'Decrease sleep hours' : 'नींद के घंटे घटाएँ'}
                className="size-7 rounded-lg bg-slate-100 text-xs font-bold text-slate-700"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setSleepHours((p) => Math.min(14, p + 1))}
                aria-label={isEn ? 'Increase sleep hours' : 'नींद के घंटे बढ़ाएँ'}
                className="size-7 rounded-lg bg-emerald-600 text-xs font-bold text-white"
              >
                +
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500">
              {isEn ? 'Light Walk / Yoga' : 'हल्की सैर / योग'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">
                {walkMinutes}
              </span>
              <span className="text-xs text-slate-600">
                {isEn ? 'Mins' : 'मिनट'}
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setWalkMinutes((p) => Math.max(0, p - 5))}
                aria-label={isEn ? 'Decrease walking time' : 'सैर का समय घटाएँ'}
                className="size-7 rounded-lg bg-slate-100 text-xs font-bold text-slate-700"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setWalkMinutes((p) => p + 5)}
                aria-label={isEn ? 'Increase walking time' : 'सैर का समय बढ़ाएँ'}
                className="size-7 rounded-lg bg-emerald-600 text-xs font-bold text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs"
        >
          <h3 className="text-xs font-bold text-slate-900">
            {isEn
              ? 'Add Doctor / Daily Health Notes'
              : 'डॉक्टर / दैनिक स्वास्थ्य नोट जोड़ें'}
          </h3>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              isEn
                ? 'e.g. Mild headache after lunch, blood pressure checked normal 120/80...'
                : 'जैसे: दोपहर के भोजन के बाद हल्का सिरदर्द, रक्तचाप सामान्य 120/80...'
            }
            className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-xs font-black text-white shadow-md hover:bg-emerald-800 active:scale-98 transition-all"
          >
            {isSaved ? <Check className="size-4" /> : <Save className="size-4" />}
            {isSaved
              ? isEn
                ? 'Wellbeing Logged!'
                : 'स्वास्थ्य दर्ज हो गया!'
              : isEn
                ? "Save Today's Entry"
                : 'आज की जानकारी सहेजें'}
          </button>
        </form>
      </main>
    </div>
  );
}
