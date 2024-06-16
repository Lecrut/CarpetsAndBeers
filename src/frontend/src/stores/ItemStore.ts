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
  removeItem: async (itemId) => {
    // Call your API to delete the item
    const response = await fetch(`/api/itemapi/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If deletion is successful, update the state to remove the item
      set((state) => ({ items: state.items.filter((item) => item.id !== itemId) }));
    } else {
      console.log('Nie usunięto produktu');
    }
  },

  editItem: async (itemId, updatedItem) => {
    // Call your API to update the item
    const response = await fetch(`/api/itemapi/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });

    if (response.ok) {
      const item = await response.json();
      // If update is successful, update the state to include the updated item
      set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, ...updatedItem } : item
        ),
      }));
    } else {
      console.log('Nie zaktualizowano produktu');
    }
  },
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
