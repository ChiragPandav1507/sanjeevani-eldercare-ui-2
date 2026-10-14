'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Pill,
  ShieldAlert,
  Volume2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { checkDrugInteractions, DrugConflict } from '@/lib/drug-safety-rules';

interface PrescriptionResultScreenProps {
  scanMode?: 'prescription' | 'strip_expiry';
  onBack: () => void;
  onSaveToCabinet: () => void;
}

export function PrescriptionResultScreen({
  scanMode = 'strip_expiry',
  onBack,
  onSaveToCabinet,
}: PrescriptionResultScreenProps) {
  // Existing Medicines in user's profile
  const existingMeds = ['Aspirin 75mg (Morning)', 'Metformin 500mg (Post Lunch)'];

  // Scanned medicine
  const detectedMedicine = scanMode === 'strip_expiry' ? 'Warfarin 2.5mg' : 'Paracetamol 500mg';
  const [conflict, setConflict] = useState<DrugConflict | null>(null);

  useEffect(() => {
    // Check if scanned medicine conflicts with existing cabinet medicines
    const detectedConflict = checkDrugInteractions(existingMeds, detectedMedicine);
    setConflict(detectedConflict);

    if (detectedConflict && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(detectedConflict.warningHindi);
      u.lang = 'hi-IN';
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  }, [detectedMedicine]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 pb-10">
      {/* Top Header */}
      <div className="flex items-center gap-3 bg-white p-4 shadow-xs border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-2 hover:bg-slate-100 active:scale-95 transition-all"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-base font-bold text-slate-800">
          {scanMode === 'strip_expiry' ? 'Strip & Expiry Analysis' : 'Prescription AI Results'}
        </h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Scanned Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase text-emerald-800">
              AI Detection Complete
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <Sparkles className="size-3.5" /> 98.4% Confidence
            </span>
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900">{detectedMedicine}</h2>
            <p className="text-xs text-slate-500 mt-0.5">Scanned from device camera</p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <Calendar className="size-4 shrink-0 text-emerald-600" />
            <span>Expiry Status: <b>Valid till Dec 2027 (Safe to use)</b></span>
          </div>
        </div>

        {/* DRUG-TO-DRUG INTERACTION ALERT CARD */}
        {conflict && (
          <div className="rounded-3xl bg-red-50 p-5 shadow-md border-2 border-red-500 space-y-3 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-2 text-red-700">
              <ShieldAlert className="size-6 shrink-0 animate-bounce" />
              <h3 className="text-sm font-black uppercase tracking-wide">
                Critical Drug Interaction Warning
              </h3>
            </div>

            <div className="rounded-2xl bg-white/80 p-3.5 border border-red-200 space-y-1.5 text-xs">
              <p className="font-bold text-red-900">{conflict.clinicalRisk}</p>
              <p className="text-slate-700 leading-relaxed">{conflict.warningHindi}</p>
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-red-800 bg-red-100/70 p-2.5 rounded-xl">
              <span>Existing in Cabinet: <b>Aspirin</b></span>
              <span className="text-red-600">Conflicting: <b>Warfarin</b></span>
            </div>

            <button
              type="button"
              onClick={() => {
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  const u = new SpeechSynthesisUtterance(conflict.warningHindi);
                  u.lang = 'hi-IN';
                  window.speechSynthesis.speak(u);
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-xs font-black text-white hover:bg-red-700 active:scale-98 transition-all"
            >
              <Volume2 className="size-4" />
              Listen Warning Again (Hindi)
            </button>
          </div>
        )}

        {/* Existing Medicine Safety Context */}
        <div className="rounded-3xl bg-white p-4 shadow-xs border border-slate-200 space-y-2">
          <h4 className="text-xs font-bold text-slate-600">Medicines currently taken by Elder:</h4>
          <div className="space-y-1.5">
            {existingMeds.map((med, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <Pill className="size-3.5 text-emerald-600" />
                <span>{med}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={onSaveToCabinet}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black text-white shadow-md active:scale-98 transition-all ${
              conflict ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-700 hover:bg-emerald-800'
            }`}
          >
            <CheckCircle className="size-4" />
            {conflict ? 'Proceed with Caution (Save to Cabinet)' : 'Save to Medicine Cabinet'}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="flex w-full items-center justify-center rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 active:scale-98 transition-all"
          >
            Cancel & Retake Photo
          </button>
        </div>
      </div>
    </div>
  );
}