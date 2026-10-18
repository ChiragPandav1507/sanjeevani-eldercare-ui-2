'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Camera,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';

interface PrescriptionScannerScreenProps {
  onBack: () => void;
  onScanComplete: (mode: 'prescription' | 'strip_expiry') => void;
  language: string;
}

type GuidanceStep =
  | 'LOOKING'
  | 'MOVE_RIGHT'
  | 'MOVE_CLOSER'
  | 'HOLD_STEADY'
  | 'CAPTURED';

export function PrescriptionScannerScreen({
  onBack,
  onScanComplete,
  language,
}: PrescriptionScannerScreenProps) {
  const isEn = language === 'en';

  const [scanMode, setScanMode] = useState<
    'strip_expiry' | 'prescription'
  >('strip_expiry');
  const [guidanceStep, setGuidanceStep] =
    useState<GuidanceStep>('LOOKING');
  const [guidanceText, setGuidanceText] = useState(
    isEn
      ? 'Position the camera in front of the medicine.'
      : 'कैमरा दवा के सामने रखें।'
  );
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const speakGuide = (text: string) => {
    if (
      !voiceEnabled ||
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    ) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isEn ? 'en-US' : 'hi-IN';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        // Desktop / mock fallback.
      }
    }

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (
        typeof window !== 'undefined' &&
        'speechSynthesis' in window
      ) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const sequence = isEn
      ? [
          {
            step: 'LOOKING' as GuidanceStep,
            text: 'Searching for the medicine strip...',
            voice: 'Place the medicine in front of the camera.',
            delay: 1500,
          },
          {
            step: 'MOVE_RIGHT' as GuidanceStep,
            text: 'Move the camera slightly to the right.',
            voice: 'The medicine is slightly to the left. Move the camera a little to the right.',
            delay: 3500,
          },
          {
            step: 'MOVE_CLOSER' as GuidanceStep,
            text: 'Hold steady and move a little closer.',
            voice: 'The text is a little far away. Move the camera slightly closer.',
            delay: 3500,
          },
          {
            step: 'HOLD_STEADY' as GuidanceStep,
            text: 'Perfect alignment! Hold steady; scanning automatically...',
            voice: 'Perfect alignment. Hold still; scanning is in progress.',
            delay: 2500,
          },
        ]
      : [
          {
            step: 'LOOKING' as GuidanceStep,
            text: 'दवा की स्ट्रिप खोजी जा रही है...',
            voice: 'दवा को कैमरे के सामने रखें।',
            delay: 1500,
          },
          {
            step: 'MOVE_RIGHT' as GuidanceStep,
            text: 'कैमरे को थोड़ा दाईं ओर करें।',
            voice: 'दवा थोड़ी बाईं ओर है। कैमरे को थोड़ा दाईं ओर करें।',
            delay: 3500,
          },
          {
            step: 'MOVE_CLOSER' as GuidanceStep,
            text: 'स्थिर रखें और कैमरे को थोड़ा पास लाएँ।',
            voice: 'लिखावट थोड़ी दूर है। कैमरे को हल्का सा आगे लाएँ।',
            delay: 3500,
          },
          {
            step: 'HOLD_STEADY' as GuidanceStep,
            text: 'सही स्थिति! स्थिर रखें, अपने आप स्कैन हो रहा है...',
            voice: 'सही स्थिति। बिल्कुल न हिलें, स्कैन हो रहा है।',
            delay: 2500,
          },
        ];

    let currentIdx = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const runGuidance = () => {
      if (currentIdx < sequence.length) {
        const current = sequence[currentIdx];
        setGuidanceStep(current.step);
        setGuidanceText(current.text);
        speakGuide(current.voice);

        timer = setTimeout(() => {
          currentIdx += 1;
          runGuidance();
        }, current.delay);
      } else {
        setCountdown(3);
      }
    };

    runGuidance();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [scanMode, voiceEnabled, language]);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0) {
      setGuidanceStep('CAPTURED');
      speakGuide(
        isEn
          ? 'Scan successful. Opening the results screen.'
          : 'स्कैन सफल रहा। परिणाम स्क्रीन खोली जा रही है।'
      );
      setTimeout(() => {
        onScanComplete(scanMode);
      }, 800);
    }
  }, [countdown]);

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-950 text-white select-none">
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between p-4 bg-linear-to-b from-black/80 to-transparent">
        <button
          type="button"
          onClick={onBack}
          aria-label={isEn ? 'Go back' : 'वापस जाएँ'}
          className="rounded-full bg-white/20 p-2.5 backdrop-blur-md active:scale-95 transition-all text-white"
        >
          <ArrowLeft className="size-5" />
        </button>

        <div className="flex rounded-full bg-black/50 p-1 border border-white/20 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setScanMode('strip_expiry')}
            className={`rounded-full px-3 py-1 text-xs font-black transition-all ${
              scanMode === 'strip_expiry'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? 'Strip & Expiry' : 'स्ट्रिप और एक्सपायरी'}
          </button>
          <button
            type="button"
            onClick={() => setScanMode('prescription')}
            className={`rounded-full px-3 py-1 text-xs font-black transition-all ${
              scanMode === 'prescription'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? 'Prescription' : 'डॉक्टर का पर्चा'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            if (
              voiceEnabled &&
              typeof window !== 'undefined' &&
              'speechSynthesis' in window
            ) {
              window.speechSynthesis.cancel();
            }
            setVoiceEnabled(!voiceEnabled);
          }}
          className={`rounded-full p-2.5 backdrop-blur-md transition-all active:scale-95 ${
            voiceEnabled
              ? 'bg-emerald-600 text-white'
              : 'bg-white/20 text-slate-300'
          }`}
          title={isEn ? 'Toggle Voice Guidance' : 'आवाज़ संबंधी निर्देश चालू/बंद करें'}
          aria-label={isEn ? 'Toggle voice guidance' : 'आवाज़ संबंधी निर्देश बदलें'}
        >
          {voiceEnabled ? (
            <Volume2 className="size-5" />
          ) : (
            <VolumeX className="size-5" />
          )}
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 size-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 pointer-events-none" />

        <div
          className={`relative z-20 flex size-72 flex-col items-center justify-between rounded-3xl border-4 p-4 transition-all duration-300 ${
            guidanceStep === 'HOLD_STEADY' || countdown !== null
              ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.5)] scale-105'
              : guidanceStep === 'MOVE_RIGHT'
                ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]'
                : 'border-white/60 shadow-2xl'
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-black uppercase text-white/80">
              {isEn ? 'AI Spatial Sensor' : 'AI दिशा सेंसर'}
            </span>
            {guidanceStep === 'HOLD_STEADY' && (
              <span className="flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-0.5 text-[10px] font-black uppercase text-white animate-pulse">
                <Sparkles className="size-3" />
                {isEn ? 'Centered' : 'बीच में'}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            {countdown !== null ? (
              <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500 text-white text-4xl font-black shadow-2xl animate-ping">
                {countdown || '✓'}
              </div>
            ) : guidanceStep === 'MOVE_RIGHT' ? (
              <div className="flex items-center gap-2 rounded-2xl bg-amber-500/90 px-4 py-2 text-slate-950 font-black text-sm shadow-xl animate-bounce">
                <span>{isEn ? 'Pan Right' : 'दाईं ओर करें'}</span>
                <ChevronRight className="size-5 stroke-[3]" />
              </div>
            ) : guidanceStep === 'MOVE_CLOSER' ? (
              <div className="flex items-center gap-2 rounded-2xl bg-amber-500/90 px-4 py-2 text-slate-950 font-black text-sm shadow-xl">
                <Maximize2 className="size-4 stroke-[3]" />
                <span>{isEn ? 'Move Closer' : 'पास लाएँ'}</span>
              </div>
            ) : guidanceStep === 'HOLD_STEADY' ? (
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-white font-black text-sm shadow-xl">
                <CheckCircle2 className="size-5" />
                <span>{isEn ? 'Hold Steady' : 'स्थिर रखें'}</span>
              </div>
            ) : (
              <Camera className="size-12 text-white/40 animate-pulse" />
            )}
          </div>

          <div className="w-full text-center">
            <span className="text-[11px] font-medium text-white/70">
              {scanMode === 'strip_expiry'
                ? isEn
                  ? 'Strip Boundary Zone'
                  : 'दवा की स्ट्रिप का क्षेत्र'
                : isEn
                  ? 'Prescription Sheet'
                  : 'डॉक्टर के पर्चे का क्षेत्र'}
            </span>
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-28 z-30 flex items-center justify-center">
          <div className="flex items-center gap-2.5 rounded-2xl bg-black/80 px-4 py-3 text-center border border-white/20 backdrop-blur-md shadow-2xl max-w-sm">
            <Volume2 className="size-4 shrink-0 text-emerald-400 animate-pulse" />
            <p className="text-xs font-bold text-white tracking-wide">
              {guidanceText}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-30 flex items-center justify-around bg-black/90 p-6 border-t border-white/10 pb-10">
        <button
          type="button"
          onClick={() => {
            setCountdown(null);
            setGuidanceStep('LOOKING');
            speakGuide(
              isEn
                ? 'Aligning again.'
                : 'दोबारा सही स्थिति में लाया जा रहा है।'
            );
          }}
          className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-white"
        >
          <RotateCcw className="size-5" />
          <span>{isEn ? 'Reset' : 'रीसेट करें'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setGuidanceStep('CAPTURED');
            onScanComplete(scanMode);
          }}
          aria-label={isEn ? 'Capture scan' : 'स्कैन करें'}
          className="flex size-18 items-center justify-center rounded-full bg-white p-1 shadow-2xl ring-4 ring-emerald-500/50 active:scale-95 transition-all"
        >
          <div className="size-14 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center">
            <Camera className="size-7 text-white" />
          </div>
        </button>

        <div className="w-10" />
      </div>
    </div>
  );
}
