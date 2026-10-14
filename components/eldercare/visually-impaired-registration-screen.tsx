'use client';

import React, { useState } from 'react';
import { ArrowLeft, Mic, Keyboard, PhoneCall, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Logo } from './logo';

interface VisuallyImpairedRegistrationProps {
  onBack: () => void;
  onContinue: (mode: 'voice' | 'text') => void;
}

export function VisuallyImpairedRegistrationScreen({
  onBack,
  onContinue,
}: VisuallyImpairedRegistrationProps) {
  const [selectedMode, setSelectedMode] = useState<'voice' | 'text'>('voice');

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800 pb-10 select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          title="Back"
        >
          <ArrowLeft className="size-5" />
        </button>

        <Logo size="sm" />

        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-5 pt-6 space-y-6">
        {/* Title Section */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <span>For Visually Impaired</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">Create Your Account</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            We've made this simple and accessible for you.
          </p>
        </div>

        {/* Hero Accessibility Icon */}
        <div className="flex justify-center py-2">
          <div className="flex size-24 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20">
            <svg
              className="size-14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="4" r="2" />
              <path d="m18 19 1-7-6 1" />
              <path d="m5 8 3-3 5.5 3-2.36 3.5" />
              <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
              <path d="M13.76 17.5a5 5 0 0 0-4-7.5" />
            </svg>
          </div>
        </div>

        {/* Mode Selector Cards */}
        <div className="space-y-3 pt-2">
          {/* 1. Voice Input Option */}
          <button
            type="button"
            onClick={() => setSelectedMode('voice')}
            className={`w-full rounded-2xl border-2 p-4 text-left transition-all flex items-center justify-between ${
              selectedMode === 'voice'
                ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex size-12 items-center justify-center rounded-xl transition-colors ${
                  selectedMode === 'voice'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Mic className="size-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Voice Input</h4>
                <p className="text-xs text-slate-500 mt-0.5">Speak your details</p>
              </div>
            </div>

            {selectedMode === 'voice' && (
              <CheckCircle2 className="size-5 text-emerald-600" />
            )}
          </button>

          {/* 2. Text Input Option */}
          <button
            type="button"
            onClick={() => setSelectedMode('text')}
            className={`w-full rounded-2xl border-2 p-4 text-left transition-all flex items-center justify-between ${
              selectedMode === 'text'
                ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex size-12 items-center justify-center rounded-xl transition-colors ${
                  selectedMode === 'text'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Keyboard className="size-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Text Input</h4>
                <p className="text-xs text-slate-500 mt-0.5">Type your details</p>
              </div>
            </div>

            {selectedMode === 'text' && (
              <CheckCircle2 className="size-5 text-emerald-600" />
            )}
          </button>
        </div>

        {/* Helpline Support Button */}
        <div className="pt-2">
          <a
            href="tel:14567"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <PhoneCall className="size-4 text-emerald-600" />
            Need Help? Call Support
          </a>
        </div>

        {/* Continue Action Button */}
        <button
          type="button"
          onClick={() => onContinue(selectedMode)}
          className="w-full rounded-xl bg-emerald-700 py-3.5 text-xs font-black text-white shadow-md hover:bg-emerald-800 active:scale-98 transition-all tracking-wide"
        >
          Continue
        </button>

        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-400">
          <ShieldCheck className="size-4 text-emerald-600" />
          <span>Screen reader & audio narration compatible</span>
        </div>
      </main>
    </div>
  );
}