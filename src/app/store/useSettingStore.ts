// store/useSettingStore.ts
import { create } from "zustand";

interface SettingState {
    alarmEnabled: boolean;
    toggleAlarm: () => void;
}

export const useSettingStore = create<SettingState>(set => ({
    alarmEnabled: true,
    toggleAlarm: () => set(state => ({ alarmEnabled: !state.alarmEnabled })),
}));
