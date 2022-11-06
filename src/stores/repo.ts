import create from 'zustand';

type Store = {
  selectedRepo: string;
  setSelectedRepo: (url: string) => void;
};

export const useSelectRepo = create<Store>((set) => ({
  selectedRepo: '',
  setSelectedRepo: (url: string) => {
    set({ selectedRepo: url });
  },
}));
