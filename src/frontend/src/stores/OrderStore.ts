import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const useOrderStore = create(
  subscribeWithSelector((set) => ({
    email: '',
    transactionsId: '',
    price: 0,

    setEmail: (email: string) => set({ email }),
    setTransId: (id: string) => set({ transactionsId: id }),
    setPrice: (price: number) => set({ price }),

    init: () => {
      set({ email: '', transactionsId: '', amount: 0 })
    },
  })),
)

useOrderStore.getState().init()
