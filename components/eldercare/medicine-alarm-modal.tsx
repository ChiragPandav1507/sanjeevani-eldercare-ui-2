'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Pill, CheckCircle, Clock } from 'lucide-react';
import { useTalkBack } from './talkback-provider';

interface MedicineAlarmModalProps {
  medicineName?: string;
  dosage?: string;
  onTake: () => void;
  onSnooze: () => void;
}

export function MedicineAlarmModal({
  medicineName = 'Paracetamol 500 mg',
  dosage = '1 tablet (After Food)',
  onTake,
  onSnooze,
}: MedicineAlarmModalProps) {
  const { speak } = useTalkBack();
  const [isPlaying, setIsPlaying] = useState(true);

  // Web Audio API se simple chime alarm sound generate karna bina external mp3 file ke
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let intervalId: any = null;

    const playBeep = () => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5 note

        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch {
        // Fallback agar browser audio policy block kare
      }
    };

    // 2 baar initial chime
    playBeep();
    setTimeout(playBeep, 400);

    // Hindi voice announcement
    const speakReminder = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(
          `Dhyaan dijiye! Dawaai lene ka samay ho gaya hai. Kripya ${medicineName} lijiye.`
        );
        u.lang = 'hi-IN';
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
      }
    };

    const timer = setTimeout(speakReminder, 700);

    return () => {
      clearTimeout(timer);
      if (intervalId) clearInterval(intervalId);
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, [medicineName]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-2 border-emerald-500 text-center space-y-4 animate-in fade-in zoom-in duration-200">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-pulse ring-8 ring-emerald-50">
          <Bell className="size-8" />
        </div>

        <div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-800">
            Medicine Reminder
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-2">{medicineName}</h3>
          <p className="text-xs text-slate-600 mt-0.5">{dosage}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-emerald-600" />
            <span>Scheduled Time</span>
          </div>
          <span className="font-bold text-slate-900">Right Now</span>
        </div>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onTake}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3.5 text-xs font-black text-white shadow-md hover:bg-emerald-800 active:scale-98 transition-all"
          >
            <CheckCircle className="size-4" />
            I Have Taken This Medicine
          </button>

          <button
            type="button"
            onClick={onSnooze}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-98 transition-all"
          >
            Snooze (Remind in 10 mins)
          </button>
        </div>
      </div>
    </div>
  );
}