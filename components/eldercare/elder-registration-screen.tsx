'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, Calendar, Heart, Shield, Plus, X, Trash2 } from 'lucide-react';
import { Logo } from './logo';
import { setStoredProfile } from './state-store';

interface ElderRegistrationScreenProps {
  onBack: () => void;
  onNext: () => void;
}

interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  phone: string;
}

export function ElderRegistrationScreen({ onBack, onNext }: ElderRegistrationScreenProps) {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('female');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('Diabetes, High Blood Pressure');
  
  // Modal for Screen 2B
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: 1, name: 'Rohan Sharma', relation: 'Son', phone: '+91 98765 43210' }
  ]);
  const [fmName, setFmName] = useState('');
  const [fmRelation, setFmRelation] = useState('Son');
  const [fmPhone, setFmPhone] = useState('');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fmName.trim() || !fmPhone.trim()) return;
    setFamilyMembers(prev => [
      ...prev,
      { id: Date.now(), name: fmName.trim(), relation: fmRelation, phone: fmPhone.trim() }
    ]);
    setFmName('');
    setFmPhone('');
    setShowFamilyModal(false);
  };

  const handleRemoveMember = (id: number) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to dynamic local store
    setStoredProfile({
      name: fullName.trim() || 'Shanti Devi',
      age: age.trim() || '72',
      city: city.trim() || 'Delhi',
      avatar: gender === 'male' ? '👴' : '👵',
    });
    onNext();
  };

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
        <Logo size="sm" />
        <div className="w-10" />
      </header>

      {/* Main Form */}
      <main className="flex-1 max-w-md mx-auto w-full px-5 pt-6 space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700">Elder Profile Setup</span>
          <h2 className="text-2xl font-black text-slate-900 mt-0.5">Tell Us About Yourself</h2>
          <p className="text-xs text-slate-500 mt-1">This helps us customize reminders and emergency contacts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Shanti Devi"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <User className="absolute right-3.5 top-3.5 size-4 text-slate-400" />
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Age (Years)</label>
              <input
                type="number"
                required
                placeholder="e.g. 72"
                value={age}
                onChange={e => setAge(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Mobile Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Phone className="absolute right-3.5 top-3.5 size-4 text-slate-400" />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">City / Location</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Delhi NCR"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <MapPin className="absolute right-3.5 top-3.5 size-4 text-slate-400" />
            </div>
          </div>

          {/* Medical Conditions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Known Health Conditions</label>
            <input
              type="text"
              placeholder="e.g. BP, Diabetes, Arthritis"
              value={medicalConditions}
              onChange={e => setMedicalConditions(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Screen 2B Section: Family Members */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900">Emergency Family Contacts (Screen 2B)</label>
              <button
                type="button"
                onClick={() => setShowFamilyModal(true)}
                className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
              >
                <Plus className="size-3.5" />
                Add Member
              </button>
            </div>

            <div className="space-y-2">
              {familyMembers.map(m => (
                <div key={m.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{m.name} ({m.relation})</h4>
                    <p className="text-[11px] text-slate-500">{m.phone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(m.id)}
                    className="p-1 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-700 py-3.5 text-xs font-black text-white shadow-md hover:bg-emerald-800 active:scale-98 transition-all tracking-wide"
          >
            Save & Continue to Login
          </button>
        </form>
      </main>

      {/* Screen 2B Modal: Add Family Member */}
      {showFamilyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">2B. Add Family Member</h3>
              <button
                type="button"
                onClick={() => setShowFamilyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Sharma"
                  value={fmName}
                  onChange={e => setFmName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Relationship</label>
                <select
                  value={fmRelation}
                  onChange={e => setFmRelation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                >
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Daughter-in-law">Daughter-in-law</option>
                  <option value="Caregiver">Caregiver</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98123 45678"
                  value={fmPhone}
                  onChange={e => setFmPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFamilyModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white shadow"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}