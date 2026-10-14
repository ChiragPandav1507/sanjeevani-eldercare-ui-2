export interface MedicineItem {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

export interface UserProfile {
  name: string;
  age: string;
  city: string;
  avatar: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Shanti Devi',
  age: '72',
  city: 'Delhi',
  avatar: '👵',
};

const DEFAULT_MEDS: MedicineItem[] = [
  { id: 1, name: 'Paracetamol 500 mg', dosage: '1-0-1 (After Food)', time: '8:00 AM', taken: true },
  { id: 2, name: 'Amlodipine 5 mg', dosage: '1-0-0 (Morning)', time: '8:00 AM', taken: false },
  { id: 3, name: 'Metformin 500 mg', dosage: '1-0-1 (After Food)', time: '8:00 AM', taken: false },
];

export const getStoredProfile = (): UserProfile => {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const data = localStorage.getItem('sanjeevani_user_profile');
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const setStoredProfile = (profile: Partial<UserProfile>) => {
  if (typeof window === 'undefined') return;
  const current = getStoredProfile();
  const updated = { ...current, ...profile };
  localStorage.setItem('sanjeevani_user_profile', JSON.stringify(updated));
};

export const getStoredMeds = (): MedicineItem[] => {
  if (typeof window === 'undefined') return DEFAULT_MEDS;
  try {
    const data = localStorage.getItem('sanjeevani_meds');
    return data ? JSON.parse(data) : DEFAULT_MEDS;
  } catch {
    return DEFAULT_MEDS;
  }
};

export const setStoredMeds = (meds: MedicineItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sanjeevani_meds', JSON.stringify(meds));
};

export const getStoredWater = (): number => {
  if (typeof window === 'undefined') return 4;
  try {
    const data = localStorage.getItem('sanjeevani_water');
    return data ? Number(data) : 4;
  } catch {
    return 4;
  }
};

export const setStoredWater = (glasses: number) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sanjeevani_water', String(glasses));
};