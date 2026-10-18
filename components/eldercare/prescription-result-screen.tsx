'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Pill,
  ShieldAlert,
  Volume2,
  Sparkles,
} from 'lucide-react';
import {
  checkDrugInteractions,
  DrugConflict,
} from '@/lib/drug-safety-rules';

interface PrescriptionResultScreenProps {
  scanMode?: 'prescription' | 'strip_expiry';
  onBack: () => void;
  onSaveToCabinet: () => void;
  language: string;
  recognizedText: string;
}

const getMedicineCandidate = (text: string) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/[|_]/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const doseLine = lines.find((line) =>
    /\b\d+(?:\.\d+)?\s*(mg|mcg|g|ml|µg)\b/i.test(line)
  );

  if (doseLine) return doseLine;

  const usefulLine = lines.find(
    (line) =>
      /[a-zA-Z]/.test(line) &&
      line.length >= 3 &&
      !/\b(batch|lot|mfg|manufactured|expiry|exp|mrp|price|tablet|tablets|capsule|capsules|composition|each)\b/i.test(
        line
      )
  );

  return usefulLine ?? '';
};

export function PrescriptionResultScreen({
  scanMode = 'strip_expiry',
  onBack,
  onSaveToCabinet,
  language,
  recognizedText,
}: PrescriptionResultScreenProps) {
  const isEn = language === 'en';

  // This is the existing demo cabinet list; it is not yet linked to the real
  // Medicine Cabinet data.
  const existingMeds = [
    'Aspirin 75mg (Morning)',
    'Metformin 500mg (Post Lunch)',
  ];

  const [medicineName, setMedicineName] = useState(() =>
    getMedicineCandidate(recognizedText)
  );
  const [conflict, setConflict] = useState<DrugConflict | null>(null);

  useEffect(() => {
    setMedicineName(getMedicineCandidate(recognizedText));
  }, [recognizedText]);

  useEffect(() => {
    const name = medicineName.trim();

    if (!name) {
      setConflict(null);
      return;
    }

    const detectedConflict = checkDrugInteractions(existingMeds, name);
    setConflict(detectedConflict);

    if (
      detectedConflict &&
      typeof window !== 'undefined' &&
      'speechSynthesis' in window
    ) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        isEn
          ? detectedConflict.warningEnglish
          : detectedConflict.warningHindi
      );

      utterance.lang = isEn ? 'en-US' : 'hi-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }, [medicineName, isEn]);

  const warningText = conflict
    ? isEn
      ? conflict.warningEnglish
      : conflict.warningHindi
    : '';

  const listenToWarning = () => {
    if (
      !conflict ||
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(warningText);
    utterance.lang = isEn ? 'en-US' : 'hi-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const conflictDrugName = conflict
    ? conflict.drugA.toLowerCase() === 'aspirin' ||
      conflict.drugB.toLowerCase() === 'aspirin'
      ? 'Aspirin'
      : conflict.drugA.toLowerCase() === 'metformin' ||
          conflict.drugB.toLowerCase() === 'metformin'
        ? 'Metformin'
        : conflict.drugA
    : '';

  const otherConflictDrug = conflict
    ? conflict.drugA.toLowerCase() === conflictDrugName.toLowerCase()
      ? conflict.drugB
      : conflict.drugA
    : '';

  const clinicalRiskText = conflict
    ? isEn
      ? conflict.clinicalRisk
      : conflict.clinicalRisk ===
          'Severe Gastrointestinal / Systemic Hemorrhage Risk'
        ? 'पेट या शरीर के अंदर गंभीर रक्तस्राव का खतरा'
        : conflict.clinicalRisk === 'Lactic Acidosis & Renal Dysfunction'
          ? 'लैक्टिक एसिडोसिस और गुर्दों की कार्यक्षमता में समस्या'
          : conflict.clinicalRisk === 'Hepatotoxicity & Liver Stress'
            ? 'यकृत विषाक्तता और लीवर पर दबाव'
            : conflict.clinicalRisk
    : '';

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 pb-10">
      <div className="flex items-center gap-3 bg-white p-4 shadow-xs border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          aria-label={isEn ? 'Go back' : 'वापस जाएँ'}
          className="rounded-full p-2 hover:bg-slate-100 active:scale-95 transition-all"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-base font-bold text-slate-800">
          {scanMode === 'strip_expiry'
            ? isEn
              ? 'Strip & Expiry Text Scan'
              : 'स्ट्रिप और एक्सपायरी टेक्स्ट स्कैन'
            : isEn
              ? 'Prescription Text Scan'
              : 'पर्चे का टेक्स्ट स्कैन'}
        </h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase text-emerald-800">
              {isEn ? 'Text Scan Complete' : 'टेक्स्ट स्कैन पूरा हुआ'}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700">
              <Sparkles className="size-3.5" />
              {isEn ? 'Please verify' : 'कृपया जाँचें'}
            </span>
          </div>

          <div>
            <label
              htmlFor="recognized-medicine-name"
              className="mb-1 block text-xs font-bold text-slate-700"
            >
              {isEn
                ? 'Medicine name (review and correct if needed)'
                : 'दवा का नाम (जाँचें और ज़रूरत हो तो सुधारें)'}
            </label>
            <input
              id="recognized-medicine-name"
              type="text"
              value={medicineName}
              onChange={(event) => setMedicineName(event.target.value)}
              placeholder={
                isEn
                  ? 'Could not identify a name — enter it here'
                  : 'नाम नहीं मिला — यहाँ दवा का नाम लिखें'
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <p className="text-xs text-slate-500">
            {isEn
              ? 'OCR can misread medicine packaging. Verify the name on the strip before relying on it.'
              : 'OCR दवा की पैकिंग गलत पढ़ सकता है। भरोसा करने से पहले स्ट्रिप पर नाम जाँचें।'}
          </p>

          <details className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <summary className="cursor-pointer text-xs font-bold text-slate-700">
              {isEn ? 'View all text read from image' : 'तस्वीर से पढ़ा गया पूरा टेक्स्ट देखें'}
            </summary>
            <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-slate-600">
              {recognizedText ||
                (isEn ? 'No text was recognized.' : 'कोई टेक्स्ट नहीं मिला।')}
            </pre>
          </details>
        </div>

        {conflict && (
          <div className="rounded-3xl bg-red-50 p-5 shadow-md border-2 border-red-500 space-y-3 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-2 text-red-700">
              <ShieldAlert className="size-6 shrink-0 animate-bounce" />
              <h3 className="text-sm font-black uppercase tracking-wide">
                {isEn
                  ? 'Possible Drug Interaction'
                  : 'दवाओं के बीच संभावित प्रतिक्रिया'}
              </h3>
            </div>

            <div className="rounded-2xl bg-white/80 p-3.5 border border-red-200 space-y-1.5 text-xs">
              <p className="font-bold text-red-900">{clinicalRiskText}</p>
              <p className="text-slate-700 leading-relaxed">{warningText}</p>
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-red-800 bg-red-100/70 p-2.5 rounded-xl">
              <span>
                {isEn ? 'Existing medicine: ' : 'पहले से ली जा रही दवा: '}
                <b>{conflictDrugName}</b>
              </span>
              <span className="text-red-600">
                {isEn ? 'Scanned match: ' : 'स्कैन से मिली दवा: '}
                <b>{otherConflictDrug}</b>
              </span>
            </div>

            <button
              type="button"
              onClick={listenToWarning}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-xs font-black text-white hover:bg-red-700 active:scale-98 transition-all"
            >
              <Volume2 className="size-4" />
              {isEn ? 'Listen to Warning Again' : 'चेतावनी फिर से सुनें'}
            </button>

            <p className="text-[11px] leading-relaxed text-red-800">
              {isEn
                ? 'This is an automated demo check, not medical advice. Confirm with a doctor or pharmacist.'
                : 'यह स्वचालित डेमो जाँच है, चिकित्सा सलाह नहीं। डॉक्टर या फार्मासिस्ट से पुष्टि करें।'}
            </p>
          </div>
        )}

        <div className="rounded-3xl bg-white p-4 shadow-xs border border-slate-200 space-y-2">
          <h4 className="text-xs font-bold text-slate-600">
            {isEn
              ? 'Demo medicines used for interaction check:'
              : 'दवा प्रतिक्रिया जाँच के लिए डेमो दवाइयाँ:'}
          </h4>
          <div className="space-y-1.5">
            {existingMeds.map((medicine, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100"
              >
                <Pill className="size-3.5 text-emerald-600" />
                <span>{medicine}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] leading-relaxed text-amber-700">
            {isEn
              ? 'These are sample medicines in the current demo, not your actual cabinet list.'
              : 'ये मौजूदा डेमो की नमूना दवाइयाँ हैं, आपकी असली दवा-अलमारी की सूची नहीं।'}
          </p>
        </div>

        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={onSaveToCabinet}
            disabled={!medicineName.trim()}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black text-white shadow-md active:scale-98 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
              conflict
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-emerald-700 hover:bg-emerald-800'
            }`}
          >
            <CheckCircle className="size-4" />
            {conflict
              ? isEn
                ? 'Proceed with Caution'
                : 'सावधानी से आगे बढ़ें'
              : isEn
                ? 'Continue to Medicine Cabinet'
                : 'दवा अलमारी पर जाएँ'}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="flex w-full items-center justify-center rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 active:scale-98 transition-all"
          >
            {isEn ? 'Cancel & Scan Again' : 'रद्द करें और फिर स्कैन करें'}
          </button>
        </div>
      </div>
    </div>
  );
}
