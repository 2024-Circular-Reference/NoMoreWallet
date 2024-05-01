import { create } from 'zustand';

interface IViewModalState {
    isOpen: boolean;
    data: {
        label: string;
        value: object;
    };
    openModal: (data: { label: string; value: object }) => void;
    closeModal: () => void;
}

export const useViewModalStore = create<IViewModalState>((set) => ({
    isOpen: false,
    data: {
        label: '',
        value: {},
    },
    openModal: (data) => set(() => ({ isOpen: true, data })),
    closeModal: () =>
        set(() => ({ isOpen: false, data: { label: '', value: {} } })),
}));
