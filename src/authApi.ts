import { useAuthStore } from './AuthStore';
import type { AuthApi, AuthSnapshot, AuthUser } from '@mfe/contracts';

function snapshot(): AuthSnapshot {
  const user = useAuthStore.getState().user;
  return { user, isAuthenticated: !!user };
}

export const authApi: AuthApi = {
  async login(email: string, password: string) {
    // FAKE login: troque por chamada real à sua API/IdP
    await new Promise((r) => setTimeout(r, 300));
    const user: AuthUser = {
      id: 'u_' + Math.random().toString(36).slice(2),
      name: email.split('@')[0],
      email,
    };
    useAuthStore.getState().setUser(user);
    return user;
  },
  async logout() {
    await new Promise((r) => setTimeout(r, 100));
    useAuthStore.getState().setUser(null);
  },
  getSnapshot() {
    return snapshot();
  },
  subscribe(listener) {
    // Recalcula snapshot a cada mudança de user
    const unsub = useAuthStore.subscribe(() => listener(snapshot()));
    return unsub;
  },
};

export default authApi;
