'use client';

import React from 'react';
import {
  Mic,
  Camera,
  Pill,
  Calendar,
  Droplets,
  Heart,
  Users,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useTalkBack } from './talkback-provider';

interface DashboardScreenProps {
  onOpenVoice: () => void;
  onNavigate: (screenId: any) => void;
}

export function DashboardScreen({ onOpenVoice, onNavigate }: DashboardScreenProps) {
  const { speak } = useTalkBack();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 pb-20">
      {/* Top Header Card */}
      <div className="bg-white p-5 border-b border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
              Sanjeevani Elder Care
            </span>
            <h1 className="text-2xl font-black text-slate-900">Namaste, Dada Ji 🙏</h1>
          </div>

          {/* Voice Assistant Mic Trigger */}
          <button
            type="button"
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-2 text-xs font-black text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all ring-4 ring-emerald-50"
          >
            <Mic className="size-4 animate-pulse" />
            <span>Saathi AI</span>
          </button>
        </div>

        {/* Proactive Inactivity / Safety Status Bar */}
        <div className="flex items-center justify-between rounded-2xl bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 text-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Fall Detection & Safety Radar: Active</span>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-md">
            Safe
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* BIG EMERGENCY SOS BUTTON */}
        <button
          type="button"
          onClick={() => {
            speak('Emergency SOS screen khola ja raha hai');
            onNavigate(15);
          }}
          className="flex w-full items-center justify-between rounded-3xl bg-red-600 p-5 text-white shadow-xl shadow-red-500/20 hover:bg-red-700 active:scale-98 transition-all border-2 border-red-400"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xs">
              <AlertTriangle className="size-8" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-wide">Emergency SOS</h2>
              <p className="text-xs text-red-100 mt-0.5">Turant Parivaar aur Doctor ko alert bhejein</p>
            </div>
          </div>
          <ChevronRight className="size-6 text-red-200" />
        </button>

        {/* AI SCANNER PROMINENT CARD */}
        <div
          onClick={() => {
            speak('Dawai parchi aur strip scanner khola ja raha hai');
            onNavigate(8);
          }}
          className="cursor-pointer rounded-3xl bg-linear-to-br from-indigo-600 to-blue-700 p-5 text-white shadow-lg active:scale-98 transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="size-3 text-amber-300" />
              <span>AI Health Vision</span>
            </div>
            <span className="text-[11px] font-bold text-blue-200">Drug Conflict Guard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-700 shadow-md">
              <Camera className="size-7" />
            </div>
            <div>
              <h3 className="text-lg font-black leading-tight">Scan Doctor Prescription</h3>
              <p className="text-xs text-blue-100 mt-1">Dawaai ka naam, expiry date aur safety check karein</p>
            </div>
          </div>
        </div>

        {/* QUICK ACTION GRID */}
        <div className="grid grid-cols-2 gap-3">
          {/* Medicine Cabinet */}
          <button
            type="button"
            onClick={() => {
              speak('Medicine Cabinet screen');
              onNavigate(10);
            }}
            className="flex flex-col justify-between rounded-3xl bg-white p-4 text-left shadow-xs border border-slate-200 hover:border-emerald-300 active:scale-95 transition-all h-36"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Pill className="size-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600">3 Dawaai Baaki</span>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">Medicine Cabinet</h4>
            </div>
          </button>

          {/* Water Tracker */}
          <button
            type="button"
            onClick={() => {
              speak('Paani peene ka tracker');
              onNavigate(12);
            }}
            className="flex flex-col justify-between rounded-3xl bg-white p-4 text-left shadow-xs border border-slate-200 hover:border-blue-300 active:scale-95 transition-all h-36"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Droplets className="size-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-600">5 / 8 Glass</span>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">Water Tracker</h4>
            </div>
          </button>

          {/* Doctor Appointments */}
          <button
            type="button"
            onClick={() => {
              speak('Doctor appointment screen');
              onNavigate(11);
            }}
            className="flex flex-col justify-between rounded-3xl bg-white p-4 text-left shadow-xs border border-slate-200 hover:border-amber-300 active:scale-95 transition-all h-36"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Calendar className="size-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-600">Kal Subah 10:30 AM</span>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">Appointments</h4>
            </div>
          </button>

          {/* Family Hub */}
          <button
            type="button"
            onClick={() => {
              speak('Parivaar aur caregiver screen');
              onNavigate(14);
            }}
            className="flex flex-col justify-between rounded-3xl bg-white p-4 text-left shadow-xs border border-slate-200 hover:border-purple-300 active:scale-95 transition-all h-36"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <Users className="size-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-purple-600">2 Contacts Linked</span>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">Family Hub</h4>
            </div>
          </button>
        </div>

        {/* DAILY WELLBEING BANNER */}
        <button
          type="button"
          onClick={() => {
            speak('Daily Wellbeing check-in');
            onNavigate(13);
          }}
          className="flex w-full items-center justify-between rounded-3xl bg-white p-4 shadow-xs border border-slate-200 hover:bg-slate-50 active:scale-98 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <Heart className="size-6" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-black text-slate-900">Daily Health Check-in</h4>
              <p className="text-xs text-slate-500">Kaisa mehsus ho raha hai aaj?</p>
            </div>
          </div>
          <ChevronRight className="size-5 text-slate-400" />
        </button>
      </div>
    </div>
  );
}