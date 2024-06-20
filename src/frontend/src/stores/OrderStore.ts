import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const useOrderStore = create(
  subscribeWithSelector((set) => ({
    email: '',
    transactionsId: '',
    price: 0,
    currentOrder: null,

    addOrder: async (newOrder: Order) => {
      console.log(newOrder, 'adding order')

      const response = await fetch('/api/orderapi/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      })

      if (response.ok) {
        const item = await response.json()
        console.log(item, 'added order')
        set({ currentOrder: item })
      } else {
        console.log('Blad dodawania zamowienia')
      }
    },

    setEmail: (email: string) => set({ email }),
    setTransId: (id: string) => set({ transactionsId: id }),
    setPrice: (price: number) => set({ price }),
    setCurrentOrder: (order: Order) => set({ currentOrder: order }),

    init: () => {
      set({ email: '', transactionsId: '', amount: 0 })
    },
  })),
)

useOrderStore.getState().init()
