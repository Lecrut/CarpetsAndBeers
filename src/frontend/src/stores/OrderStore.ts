import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import Order from '../models/Order'

export const useOrderStore = create(
  subscribeWithSelector((set) => ({
    email: '',
    transactionsId: '',
    price: 0,
    // currentOrder: null,
    currentOrderId: '',

    addOrder: async (newOrder: Order) => {
      const response = await fetch('/api/orderapi/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      })

      if (response.ok) {
        const item = await response.json()
        set({ currentOrderId: item.id })
        return item
      } else {
        console.log('Blad dodawania zamowienia')
      }
    },

    setEmail: (email: string) => set({ email }),
    setTransId: (id: string) => set({ transactionsId: id }),
    setPrice: (price: number) => set({ price }),
    setCurrentOrder: async (order: Order) => set({ currentOrder: order }),

    init: () => {
      set({ email: '', transactionsId: '', amount: 0, currentOrderId: '' })
    },
  })),
)
