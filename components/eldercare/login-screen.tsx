'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Phone, UserCheck, Heart } from 'lucide-react';

interface LoginScreenProps {
  language: string;
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
  onContinueGuest: () => void;
}

export function LoginScreen({
  language,
  onLoginSuccess,
  onGoToRegister,
  onContinueGuest,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isEn = language === 'en';

  const t = isEn
    ? {
        title: 'Create Account',
        subtitle: 'Sign up for your Sanjeevani account to stay healthy and connected',
        labelId: 'Mobile Number or Email',
        placeholderId: 'Enter mobile number or email',
        labelPass: 'Set Password',
        placeholderPass: 'Create password',
        signUp: 'Sign Up',
        or: 'OR',
        guest: 'Continue as Guest',
        hasAccount: 'Already have an account?',
        loginLink: 'Login here',
      }
    : {
        title: 'खाता बनाएँ',
        subtitle: 'स्वस्थ और जुड़े रहने के लिए अपना संजीवनी खाता बनाएँ',
        labelId: 'मोबाइल नंबर या ईमेल',
        placeholderId: 'मोबाइल नंबर या ईमेल दर्ज करें',
        labelPass: 'पासवर्ड सेट करें',
        placeholderPass: 'पासवर्ड बनाएं',
        signUp: 'साइन अप करें',
        or: 'या',
        guest: 'गेस्ट के रूप में जारी रखें',
        hasAccount: 'क्या आपका पहले से खाता है?',
        loginLink: 'यहाँ लॉगिन करें',
      };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) return;

    try {
      localStorage.setItem(
        'user_session',
        JSON.stringify({ user: identifier, loggedInAt: Date.now() })
      );
    } catch (err) {
      console.error(err);
    }

    onLoginSuccess();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800 pb-10 select-none">
      <header className="flex items-center justify-center border-b border-slate-200 bg-white px-4 py-4 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <Heart className="size-5 fill-current" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 leading-tight">Sanjeevani</h1>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">ElderCare+</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-5 pt-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.title}</h2>
          <p className="text-xs text-slate-500 font-medium">
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labelId}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder={t.placeholderId}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
              <Phone className="absolute right-3.5 top-3.5 size-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.labelPass}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder={t.placeholderPass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 rounded-lg p-1 text-slate-
