import { create } from 'zustand';
import Item from '../models/Item'
import CategoryType from '../models/Item'

interface ItemStoreState {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (itemId: number) => void;
  editItem: (itemId: number, updatedItem: Partial<Item>) => void;
}

const initialItemStoreState: ItemStoreState = {
  items: [],
  addItem: (item) => {},
  removeItem: (itemId) => {},
  editItem: (itemId, updatedItem) => {},
};

export const useItemStore = create<ItemStoreState>((set) => ({
  ...initialItemStoreState,
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== itemId) })),
  editItem: (itemId, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      ),
    })),
}));
