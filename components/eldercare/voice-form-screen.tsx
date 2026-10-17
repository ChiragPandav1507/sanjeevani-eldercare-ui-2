'use client';

import React, { useState } from 'react';
import { ArrowLeft, Mic, MicOff, Check, Volume2, ShieldAlert } from 'lucide-react';
import { Logo } from './logo';
import { setStoredProfile } from './state-store';

interface VoiceFormScreenProps {
  language: string;
  onBack: () => void;
  onSubmitSuccess: () => void;
}

export function VoiceFormScreen({ language, onBack, onSubmitSuccess }: VoiceFormScreenProps) {
  const [isListening, setIsListening] = useState(false);
  const [spokenName, setSpokenName] = useState('Shanti Devi');
  const [spokenAge, setSpokenAge] = useState('72');
  const [spokenCity, setSpokenCity] = useState('Delhi');

  const isEn = language === 'en';

  const t = isEn
    ? {
        headerTitle: 'Voice Setup',
        title: 'Speak Your Details',
        desc: 'Tap the large microphone button and tell us your name, age, and medicines.',
        listeningMsg: 'Listening... please speak your name and city',
        listeningStatus: 'Listening now... Speak clearly',
        tapStatus: 'Tap to Start Speaking',
        detectedTitle: 'Detected Information',
        nameLabel: 'Name',
        ageLabel: 'Years',
        cityLabel: 'Location',
        confirmBtn: 'Confirm & Open Dashboard',
      }
    : {
        headerTitle: 'वॉइस सेटअप',
        title: 'बोलकर अपनी जानकारी दें',
        desc: 'बड़े माइक्रोफ़ोन बटन पर टैप करें और अपना नाम, आयु और दवाइयाँ बताएं।',
        listeningMsg: 'सुन रहे हैं... कृपया अपना नाम और शहर बोलें',
        listeningStatus: 'सुन रहे हैं... स्पष्ट रूप से बोलें',
        tapStatus: 'बोलना शुरू करने के लिए टैप करें',
        detectedTitle: 'पहचानी गई जानकारी',
        nameLabel: 'नाम',
        ageLabel: 'वर्ष',
        cityLabel: 'स्थान',
        confirmBtn: 'पुष्टि करें और डैशबोर्ड खोलें',
      };

  const toggleListening = () => {
    setIsListening(prev => !prev);
    if (!isListening) {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(t.listeningMsg);
        u.lang = language === 'en' ? 'en-IN' : 'hi-IN';
        window.speechSynthesis.speak(u);
      }
    }
  };

  const handleFinish = () => {
    setStoredProfile({
      name: spokenName,
      age: spokenAge,
      city: spokenCity,
      avatar: '👵',
    });
    onSubmitSuccess();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#022c22] text-white pb-12 select-none">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-emerald-900 bg-[#064e3b] px-4 py-3 shadow-md">
        <button
          type="button"
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-xl bg-emerald-800 text-white hover:bg-emerald-700"
        >
          <ArrowLeft className="size-5" />
        </button>
        <span className="text-sm font-black tracking-wide text-emerald-200">{t.headerTitle}</span>
        <div className="w-10" />
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-5 pt-8 text-center flex flex-col justify-between">
        <div className="space-y-3">
          <h2 className="text-2xl font-black text-emerald-100">{t.title}</h2>
          <p className="text-xs text-emerald-300 max-w-xs mx-auto leading-relaxed">
            {t.desc}
          </p>

          <div className="py-8 flex justify-center">
            <button
              type="button"
              onClick={toggleListening}
              className={`relative flex size-32 items-center justify-center rounded-full transition-all shadow-2xl active:scale-95 ${
                isListening
                  ? 'bg-rose-600 ring-8 ring-rose-400/50 animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-400 ring-8 ring-emerald-500/30'
              }`}
            >
              {isListening ? <MicOff className="size-14 text-white" /> : <Mic className="size-14 text-white" />}
            </button>
          </div>

          <p className="text-xs font-bold text-emerald-200">
            {isListening ? t.listeningStatus : t.tapStatus}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-800 bg-[#064e3b]/80 p-4 text-left space-y-2 mt-4">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{t.detectedTitle}</span>
          <div className="text-xs space-y-1 text-emerald-100 font-medium">
            <p>• {t.nameLabel}: <span className="font-bold text-white">{spokenName}</span></p>
            <p>• Age: <span className="font-bold text-white">{spokenAge} {t.ageLabel}</span></p>
            <p>• {t.cityLabel}: <span className="font-bold text-white">{spokenCity}</span></p>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="button"
            onClick={handleFinish}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-xs font-black text-emerald-950 shadow-xl hover:bg-emerald-50 active:scale-98 transition-all"
          >
            <Check className="size-4 text-emerald-800" />
            {t.confirmBtn}
          </button>
        </div>
      </main>
    </div>
  );
}
