'use client';

import React, { useEffect, useState, useRef } from 'react';
import { AlertTriangle, ShieldCheck, PhoneCall, Volume2 } from 'lucide-react';

interface FallDetectionModalProps {
  isOpen: boolean;
  onCancel: () => void;
  emergencyContact?: string;
}

export function FallDetectionModal({
  isOpen,
  onCancel,
  emergencyContact = '919876543210',
}: FallDetectionModalProps) {
  const [countdown, setCountdown] = useState(15);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sirenIntervalRef = useRef<any>(null);

  // High-pitch Emergency Siren Sound via Web Audio API
  const playSirenBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCountdown(15);
      if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    // Voice announcement
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        'Chetavani! Phone achanak girne ka sanket mila hai. Kya aap theek hain?'
      );
      utterance.lang = 'hi-IN';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }

    // Siren loop
    playSirenBeep();
    sirenIntervalRef.current = setInterval(playSirenBeep, 800);

    // 15 second countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerEmergencyDispatch();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
    };
  }, [isOpen]);

  const triggerEmergencyDispatch = () => {
    if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
    const msg = encodeURIComponent(
      '🚨 CRITICAL EMERGENCY ALERT: Sanjeevani detected a sudden hard fall/impact for your elder family member! Please call or check immediately. Location: https://maps.google.com/?q=28.6139,77.2090'
    );
    window.open(`https://wa.me/${emergencyContact}?text=${msg}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-4 border-red-600 text-center space-y-4">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-red-100 text-red-600 animate-bounce ring-8 ring-red-50">
          <AlertTriangle className="size-10" />
        </div>

        <div>
          <span className="rounded-full bg-red-100 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-red-700">
            Fall / Sudden Impact Detected
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">Kya Aap Theek Hain?</h2>
          <p className="text-xs text-slate-600 mt-1">
            Agar aapne button nahi dabaya, toh <b>{countdown} seconds</b> me parivaar ko WhatsApp par emergency alert bhej diya jayega.
          </p>
        </div>

        {/* Big Countdown Badge */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-red-600 text-white text-2xl font-black shadow-lg">
          {countdown}s
        </div>

        <div className="space-y-2 pt-2">
          {/* Safe Button */}
          <button
            type="button"
            onClick={onCancel}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-sm font-black text-white shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
          >
            <ShieldCheck className="size-5" />
            Main Theek Hoon (Cancel Alert)
          </button>

          {/* Instant SOS Dispatch Button */}
          <button
            type="button"
            onClick={triggerEmergencyDispatch}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-200 py-3 text-xs font-bold text-red-700 hover:bg-red-50 active:scale-95 transition-all"
          >
            <PhoneCall className="size-4" />
            Abhi Turant Parivaar Ko Alert Bhejo
          </button>
        </div>
      </div>
    </div>
  );
}