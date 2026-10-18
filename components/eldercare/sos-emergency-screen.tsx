'use client';

import React from 'react';
import { Phone, AlertCircle, X, ShieldAlert } from 'lucide-react';

interface SosEmergencyScreenProps {
  onCancel: () => void;
  language: string;
}

export function SosEmergencyScreen({
  onCancel,
  language,
}: SosEmergencyScreenProps) {
  const isEn = language === 'en';

  return (
    <div className="flex min-h-screen flex-col bg-[#fee2e2]/60 text-slate-800 p-5 select-none justify-between">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          aria-label={isEn ? 'Close emergency screen' : 'आपातकालीन स्क्रीन बंद करें'}
          className="rounded-full bg-white/80 p-2 text-slate-500 hover:bg-white shadow-xs"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl border border-red-200 space-y-4">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600 animate-bounce">
          <AlertCircle className="size-9" />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {isEn ? 'Emergency Help' : 'आपातकालीन सहायता'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
            {isEn
              ? 'Need immediate help? Contact your family, doctor or emergency services.'
              : 'तुरंत सहायता चाहिए? अपने परिवार, डॉक्टर या आपातकालीन सेवा से संपर्क करें।'}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href="tel:+919876543210"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-3.5 text-xs font-black text-white shadow-md hover:bg-red-700 active:scale-98 transition-all"
          >
            <Phone className="size-4" />
            {isEn ? 'Call Family' : 'परिवार को कॉल करें'}
          </a>

          <a
            href="tel:+919812345678"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-3.5 text-xs font-black text-white shadow-md hover:bg-red-700 active:scale-98 transition-all"
          >
            <Phone className="size-4" />
            {isEn ? 'Call Doctor' : 'डॉक्टर को कॉल करें'}
          </a>

          <a
            href="tel:112"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#b91c1c] py-3.5 text-xs font-black text-white shadow-md hover:bg-red-800 active:scale-98 transition-all"
          >
            <ShieldAlert className="size-4" />
            {isEn ? 'Emergency 112' : 'आपातकालीन सेवा 112'}
          </a>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full bg-white px-8 py-2.5 text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50"
        >
          {isEn ? 'Cancel' : 'रद्द करें'}
        </button>
      </div>
    </div>
  );
}
