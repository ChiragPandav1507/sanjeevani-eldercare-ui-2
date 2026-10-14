'use client';

import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Plus, User, CheckCircle2 } from 'lucide-react';

interface AppointmentsScreenProps {
  onBack: () => void;
}

interface AppointmentItem {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
}

const INITIAL_APPOINTMENTS: AppointmentItem[] = [
  {
    id: 1,
    doctor: 'Dr. Ramesh Sharma',
    specialty: 'Cardiologist (Heart)',
    date: 'Tomorrow, 15 Oct',
    time: '10:30 AM',
    location: 'Apollo Clinic, Sector 14',
    status: 'upcoming',
  },
  {
    id: 2,
    doctor: 'Dr. Sunita Verma',
    specialty: 'General Physician',
    date: '22 Oct 2026',
    time: '04:00 PM',
    location: 'Max Healthcare',
    status: 'upcoming',
  },
  {
    id: 3,
    doctor: 'Dr. Ankit Mehta',
    specialty: 'Eye Specialist (Ophthalmology)',
    date: '28 Sep 2026',
    time: '11:00 AM',
    location: 'Netra Eye Care',
    status: 'completed',
  },
];

export function AppointmentsScreen({ onBack }: AppointmentsScreenProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [appointments, setAppointments] = useState<AppointmentItem[]>(INITIAL_APPOINTMENTS);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [doctor, setDoctor] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor.trim()) return;

    setAppointments((prev) => [
      {
        id: Date.now(),
        doctor: doctor.trim(),
        specialty: specialty.trim() || 'General Checkup',
        date: date.trim() || 'Upcoming',
        time: time.trim() || '10:00 AM',
        location: location.trim() || 'Clinic Visit',
        status: 'upcoming',
      },
      ...prev,
    ]);

    setDoctor('');
    setSpecialty('');
    setDate('');
    setTime('');
    setLocation('');
    setShowModal(false);
  };

  const filtered = appointments.filter((item) =>
    activeTab === 'upcoming' ? item.status === 'upcoming' : item.status === 'completed'
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800 pb-12 select-none">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h2 className="text-sm font-bold text-slate-900">Doctor Appointments</h2>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 space-y-4">
        {/* Toggle Bar */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-200/80 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`rounded-xl py-2 text-xs font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={`rounded-xl py-2 text-xs font-bold transition-all ${
              activeTab === 'past'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past Visits
          </button>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-xs text-slate-400">
              No appointments found in this tab.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-black text-slate-900">{item.doctor}</h3>
                    <p className="text-[11px] font-semibold text-emerald-700">{item.specialty}</p>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      item.status === 'upcoming'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.status === 'upcoming' ? 'Scheduled' : 'Visited'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-slate-400 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-slate-400 shrink-0" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <MapPin className="size-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Book / Add Button */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3.5 text-xs font-bold text-white shadow-md hover:bg-emerald-800 active:scale-98 transition-all"
        >
          <Plus className="size-4" />
          Book / Add Appointment
        </button>
      </main>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Add Doctor Appointment</h3>
            <form onSubmit={handleAdd} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="Doctor Name (e.g. Dr. Gupta)"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              />
              <input
                type="text"
                placeholder="Specialty (e.g. Eye Specialist)"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Date (e.g. 18 Oct)"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl border border-slate-200 p-2.5 text-xs"
                />
                <input
                  type="text"
                  placeholder="Time (e.g. 11:00 AM)"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>
              <input
                type="text"
                placeholder="Clinic / Hospital Name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white shadow"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}