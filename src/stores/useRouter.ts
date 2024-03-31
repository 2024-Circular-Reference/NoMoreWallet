import { create } from 'zustand';
import type { Pathname } from '@src/types/router';

interface RouterState {
  pathname: Pathname;
  params: string;
  setPathname: (pathname: Pathname) => void;
}

export const useRouter = create<RouterState>(set => ({
  pathname: '/',
  params: '',
  setPathname: (pathname: Pathname) => set({ pathname, params: pathname.slice(1) }),
}));
