import { create } from 'zustand';
import type { AuthUser } from '@mfe/contracts';

type AuthState = {
  user: AuthUser | null;
  setUser: (u: AuthUser | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));
