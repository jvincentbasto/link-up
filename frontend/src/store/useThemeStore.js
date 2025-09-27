import { create } from "zustand";

const keys = {
  theme: "streamMeTheme",
};

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem(keys.theme) || "coffee",
  setTheme: (theme) => {
    localStorage.setItem(keys.theme, theme);
    set({ theme });
  },
}));
