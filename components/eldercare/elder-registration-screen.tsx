'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, Calendar, Heart, Shield, Plus, X, Trash2 } from 'lucide-react';
import { Logo } from './logo';
import { setStoredProfile } from './state-store';

interface ElderRegistrationScreenProps {
  language: string;
  onBack: () => void;
  onNext: () => void;
}

interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  phone: string;
}

export function ElderRegistrationScreen({ language, onBack, onNext }: ElderRegistrationScreenProps) {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('female');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [fmName, setFmName] = useState('');
  const [fmRelation, setFmRelation] = useState('Son');
  const [fmPhone, setFmPhone] = useState('');

  const isEn = language === 'en';

  const t = isEn
    ? {
        subtitle: 'Elder Profile Setup',
        title: 'Tell Us About Yourself',
        desc: 'This helps us customize reminders and emergency contacts.',
        nameLabel: 'Full Name',
        namePlace: 'e.g. Shanti Devi',
        ageLabel: 'Age (Years)',
        agePlace: 'e.g. 72',
        genderLabel: 'Gender',
        genderFemale: 'Female',
        genderMale: 'Male',
        genderOther: 'Other',
        phoneLabel: 'Mobile Number',
        phonePlace: '+91 98765 43210',
        cityLabel: 'City / Location',
        cityPlace: 'e.g. Delhi NCR',
        medLabel: 'Known Health Conditions',
        medPlace: 'e.g. BP, Diabetes, Arthritis',
        familyTitle: 'Emergency Family Contacts (Screen 2B)',
        addMember: 'Add Member',
        submitBtn: 'Save & Continue to Login',
        modalTitle: '2B. Add Family Member',
        modalNameLabel: 'Full Name',
        modalNamePlace: 'e.g. Pooja Sharma',
        modalRelationLabel: 'Relationship',
        relSon: 'Son',
        relDaughter: 'Daughter',
        relSpouse: 'Spouse',
        relDaughterInLaw: 'Daughter-in-law',
        relCaregiver: 'Caregiver',
        modalPhoneLabel: 'Phone Number',
        modalPhonePlace: '+91 98123 45678',
        cancel: 'Cancel',
        modalAdd: 'Add Member',
      }
    : {
        subtitle: 'एल्डर प्रोफाइल सेटअप',
        title: 'अपने बारे में बताएं',
        desc: 'इससे हमें रिमाइंडर और आपातकालीन संपर्कों को कस्टमाइज़ करने में मदद मिलती है।',
        nameLabel: 'पूरा नाम',
        namePlace: 'जैसे: शांति देवी',
        ageLabel: 'आयु (वर्ष)',
        agePlace: 'जैसे: 72',
        genderLabel: 'लिंग',
        genderFemale: 'महिला',
        genderMale: 'पुरुष',
        genderOther: 'अन्य',
        phoneLabel: 'मोबाइल नंबर',
        phonePlace: '+91 98765 43210',
        cityLabel: 'शहर / स्थान',
        cityPlace: 'जैसे: दिल्ली एनसीआर',
        medLabel: 'ज्ञात स्वास्थ्य स्थितियां',
        medPlace: 'जैसे: बीपी, मधुमेह, गठिया',
        familyTitle: 'आपातकालीन पारिवारिक संपर्क (स्क्रीन 2बी)',
        addMember: 'सदस्य जोड़ें',
        submitBtn: 'सहेजें और लॉगिन पर आगे बढ़ें',
        modalTitle: '2बी. परिवार का सदस्य जोड़ें',
        modalNameLabel: 'पूरा नाम',
        modalNamePlace: 'जैसे: पूजा शर्मा',
        modalRelationLabel: 'रिश्ता',
        relSon: 'बेटा',
        relDaughter: 'बेटी',
        relSpouse: 'पति/पत्नी',
        relDaughterInLaw: 'बहू',
        relCaregiver: 'देखभाल करने वाला',
        modalPhoneLabel: 'फ़ोन नंबर',
        modalPhonePlace: '+91 98123 45678',
        cancel: 'रद्द करें',
        modalAdd: 'सदस्य जोड़ें',
      };

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

      <main className="flex-1 max-w-md mx-auto w-full px-5 pt-6 space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700">{t.subtitle}</span>
          <h2 className="text-2xl font-black text-slate-900 mt-0.5">{t.title}</h2>
          <p className="text-xs text-slate-500 mt-1">{t.desc}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.nameLabel}</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder={t.namePlace}
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <User className="absolute right-3.5 top-3.5 size-4 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.ageLabel}</label>
              <input
                type="number"
                required
                placeholder={t.agePlace}
                value={age}
                onChange={e => setAge(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.genderLabel}</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="female">{t.genderFemale}</option>
                <option value="male">{t.genderMale}</option>
                <option value="other">{t.genderOther}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.phoneLabel}</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder={t.phonePlace}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Phone className="absolute right-3.5 top-3.5 size-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.cityLabel}</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder={t.cityPlace}
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <MapPin className="absolute right-3.5 top-3.5 size-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.medLabel}</label>
            <input
              type="text"
              placeholder={t.medPlace}
              value={medicalConditions}
              onChange={e => setMedicalConditions(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900">{t.familyTitle}</label>
              <button
                type="button"
                onClick={() => setShowFamilyModal(true)}
                className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
              >
                <Plus className="size-3.5" />
                {t.addMember}
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

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-700 py-3.5 text-xs font-black text-white shadow-md hover:bg-emerald-800 active:scale-98 transition-all tracking-wide"
          >
            {t.submitBtn}
          </button>
        </form>
      </main>

      {showFamilyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">{t.modalTitle}</h3>
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
                <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.modalNameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.modalNamePlace}
                  value={fmName}
                  onChange={e => setFmName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.modalRelationLabel}</label>
                <select
                  value={fmRelation}
                  onChange={e => setFmRelation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                >
                  <option value="Son">{t.relSon}</option>
                  <option value="Daughter">{t.relDaughter}</option>
                  <option value="Spouse">{t.relSpouse}</option>
                  <option value="Daughter-in-law">{t.relDaughterInLaw}</option>
                  <option value="Caregiver">{t.relCaregiver}</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.modalPhoneLabel}</label>
                <input
                  type="tel"
                  required
                  placeholder={t.modalPhonePlace}
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
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white shadow"
                >
                  {t.modalAdd}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
