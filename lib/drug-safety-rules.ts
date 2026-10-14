export interface DrugConflict {
  drugA: string;
  drugB: string;
  severity: 'HIGH' | 'MODERATE';
  warningHindi: string;
  warningEnglish: string;
  clinicalRisk: string;
}

// Critical Drug Conflicts for Hackathon Demonstration
export const KNOWN_DRUG_CONFLICTS: DrugConflict[] = [
  {
    drugA: 'aspirin',
    drugB: 'warfarin',
    severity: 'HIGH',
    warningHindi: 'Chetavani! Aspirin aur Warfarin ek saath lene se pait mein bleeding ka gambhir khatra hai. Doctor se bina pooche saath na lein.',
    warningEnglish: 'High Risk: Aspirin combined with Warfarin significantly increases major internal bleeding risks.',
    clinicalRisk: 'Severe Gastrointestinal / Systemic Hemorrhage Risk',
  },
  {
    drugA: 'metformin',
    drugB: 'contrast dye',
    severity: 'HIGH',
    warningHindi: 'Chetavani! Metformin aur Contrast dye ek saath kidney par bura asar daal sakte hain.',
    warningEnglish: 'Severe Risk: Metformin with contrast agents may trigger acute renal impairment.',
    clinicalRisk: 'Lactic Acidosis & Renal Dysfunction',
  },
  {
    drugA: 'paracetamol',
    drugB: 'combiflam',
    severity: 'MODERATE',
    warningHindi: 'Dhyaan dein! Paracetamol aur Combiflam dono mein pain relief salt hai, double dose se liver par asar ho sakta hai.',
    warningEnglish: 'Moderate Risk: Potential NSAID / Acetaminophen overlapping dose hazard.',
    clinicalRisk: 'Hepatotoxicity & Liver Stress',
  },
];

export function checkDrugInteractions(existingMedicines: string[], newMedicine: string): DrugConflict | null {
  const normNew = newMedicine.toLowerCase().trim();

  for (const existing of existingMedicines) {
    const normExist = existing.toLowerCase().trim();

    const conflict = KNOWN_DRUG_CONFLICTS.find((c) => {
      const match1 = normNew.includes(c.drugA) && normExist.includes(c.drugB);
      const match2 = normNew.includes(c.drugB) && normExist.includes(c.drugA);
      return match1 || match2;
    });

    if (conflict) return conflict;
  }

  return null;
}