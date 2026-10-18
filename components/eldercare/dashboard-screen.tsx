'use client';

import React from 'react';
import {
  Pill,
  Droplets,
  Calendar,
  Users,
  Camera,
  AlertOctagon,
  Heart,
  Mic,
  ChevronRight,
  Activity,
} from 'lucide-react';

interface DashboardScreenProps {
  language: string;
  waterCount: number;
  medicineCount: number;
  appointmentText: string;
  contactsCount: number;
  onOpenVoice: () => void;
  onNavigate: (screenId: any) => void;
}

export function DashboardScreen({
  language,
  waterCount,
  medicineCount,
  appointmentText,
  contactsCount,
  onOpenVoice,
  onNavigate,
}: DashboardScreenProps) {
  const isEn = language === 'en';

  const appointmentLabel = isEn
    ? appointmentText === 'Koi Appointment Nahi'
      ? 'No Appointments'
      : appointmentText
    : appointmentText === 'Koi Appointment Nahi'
      ? 'कोई अपॉइंटमेंट नहीं'
      : `${appointmentText.match(/\d+/)?.[0] ?? ''} आगामी अपॉइंटमेंट`;

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800 pb-12 select-none">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 shadow-xs sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <Heart className="size-5 fill-current" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 leading-tight">
              Sanjeevani
            </h1>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              ElderCare+
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenVoice}
          className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all"
        >
          <Mic className="size-4" />
          <span>{isEn ? 'Saathi' : 'साथी'}</span>
        </button>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-5 space-y-4">
        <button
          type="button"
          onClick={() => onNavigate(15)}
          className="w-full rounded-3xl bg-red-600 p-4 text-white shadow-lg hover:bg-red-700 active:scale-98 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/20">
              <AlertOctagon className="size-7" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-black tracking-wide leading-tight">
                {isEn ? 'EMERGENCY SOS' : 'आपातकालीन SOS'}
              </h2>
              <p className="text-xs font-medium text-red-100">
                {isEn
                  ? 'Instantly alert family and doctor'
                  : 'परिवार और डॉक्टर को तुरंत सूचित करें'}
              </p>
            </div>
          </div>
          <ChevronRight className="size-6 text-white/80" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate(8)}
          className="w-full rounded-3xl bg-blue-600 p-5 text-white shadow-md hover:bg-blue-700 active:scale-98 transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
              {isEn ? 'AI Health Vision' : 'AI स्वास्थ्य जाँच'}
            </span>
            <span className="text-xs font-bold text-blue-100">
              {isEn ? 'Drug Conflict Guard' : 'दवाओं की सुरक्षा जाँच'}
            </span>
          </div>
          <div className="flex items-center gap-3.5 text-left">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm shrink-0">
              <Camera className="size-6" />
            </div>
            <div>
              <h3 className="text-base font-black leading-tight">
                {isEn ? 'Scan Doctor Prescription' : 'डॉक्टर का पर्चा स्कैन करें'}
              </h3>
              <p className="text-xs text-blue-100 font-medium">
                {isEn
                  ? 'Check medicine name, expiry date & safety'
                  : 'दवा का नाम, समाप्ति तिथि और सुरक्षा जाँचें'}
              </p>
            </div>
          </div>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onNavigate(10)}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 active:scale-98 transition-all text-left min-h-[120px]"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Pill className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400">
                {medicineCount}{' '}
                {isEn ? 'Medicines Left' : 'दवाइयाँ बाकी'}
              </span>
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                {isEn ? 'Medicine Cabinet' : 'दवा अलमारी'}
              </h3>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(12)}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 active:scale-98 transition-all text-left min-h-[120px]"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Droplets className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400">
                {waterCount} / 8 {isEn ? 'Glasses' : 'गिलास'}
              </span>
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                {isEn ? 'Water Tracker' : 'पानी ट्रैकर'}
              </h3>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(11)}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 active:scale-98 transition-all text-left min-h-[120px]"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Calendar className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400">
                {appointmentLabel}
              </span>
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                {isEn ? 'Appointments' : 'अपॉइंटमेंट'}
              </h3>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(14)}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 active:scale-98 transition-all text-left min-h-[120px]"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <Users className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400">
                {contactsCount}{' '}
                {isEn ? 'Contacts Linked' : 'संपर्क जुड़े हैं'}
              </span>
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                {isEn ? 'Family Hub' : 'परिवार केंद्र'}
              </h3>
            </div>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate(13)}
          className="w-full flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 active:scale-98 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <Activity className="size-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-black text-slate-900">
                {isEn ? 'Daily Health Check-in' : 'दैनिक स्वास्थ्य जाँच'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {isEn
                  ? 'How are you feeling today?'
                  : 'आज आप कैसा महसूस कर रहे हैं?'}
              </p>
            </div>
          </div>
          <ChevronRight className="size-5 text-slate-400" />
        </button>
      </main>
    </div>
  );
}
