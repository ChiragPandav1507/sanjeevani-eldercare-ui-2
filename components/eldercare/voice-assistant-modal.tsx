'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActionTrigger?: (action: string) => void;
}

export function VoiceAssistantModal({
  isOpen,
  onClose,
  onActionTrigger,
}: VoiceAssistantModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiReply, setAiReply] = useState('Boliye, main aapki kya madad karoon?');
  const recognitionRef = useRef<any>(null);

  const speakHindi = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  };

  const processCommand = (cmd: string) => {
    const text = cmd.toLowerCase();

    // 1. Medicine Mark Action
    if (text.includes('dawai') || text.includes('goli') || text.includes('medicine') || text.includes('kha li')) {
      const reply = 'Bahut badhiya! Maine aapki subah ki dawai mark kar di hai.';
      setAiReply(reply);
      speakHindi(reply);
      if (onActionTrigger) onActionTrigger('MEDICINE_TAKEN');
      return;
    }

    // 2. Next Medicine Query
    if (text.includes('agli') || text.includes('kab') || text.includes('time') || text.includes('samay')) {
      const reply = 'Aapki agli dawai dopehar 1:30 baje Paracetamol aur Vitamin D hai.';
      setAiReply(reply);
      speakHindi(reply);
      return;
    }

    // 3. Water Drink Action
    if (text.includes('pani') || text.includes('paani') || text.includes('water') || text.includes('glass')) {
      const reply = 'Shabash! Maine 1 glass paani record kar diya hai. Hydrated rahiye!';
      setAiReply(reply);
      speakHindi(reply);
      if (onActionTrigger) onActionTrigger('WATER_ADDED');
      return;
    }

    // 4. Emergency / Health issue
    if (text.includes('chakkar') || text.includes('dard') || text.includes('sos') || text.includes('madad') || text.includes('bachao')) {
      const reply = 'Ghabraye nahi! Main turant aapke parivaar ko alert bhej rahi hoon.';
      setAiReply(reply);
      speakHindi(reply);
      if (onActionTrigger) onActionTrigger('SOS_TRIGGERED');
      return;
    }

    // Fallback response
    const defaultReply = `Maine suna: "${cmd}". Aap dawai, paani, ya agla samay poochh sakte hain.`;
    setAiReply(defaultReply);
    speakHindi(defaultReply);
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Aapke browser me speech recognition support nahi hai.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('Sun raha hoon, boliye...');
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        setIsListening(false);
        processCommand(spokenText);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setTranscript('Awaaz theek se nahi aayi, kripya dobara mic dabayein.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setAiReply('Boliye, main aapki kya madad karoon?');
      speakHindi('Namaste! Sanjeevani Saathi hazir hai. Boliye, main aapki kya madad karoon?');
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      stopListening();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-2 border-emerald-500 text-center space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <Sparkles className="size-4 animate-spin" />
            <span className="text-xs font-black uppercase tracking-wider">Sanjeevani Saathi AI</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* AI Reply Card */}
        <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 min-h-[75px] flex items-center justify-center">
          <p className="text-sm font-bold text-emerald-950 leading-relaxed">{aiReply}</p>
        </div>

        {/* Spoken Text Feedback */}
        {transcript && (
          <p className="text-xs font-medium text-slate-500 italic">
            "{transcript}"
          </p>
        )}

        {/* Big Interactive Mic Button */}
        <div className="py-2">
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`mx-auto flex size-24 items-center justify-center rounded-full shadow-xl transition-all active:scale-95 ${
              isListening
                ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-100'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 ring-8 ring-emerald-50'
            }`}
          >
            {isListening ? <MicOff className="size-10" /> : <Mic className="size-10" />}
          </button>
          <p className="text-[11px] font-bold text-slate-500 mt-3">
            {isListening ? '🎙️ Awaaz record ho rahi hai...' : 'Bolein: "Agli dawai kab hai?" ya "Pani piya"'}
          </p>
        </div>

        {/* Quick Sample Prompts */}
        <div className="grid grid-cols-2 gap-2 text-left pt-1">
          <button
            type="button"
            onClick={() => {
              setTranscript('Dawai kha li');
              processCommand('Maine dawai kha li');
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-[10px] font-bold text-slate-700 hover:bg-slate-100"
          >
            💊 "Dawai kha li"
          </button>
          <button
            type="button"
            onClick={() => {
              setTranscript('Agli dawai kab hai?');
              processCommand('Agli dawai kab hai');
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-[10px] font-bold text-slate-700 hover:bg-slate-100"
          >
            ⏰ "Agli dawai kab hai?"
          </button>
        </div>
      </div>
    </div>
  );
}