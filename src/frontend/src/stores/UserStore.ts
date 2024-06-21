import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type User from '../models/User.ts'

export const useUserStore = create(
  subscribeWithSelector(set => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
    // Initialize the store with the user from localStorage if it exists
    init: () => {
      const user = localStorage.getItem('user')
      if (user)
        set({ user: JSON.parse(user) })
    },
  })),
)

useUserStore.subscribe(
  state => state.user,
  (user) => {
    if (user)
      localStorage.setItem('user', JSON.stringify(user))
    else
      localStorage.removeItem('user')
  },
)

useUserStore.getState().init()
