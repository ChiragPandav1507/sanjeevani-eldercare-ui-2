'use client';

import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  language: string;
  setLanguage: (lang: string) => void;
  onSelectElderly: () => void;
  onSelectVisuallyImpaired: () => void;
}

export function WelcomeScreen({
  language,
  setLanguage,
  onSelectElderly,
  onSelectVisuallyImpaired,
}: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 pb-10 select-none">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 shadow-xs sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <Heart className="size-5 fill-current" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 leading-tight">Sanjeevani</h1>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">ElderCare+</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button type="button" onClick={() => {}} className="size-7 text-xs font-bold text-slate-600 rounded-lg hover:bg-white">A-</button>
          <button type="button" onClick={() => {}} className="size-7 text-xs font-bold text-slate-600 rounded-lg hover:bg-white">A+</button>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-5 space-y-6">
        <div className="rounded-3xl bg-emerald-700 p-6 text-white shadow-lg space-y-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            {language === 'en' ? 'Your Digital Companion' : 'Aapka Digital Saathi'}
          </span>
          <h2 className="text-2xl font-black">
            {language === 'en' ? 'Welcome to Sanjeevani' : 'Sanjeevani mein aapka swagat hai'}
          </h2>
          <p className="text-xs text-emerald-100 font-medium leading-relaxed">
            {language === 'en'
              ? 'Simple, secure & helpful app for seniors and caregivers'
              : 'Buzurgo aur dekhbhal karne walo ke liye aasaan, surakshit aur madadgar app'}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
            {language === 'en' ? 'Choose Your Language' : 'Apni bhasha chune (Choose Language)'}
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`flex flex-col p-3.5 rounded-2xl border text-left transition-all ${
                language === 'hi' ? 'border-emerald-600 bg-emerald-50/50 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-sm font-bold text-slate-900">हिंदी</span>
              <span className="text-[11px] text-slate-500 font-medium">Hindi</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex flex-col p-3.5 rounded-2xl border text-left transition-all ${
                language === 'en' ? 'border-emerald-600 bg-emerald-50/50 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-sm font-bold text-slate-900">English</span>
              <span className="text-[11px] text-slate-500 font-medium">English</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`flex flex-col p-3.5 rounded-2xl border text-left transition-all ${
                language === 'mr' ? 'border-emerald-600 bg-emerald-50/50 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-sm font-bold text-slate-900">मराठी</span>
              <span className="text-[11px] text-slate-500 font-medium">Marathi</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`flex flex-col p-3.5 rounded-2xl border text-left transition-all ${
                language === 'bn' ? 'border-emerald-600 bg-emerald-50/50 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-sm font-bold text-slate-900">বাংলা</span>
              <span className="text-[11px] text-slate-500 font-medium">Bengali</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
            {language === 'en' ? 'How would you like to use the app?' : 'Aap app ka upyog kaise karna chahte hain?'}
          </h3>

          <button
            type="button"
            onClick={onSelectElderly}
            className="w-full flex items-center justify-between rounded-3xl border border-emerald-500 bg-emerald-50/30 p-4 text-left shadow-xs hover:bg-emerald-50/60 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Heart className="size-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  {language === 'en' ? 'Senior Citizen Mode' : 'Senior Citizen Mode'}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === 'en'
                    ? 'Large text, clear dashboard, medicine & checkup reminders'
                    : 'Bade akshar, saral dashbord, dawai aur doctor ki yaad dilane wala'}
                </p>
              </div>
            </div>
            <ArrowRight className="size-5 text-emerald-600 shrink-0" />
          </button>

          <button
            type="button"
            onClick={onSelectVisuallyImpaired}
            className="w-full flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-xs hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Heart className="size-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  {language === 'en' ? 'Voice / Screen-Free Mode' : 'Voice / Screen-Free Mode'}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === 'en'
                    ? 'Optimized for speech input, low-vision or audio guidance'
                    : 'Kam drishti ya bina padhe sirf bolkar upyog karne ke liye'}
                </p>
              </div>
            </div>
            <ArrowRight className="size-5 text-slate-400 shrink-0" />
          </button>
        </div>
      </main>
    </div>
  );
}
