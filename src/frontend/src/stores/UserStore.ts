import { create } from 'zustand'
import User from '../models/User'
import zukeeper from 'zukeeper'

type UserStore = {
  User: User | null
}

export const useUserStore = create<UserStore>(
  zukeeper((set) => ({
    User: null,
    setUser: (user: User) => set({ User: user }),
  })),
)
