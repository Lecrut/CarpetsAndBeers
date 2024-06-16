import create from 'zustand';
import Item from '../models/Item';

interface ItemStoreState {
  items: Item[];
  removeItem: (itemId: number) => void;
  editItem: (itemId: number, updatedItem: Partial<Item>) => void;
  fetchItems: () => Promise<void>;
  addItem: (newItem: Item) => Promise<void>;
}

export const useItemStore = create<ItemStoreState>((set) => ({
  items: [],
  removeItem: (itemId) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== itemId) })),
  editItem: (itemId, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      ),
    })),
  fetchItems: async () => {
    const response = await fetch('/api/itemapi/getAllItems', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const fetchedData = await response.json();
      set({ items: fetchedData });
    } else {
      console.log('Nie znaleziono produktów');
    }
  },
  addItem: async (newItem) => {
    const response = await fetch('/api/itemapi/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      const item = await response.json();
      set((state) => ({ items: [...state.items, item] }));
    } else {
      console.log('Nie dodano produktu');
    }
  },
}));
