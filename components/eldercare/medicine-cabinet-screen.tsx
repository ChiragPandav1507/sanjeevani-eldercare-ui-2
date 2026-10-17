'use client';

import React, { useState } from 'react';
import { ArrowLeft, Pill, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

interface MedicineCabinetScreenProps {
  onBack: () => void;
}

export function MedicineCabinetScreen({ onBack }: MedicineCabinetScreenProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: '1',
      name: '5545475',
      dosage: '6',
      time: '8:00 AM',
      taken: false,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'current' | 'reminders'>('current');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newTime, setNewTime] = useState('8:00 AM');

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newMed: Medicine = {
      id: Date.now().toString(),
      name: newName,
      dosage: newDosage || '1 tablet',
      time: newTime,
      taken: false,
    };

    setMedicines([...medicines, newMed]);
    setNewName('');
    setNewDosage('');
    setShowAddForm(false);
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const handleClearAll = () => {
    setMedicines([]);
  };

  const handleToggleTake = (id: string) => {
    setMedicines(
      medicines.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 pb-10 select-none">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 shadow-xs sticky top-0 z-10">
        <button
          type="button"
          onClick={onBack}
          className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-base font-black text-slate-900 tracking-tight">
          Medicine Cabinet
        </h1>
        <div className="size-9" />
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 space-y-4">
        <div className="flex items-center justify-between bg-slate-200/70 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'current'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Current Medicines ({medicines.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reminders')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'reminders'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reminders
          </button>
        </div>

        {activeTab === 'current' && (
          <div className="space-y-3">
            {medicines.length > 0 && (
              <div className="flex justify-end px-1">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 active:scale-95 transition-all"
                >
                  <Trash2 className="size-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            )}

            {medicines.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center space-y-2">
                <Pill className="size-10 text-slate-300 mx-auto" />
                <p className="text-xs font-bold text-slate-400">
                  No medicines added yet.
                </p>
              </div>
            ) : (
              medicines.map((med) => (
                <div
                  key={med.id}
                  className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shrink-0">
                      <Pill className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">
                        {med.name}
                      </h3>
                      <p className="text-xs font-medium text-slate-500">
                        {med.dosage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                        {med.time}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleTake(med.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all active:scale-95 ${
                        med.taken
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {med.taken ? 'Taken' : 'Take'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteMedicine(med.id)}
                      className="flex size-8 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition-all"
                      title="Remove medicine"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {showAddForm ? (
              <form
                onSubmit={handleAddMedicine}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm space-y-3"
              >
                <h4 className="text-xs font-black text-slate-900 uppercase">
                  Add New Medicine
                </h4>
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:outline-emerald-600"
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g. 1 Tablet)"
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:outline-emerald-600"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-emerald-700 py-2 text-xs font-bold text-white hover:bg-emerald-800 active:scale-95"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="w-full rounded-2xl bg-emerald-700 py-3.5 text-xs font-bold text-white shadow-md hover:bg-emerald-800 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="size-4" />
                <span>Add Medicine</span>
              </button>
            )}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="rounded-3xl border border-slate-200 bg-white p-4 text-center text-xs font-medium text-slate-500">
            Daily medicine alerts are active.
          </div>
        )}
      </main>
    </div>
  );
}
