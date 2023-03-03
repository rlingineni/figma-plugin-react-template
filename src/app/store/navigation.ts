import { create } from "zustand";

type PluginPage = "Page 1" | "Page 2";
type NavigationStore = {
  currentPage: PluginPage;
  setCurrentPage: (page: PluginPage) => void;
};

const useNavigationStore = create<NavigationStore>((set, store) => ({
  currentPage: "Page 1",
  setCurrentPage: (page: PluginPage) => {
    set({ currentPage: page });
  },
}));

export default useNavigationStore;
