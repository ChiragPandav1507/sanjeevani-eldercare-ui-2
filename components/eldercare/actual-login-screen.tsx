'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Phone, UserCheck, Heart } from 'lucide-react';

interface ActualLoginScreenProps {
  language: string;
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
  onContinueGuest: () => void;
}

export function ActualLoginScreen({
  language,
  onLoginSuccess,
  onGoToRegister,
  onContinueGuest,
}: ActualLoginScreenProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const isEn = language === 'en';

  const t = isEn
    ? {
        title: 'Welcome Back!',
        subtitle: 'Login to your Sanjeevani account to stay healthy and connected',
        labelId: 'Mobile Number or Email',
        placeholderId: 'Enter mobile number or email',
        labelPass: 'Password',
        placeholderPass: 'Enter password',
        remember: 'Remember me',
        forgot: 'Forgot password?',
        login: 'Login',
        or: 'OR',
        guest: 'Continue as Guest',
        newUser: 'New user?',
        registerLink: 'Register here',
        alertMsg: 'OTP reset link sent to your registered mobile number.',
      }
    : {
        title: 'वापसी पर स्वागत है!',
        subtitle: 'स्वस्थ और जुड़े रहने के लिए अपने संजीवनी खाते में लॉगिन करें',
        labelId: 'मोबाइल नंबर या ईमेल',
        placeholderId: 'मोबाइल नंबर या ईमेल दर्ज करें',
        labelPass: 'पासवर्ड',
        placeholderPass: 'पासवर्ड दर्ज करें',
        remember: 'मुझे याद रखें',
        forgot: 'पासवर्ड भूल गए?',
        login: 'लॉगिन करें',
        or: 'या',
        guest: 'गेस्ट के रूप में जारी रखें',
        newUser: 'नया उपयोगकर्ता?',
        registerLink: 'यहाँ रजिस्टर करें',
        alertMsg: 'आपके पंजीकृत मोबाइल नंबर पर ओटीपी रीसेट लिंक भेज दिया गया है।',
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
                className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-600 font-medium">{t.remember}</span>
            </label>

            <button
              type="button"
              onClick={() => alert(t.alertMsg)}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              {t.forgot}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-700 py-3.5 text-xs font-black text-white shadow-md hover:bg-emerald-800 active:scale-98 transition-all tracking-wide"
          >
            {t.login}
          </button>
        </form>

        <div className="relative flex items-center justify-center py-1">
          <div className="w-full border-t border-slate-200" />
          <span className="absolute bg-[#f8fafc] px-3 text-[11px] font-bold text-slate-400">
            {t.or}
          </span>
        </div>

        <button
          type="button"
          onClick={onContinueGuest}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <UserCheck className="size-4 text-emerald-700" />
          {t.guest}
        </button>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            {t.newUser}{' '}
            <button
              type="button"
              onClick={onGoToRegister}
              className="font-bold text-emerald-700 hover:underline"
            >
              {t.registerLink}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
