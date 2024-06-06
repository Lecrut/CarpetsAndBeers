import { create } from 'zustand'
import User from '../models/User'
import zukeeper from 'zukeeper'

type UserStore = {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>(
  zukeeper((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
  })),
)

window.store = useUserStore
