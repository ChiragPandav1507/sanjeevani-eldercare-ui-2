'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Pill } from 'lucide-react';
import { getStoredMeds, setStoredMeds, MedicineItem } from './state-store';

interface MedicineCabinetScreenProps {
  onBack: () => void;
}

export function MedicineCabinetScreen({ onBack }: MedicineCabinetScreenProps) {
  const [activeTab, setActiveTab] = useState<'current' | 'reminders'>('current');
  const [meds, setMeds] = useState<MedicineItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newTime, setNewTime] = useState('8:00 AM');

  useEffect(() => {
    setMeds(getStoredMeds());
  }, []);

  const toggleStatus = (id: number) => {
    const updated = meds.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m));
    setMeds(updated);
    setStoredMeds(updated);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const updated: MedicineItem[] = [
      ...meds,
      {
        id: Date.now(),
        name: newName.trim(),
        dosage: newDosage.trim() || '1 tablet (After food)',
        time: newTime.trim() || '8:00 AM',
        taken: false,
      },
    ];

    setMeds(updated);
    setStoredMeds(updated);
    setNewName('');
    setNewDosage('');
    setShowAddModal(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800 pb-12 select-none">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h2 className="text-sm font-bold text-slate-900">Medicine Cabinet</h2>
        <div className="w-10" />
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-200/80 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('current')}
            className={`rounded-xl py-2 text-xs font-bold transition-all ${
              activeTab === 'current'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Current Medicines ({meds.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reminders')}
            className={`rounded-xl py-2 text-xs font-bold transition-all ${
              activeTab === 'reminders'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reminders
          </button>
        </div>

        <div className="space-y-3">
          {meds.map((med) => (
            <div
              key={med.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-10 items-center justify-center rounded-xl ${
                    med.taken ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                  }`}
                >
                  <Pill className="size-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-extrabold ${med.taken ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {med.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{med.dosage}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 mb-1.5">
                  {med.time}
                </span>
                <div>
                  <button
                    type="button"
                    onClick={() => toggleStatus(med.id)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors ${
                      med.taken
                        ? 'bg-emerald-600 text-white'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {med.taken ? 'Taken' : 'Take'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3.5 text-xs font-bold text-white shadow-md hover:bg-emerald-800 active:scale-98 transition-all"
        >
          <Plus className="size-4" />
          Add Medicine
        </button>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Add New Medicine</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Medicine Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              />
              <input
                type="text"
                placeholder="Dosage (e.g. 1 tablet after food)"
                value={newDosage}
                onChange={(e) => setNewDosage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              />
              <input
                type="text"
                placeholder="Time (e.g. 8:00 AM)"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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