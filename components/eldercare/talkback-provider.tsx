'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface TalkBackContextType {
  isEnabled: boolean;
  toggleTalkBack: () => void;
  speak: (text: string) => void;
}

const TalkBackContext = createContext<TalkBackContextType>({
  isEnabled: false,
  toggleTalkBack: () => {},
  speak: () => {},
});

export const useTalkBack = () => useContext(TalkBackContext);

export function TalkBackProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const speak = (text: string) => {
    if (!isEnabled || typeof window === 'undefined') return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Pichhli awaaz roko
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleTalkBack = () => {
    const next = !isEnabled;
    setIsEnabled(next);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = next
        ? 'TalkBack Audio Guide chalu ho gaya hai. Ab aap jahan tap karenge, audio sunai dega.'
        : 'TalkBack Audio Guide band kar diya gaya hai.';
      const u = new SpeechSynthesisUtterance(msg);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <TalkBackContext.Provider value={{ isEnabled, toggleTalkBack, speak }}>
      {children}
      {/* Floating TalkBack Button for Visually Impaired */}
      <button
        type="button"
        onClick={toggleTalkBack}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-2xl transition-all active:scale-95 border-2 ${
          isEnabled
            ? 'bg-amber-400 text-slate-900 border-amber-600 ring-4 ring-amber-300/60 font-black'
            : 'bg-slate-900 text-white border-slate-700 font-bold opacity-85 hover:opacity-100'
        }`}
        title="TalkBack Audio Guide"
        aria-label="TalkBack Audio Guide Toggle"
      >
        {isEnabled ? <Volume2 className="size-5 animate-bounce" /> : <VolumeX className="size-5" />}
        <span className="text-xs">{isEnabled ? 'Audio Guide: ON' : 'Audio Guide'}</span>
      </button>
    </TalkBackContext.Provider>
  );
}