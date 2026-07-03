import { create } from 'zustand';

interface UiStoreState {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

export const useUiStore = create<UiStoreState>((set) => ({
  isSearchOpen: false,
  setIsSearchOpen: (open) => set({ isSearchOpen: open })
}));
