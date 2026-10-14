'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Phone,
  MessageCircle,
  AlertCircle,
  ShieldCheck,
  Clock,
  HeartPulse,
  Activity,
} from 'lucide-react';
import { useTalkBack } from './talkback-provider';

interface FamilyHubScreenProps {
  onBack: () => void;
}

export function FamilyHubScreen({ onBack }: FamilyHubScreenProps) {
  const { speak } = useTalkBack();
  const [inactivityAlertActive, setInactivityAlertActive] = useState(true);

  const contacts = [
    { name: 'Rohan (Beta)', role: 'Primary Caregiver', phone: '+919876543210' },
    { name: 'Pooja (Beti)', role: 'Secondary Emergency', phone: '+919876543211' },
    { name: 'Dr. Mehta (Clinic)', role: 'Family Physician', phone: '+919876543212' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 pb-12">
      {/* Top Header */}
      <div className="flex items-center gap-3 bg-white p-4 shadow-xs border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-2 hover:bg-slate-100 active:scale-95 transition-all"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-base font-bold text-slate-800">Family & Caregiver Hub</h1>
          <p className="text-[11px] text-slate-500">Live Heartbeat & Emergency Sync</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* CAREGIVER HEARTBEAT / INACTIVITY RADAR CARD */}
        {inactivityAlertActive ? (
          <div className="rounded-3xl bg-amber-50 p-5 shadow-sm border-2 border-amber-400 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-amber-200/80 px-2.5 py-1 text-[10px] font-black uppercase text-amber-900">
                <HeartPulse className="size-3.5 text-amber-700 animate-pulse" />
                Proof-of-Life Radar
              </span>
              <span className="text-[11px] font-bold text-amber-800">4 Hours Inactive</span>
            </div>

            <div>
              <h2 className="text-base font-black text-amber-950">
                ⚠️ Koi Activity Record Nahi Hui
              </h2>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                Pichle 4 ghante se User ne na koi dawaai mark ki hai, na paani ka glass log kiya hai. Kripya check karein.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://wa.me/919876543210?text=Namaste%20Dada%20Ji,%20aap%20theek%20hain?%20Subah%20se%20app%20par%20koi%20update%20nahi%20aaya."
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-amber-600 py-2.5 text-xs font-black text-white shadow-xs hover:bg-amber-700 active:scale-95 transition-all"
              >
                <MessageCircle className="size-3.5" />
                WhatsApp Check
              </a>
              <button
                type="button"
                onClick={() => setInactivityAlertActive(false)}
                className="rounded-2xl border border-amber-300 bg-white px-3 py-2.5 text-xs font-bold text-amber-900 hover:bg-amber-100 active:scale-95 transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-3xl bg-emerald-50 p-4 border border-emerald-200">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-emerald-600" />
              <div>
                <h3 className="text-xs font-black text-emerald-950">Heartbeat Status: Active</h3>
                <p className="text-[11px] text-emerald-700">Recent check-in 12 minutes ago</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setInactivityAlertActive(true)}
              className="text-[10px] font-bold text-emerald-800 underline"
            >
              Test Alert
            </button>
          </div>
        )}

        {/* Caregiver Live Activity Log */}
        <div className="rounded-3xl bg-white p-4 shadow-xs border border-slate-200 space-y-3">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Today's Activity Log
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-slate-400" />
                <span className="font-semibold text-slate-700">Subah ki BP goli li</span>
              </div>
              <span className="font-bold text-emerald-600">08:15 AM</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-slate-400" />
                <span className="font-semibold text-slate-700">Paani (Glass 3) logged</span>
              </div>
              <span className="font-bold text-emerald-600">09:40 AM</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/50 border border-amber-100">
              <div className="flex items-center gap-2">
                <Activity className="size-3.5 text-amber-500" />
                <span className="font-semibold text-amber-800">Phone unmoved since</span>
              </div>
              <span className="font-bold text-amber-700">10:00 AM</span>
            </div>
          </div>
        </div>

        {/* Linked Caregiver Contacts */}
        <div className="rounded-3xl bg-white p-4 shadow-xs border border-slate-200 space-y-3">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Emergency Contacts
          </h3>

          <div className="space-y-2">
            {contacts.map((c, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div>
                  <h4 className="text-xs font-black text-slate-900">{c.name}</h4>
                  <p className="text-[10px] text-slate-500">{c.role}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${c.phone}`}
                    className="flex size-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs hover:bg-emerald-700"
                  >
                    <Phone className="size-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/${c.phone.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  >
                    <MessageCircle className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}