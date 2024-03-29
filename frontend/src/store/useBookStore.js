import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookStore = create(
  persist(
    (set) => ({
      book: {},
      setBook: (Book) => {
        set({ book: Book });
      },
      setBook2: (Book) => {
        set({ book: Book });
      },
    }),
    {
      name: "book-storage", // 로컬 스토리지에 저장될 때 사용될 키 이름
      getStorage: () => localStorage, // 사용할 스토리지 종류를 지정 (여기서는 localStorage)
    }
  )
);

export default useBookStore;
