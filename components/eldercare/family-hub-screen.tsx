'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Plus,
  Trash2,
} from 'lucide-react';

interface FamilyHubScreenProps {
  onBack: () => void;
  language: string;
}

interface ActivityEntry {
  id: string;
  text: string;
  time: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
}

const STORAGE_KEY = 'sanjeevani-family-hub';

export function FamilyHubScreen({
  onBack,
  language,
}: FamilyHubScreenProps) {
  const isEn = language === 'en';

  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<
    EmergencyContact[]
  >([]);
  const [inactiveHours, setInactiveHours] = useState<number>(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [activityText, setActivityText] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        const parsed = JSON.parse(savedData);

        if (Array.isArray(parsed.activities)) {
          setActivities(parsed.activities);
        }
        if (Array.isArray(parsed.emergencyContacts)) {
          setEmergencyContacts(parsed.emergencyContacts);
        }
      }
    } catch (error) {
      console.error('Could not load Family Hub data:', error);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ activities, emergencyContacts })
      );
    } catch (error) {
      console.error('Could not save Family Hub data:', error);
    }
  }, [activities, emergencyContacts, hasLoaded]);

  const handleAddActivity = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = activityText.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString(
      isEn ? 'en-US' : 'hi-IN',
      { hour: 'numeric', minute: '2-digit' }
    );

    setActivities((previous) => [
      { id: `${Date.now()}`, text, time },
      ...previous,
    ]);
    setActivityText('');
  };

  const handleDeleteActivity = (id: string) => {
    setActivities((previous) =>
      previous.filter((activity) => activity.id !== id)
    );
  };

  const handleAddContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = contactName.trim();
    const phone = contactPhone.trim();
    if (!name || !phone) return;

    setEmergencyContacts((previous) => [
      {
        id: `${Date.now()}`,
        name,
        role: contactRole.trim(),
        phone,
      },
      ...previous,
    ]);

    setContactName('');
    setContactRole('');
    setContactPhone('');
  };

  const handleDeleteContact = (id: string) => {
    setEmergencyContacts((previous) =>
      previous.filter((contact) => contact.id !== id)
    );
  };

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
                  {isEn
                    ? 'No Activity Recorded'
                    : 'कोई गतिविधि दर्ज नहीं हुई'}
                </span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                {isEn
                  ? `No activity has been recorded for ${inactiveHours} hours. Please check in.`
                  : `पिछले ${inactiveHours} घंटों से कोई गतिविधि दर्ज नहीं हुई है। कृपया हालचाल पूछें।`}
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
                <span>
                  {isEn ? 'WhatsApp Check' : 'WhatsApp पर पूछें'}
                </span>
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

          <form
            onSubmit={handleAddActivity}
            className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs"
          >
            <input
              type="text"
              value={activityText}
              onChange={(event) => setActivityText(event.target.value)}
              placeholder={
                isEn
                  ? 'Enter an activity to log'
                  : 'दर्ज करने के लिए गतिविधि लिखें'
              }
              aria-label={isEn ? 'Activity description' : 'गतिविधि का विवरण'}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!activityText.trim()}
              className="flex shrink-0 items-center justify-center gap-1 rounded-xl bg-emerald-700 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="size-4" />
              {isEn ? 'Log' : 'दर्ज करें'}
            </button>
          </form>

          {activities.length > 0 ? (
            <div className="space-y-2">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-xs text-xs font-semibold text-slate-700"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Clock className="size-3.5 shrink-0 text-slate-400" />
                    <span className="break-words">{activity.text}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-bold text-emerald-700">
                      {activity.time}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteActivity(activity.id)}
                      aria-label={
                        isEn ? 'Delete activity' : 'गतिविधि हटाएँ'
                      }
                      title={isEn ? 'Delete activity' : 'गतिविधि हटाएँ'}
                      className="flex size-7 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
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

          <form
            onSubmit={handleAddContact}
            className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs"
          >
            <input
              type="text"
              required
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              placeholder={isEn ? 'Name' : 'नाम'}
              aria-label={isEn ? 'Contact name' : 'संपर्क का नाम'}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="text"
              value={contactRole}
              onChange={(event) => setContactRole(event.target.value)}
              placeholder={isEn ? 'Relationship (e.g. Daughter)' : 'रिश्ता (जैसे: बेटी)'}
              aria-label={isEn ? 'Relationship' : 'रिश्ता'}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="tel"
              required
              value={contactPhone}
              onChange={(event) => setContactPhone(event.target.value)}
              placeholder={isEn ? 'Phone number' : 'फ़ोन नंबर'}
              aria-label={isEn ? 'Phone number' : 'फ़ोन नंबर'}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!contactName.trim() || !contactPhone.trim()}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="size-4" />
              {isEn ? 'Add Emergency Contact' : 'आपातकालीन संपर्क जोड़ें'}
            </button>
          </form>

          {emergencyContacts.length > 0 ? (
            <div className="space-y-2">
              {emergencyContacts.map((contact) => {
                const whatsappNumber = contact.phone.replace(/\D/g, '');

                return (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-bold text-slate-900">
                        {contact.name}
                      </h3>
                      {contact.role && (
                        <p className="truncate text-[10px] text-slate-500 font-medium">
                          {contact.role}
                        </p>
                      )}
                      <p className="text-[10px] text-slate-500">
                        {contact.phone}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <a
                        href={`tel:${contact.phone}`}
                        aria-label={
                          isEn ? 'Call contact' : 'संपर्क को कॉल करें'
                        }
                        className="flex size-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      >
                        <Phone className="size-4" />
                      </a>
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={
                          isEn
                            ? 'Message contact on WhatsApp'
                            : 'WhatsApp पर संदेश भेजें'
                        }
                        className="flex size-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      >
                        <MessageSquare className="size-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteContact(contact.id)}
                        aria-label={
                          isEn ? 'Delete contact' : 'संपर्क हटाएँ'
                        }
                        title={isEn ? 'Delete contact' : 'संपर्क हटाएँ'}
                        className="flex size-8 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
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
