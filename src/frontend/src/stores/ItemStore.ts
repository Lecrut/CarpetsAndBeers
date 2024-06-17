import create from 'zustand';
import Item from '../models/Item';

export interface CartItem {
  item: Item,
  quantity: number,
}
interface ItemStoreState {
  items: Item[];
  wishList: Item[];
  shoppingCart: CartItem[];
  removeItem: (itemId: number) => void;
  editItem: (itemId: number, updatedItem: Partial<Item>) => void;
  fetchItems: () => Promise<void>;
  addItem: (newItem: Item) => Promise<void>;
  addToWishList: (wishedItem: Item) => void;
  removeFromWishList: (wishedItem: Item) => void;
  increaseAmountInShoppingCart: (product: Item) => void;
  decreaseAmountInShoppingCart: (product: Item) => void;
  removeFromShoppingCart: (product: Item) => void;
  addToShoppingCart: (product: Item) => void;
}

export const useItemStore = create<ItemStoreState>((set) => ({
  items: [],
  wishList: [],
  shoppingCart: [],
  removeItem: async (itemId) => {
    const response = await fetch(`/api/itemapi/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      set((state) => ({ items: state.items.filter((item) => item.id !== itemId) }));
    } else {
      console.log('Nie usunięto produktu');
    }
  },

  editItem: async (itemId, updatedItem) => {
    const response = await fetch(`/api/itemapi/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });

    if (response.ok) {
      const item = await response.json();
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
  addToWishList: (wishedItem) => {
    set((state) => {
      const isItemInWishList = state.wishList.some((item) => item.id === wishedItem.id);
      if (!isItemInWishList) {
        return { wishList: [...state.wishList, wishedItem] };
      } else {
        return { wishList: [...state.wishList] };
      }
    });
  },
  removeFromWishList: (wishedItem) => {
    set((state) => ({wishList: state.wishList.filter((i) => i.id !== wishedItem.id)}));
  },
  increaseAmountInShoppingCart: (product) => {
    set((state) => {
      const isItemInCart = state.shoppingCart.findIndex((item) => item.item.id === product.id);
      if (isItemInCart !== -1) {
        const newCart = [...state.shoppingCart]
        newCart[isItemInCart].quantity += 1
        return { shoppingCart: [...newCart]}
      }
      return { shoppingCart: [...state.shoppingCart] }
    });
  },
  decreaseAmountInShoppingCart: (product) => {
    set((state) => {
      const isItemInCart = state.shoppingCart.findIndex((item) => item.item.id === product.id);
      if (isItemInCart !== -1 && state.shoppingCart[isItemInCart].quantity === 1) {
        return {shoppingCart: state.shoppingCart.filter((i) => i.item.id !== product.id)}
      }
      else if (isItemInCart !== -1) {
        const newCart = [...state.shoppingCart]
        newCart[isItemInCart].quantity -= 1
        return { shoppingCart: [...newCart]}
      }
      return { shoppingCart: [...state.shoppingCart] }
    });
  },
  removeFromShoppingCart: (product) => {
    set((state) => {
      const isItemInCart = state.shoppingCart.find((item) => item.item.id === product.id);
      if (isItemInCart !== undefined) {
        return {shoppingCart: state.shoppingCart.filter((i) => i.item.id !== product.id)}
      }
      return { shoppingCart: [...state.shoppingCart] }
    });
  },
  addToShoppingCart: (product) => {
    set((state) => {
      const isItemInCart = state.shoppingCart.findIndex((item) => item.item.id === product.id);
      if (isItemInCart === -1) {
        return { shoppingCart: [...state.shoppingCart, {item: product, quantity: 1}] };
      } else {
        state.increaseAmountInShoppingCart(product)
      }
      return { shoppingCart: [...state.shoppingCart] }
    });
  },
}));
