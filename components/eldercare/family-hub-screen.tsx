'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  AlertTriangle,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface FamilyHubScreenProps {
  onBack: () => void;
  language: string;
}

export function FamilyHubScreen({
  onBack,
  language,
}: FamilyHubScreenProps) {
  const isEn = language === 'en';

  const [activities] = useState<any[]>([]);
  const [emergencyContacts] = useState<any[]>([]);
  const [inactiveHours, setInactiveHours] = useState<number>(0);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 pb-10 select-none">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 shadow-xs sticky top-0 z-10">
        <button
          type="button"
          onClick={onBack}
          aria-label={isEn ? 'Go back' : 'वापस जाएँ'}
          className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-base font-black text-slate-900 tracking-tight">
          {isEn ? 'Family Hub' : 'परिवार केंद्र'}
        </h1>
        <div className="size-9" />
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-5 space-y-5">
        {inactiveHours > 0 ? (
          <div className="rounded-3xl border border-amber-300 bg-amber-50/80 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/70 px-2.5 py-0.5 text-[10px] font-black text-amber-900 uppercase tracking-wider">
                {isEn ? 'Activity Check' : 'गतिविधि जाँच'}
              </span>
              <span className="text-xs font-bold text-amber-800">
                {inactiveHours}{' '}
                {isEn ? 'Hours Inactive' : 'घंटों से निष्क्रिय'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-black text-sm">
                <AlertTriangle className="size-4 text-amber-600" />
                <span>
                  {isEn ? 'No Activity Recorded' : 'कोई गतिविधि दर्ज नहीं हुई'}
                </span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                {isEn
                  ? `The user has not marked any medicine or logged a glass of water for the past ${inactiveHours} hours. Please check in.`
                  : `पिछले ${inactiveHours} घंटों से कोई दवा लेने या पानी पीने की गतिविधि दर्ज नहीं हुई है। कृपया हालचाल पूछें।`}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-xl bg-amber-600 py-2.5 text-center text-xs font-bold text-white shadow-xs hover:bg-amber-700 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="size-3.5 fill-current" />
                <span>{isEn ? 'WhatsApp Check' : 'WhatsApp पर पूछें'}</span>
              </a>
              <button
                type="button"
                onClick={() => setInactiveHours(0)}
                className="rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-xs font-bold text-amber-800 hover:bg-amber-100 active:scale-98 transition-all"
              >
                {isEn ? 'Dismiss' : 'हटाएँ'}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-4 shadow-sm flex items-center gap-3">
            <ShieldCheck className="size-6 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-emerald-900">
                {isEn ? 'User Active' : 'उपयोगकर्ता सक्रिय हैं'}
              </h3>
              <p className="text-[11px] text-emerald-700 font-medium">
                {isEn
                  ? 'No inactivity alert at the moment.'
                  : 'अभी निष्क्रियता का कोई अलर्ट नहीं है।'}
              </p>
            </div>
          </div>
        )}

        <section className="space-y-2.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
            {isEn ? "Today's Activity Log" : 'आज की गतिविधियाँ'}
          </h2>
          {activities.length > 0 ? (
            <div className="space-y-2">
              {activities.map((act, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-xs text-xs font-semibold text-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="size-3.5 text-slate-400" />
                    <span>{act.text}</span>
                  </div>
                  <span className="font-bold text-emerald-700">{act.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-400 font-medium">
              {isEn
                ? 'No activity logged today yet.'
                : 'आज अभी तक कोई गतिविधि दर्ज नहीं हुई है।'}
            </div>
          )}
        </section>

        <section className="space-y-2.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
            {isEn ? 'Emergency Contacts' : 'आपातकालीन संपर्क'}
          </h2>
          {emergencyContacts.length > 0 ? (
            <div className="space-y-2">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs"
                >
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {contact.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {contact.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${contact.phone}`}
                      aria-label={isEn ? 'Call contact' : 'संपर्क को कॉल करें'}
                      className="flex size-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                    >
                      <Phone className="size-4" />
                    </a>
                    <a
                      href={`https://wa.me/${contact.phone}`}
                      aria-label={
                        isEn ? 'Message contact' : 'संपर्क को संदेश भेजें'
                      }
                      className="flex size-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                    >
                      <MessageSquare className="size-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-400 font-medium">
              {isEn
                ? 'No emergency contacts added yet.'
                : 'अभी तक कोई आपातकालीन संपर्क नहीं जोड़ा गया है।'}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
