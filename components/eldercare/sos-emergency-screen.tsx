'use client';

import React from 'react';
import { Phone, AlertCircle, X, ShieldAlert } from 'lucide-react';

interface SosEmergencyScreenProps {
  onCancel: () => void;
}

export function SosEmergencyScreen({ onCancel }: SosEmergencyScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fee2e2]/60 text-slate-800 p-5 select-none justify-between">
      {/* Top Header */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full bg-white/80 p-2 text-slate-500 hover:bg-white shadow-xs"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Emergency Center Card */}
      <div className="mx-auto w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl border border-red-200 space-y-4">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600 animate-bounce">
          <AlertCircle className="size-9" />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Emergency Help</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
            Need immediate help? Contact your family, doctor or emergency services.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Call Family */}
          <a
            href="tel:+919876543210"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-3.5 text-xs font-black text-white shadow-md hover:bg-red-700 active:scale-98 transition-all"
          >
            <Phone className="size-4" />
            Call Family
          </a>

          {/* Call Doctor */}
          <a
            href="tel:+919812345678"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-3.5 text-xs font-black text-white shadow-md hover:bg-red-700 active:scale-98 transition-all"
          >
            <Phone className="size-4" />
            Call Doctor
          </a>

          {/* Emergency 112 */}
          <a
            href="tel:112"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#b91c1c] py-3.5 text-xs font-black text-white shadow-md hover:bg-red-800 active:scale-98 transition-all"
          >
            <ShieldAlert className="size-4" />
            Emergency 112
          </a>
        </div>
      </div>

      {/* Cancel Action */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full bg-white px-8 py-2.5 text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}