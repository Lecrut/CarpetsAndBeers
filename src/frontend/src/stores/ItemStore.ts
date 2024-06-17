import create from 'zustand';
import Item from '../models/Item';
import { subscribeWithSelector } from 'zustand/middleware';

export interface CartItem {
  item: Item,
  quantity: number,
}

export const useItemStore = create(
    subscribeWithSelector((set) => ({
      items: [],
      wishList: [],
      shoppingCart: [],
      removeItem: async (itemId: number) => {
        const response = await fetch(`/api/itemapi/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          set((state) => ({ items: state.items.filter((item: Item) => item.id !== itemId) }));
        } else {
          console.log('Nie usunięto produktu');
        }
      },
      editItem: async (itemId: number, updatedItem: Item) => {
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
            items: state.items.map((item: Item) =>
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
      addItem: async (newItem: Item) => {
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
      addToWishList: (wishedItem: Item) => {
        set((state) => {
          const isItemInWishList = state.wishList.some((item: Item) => item.id === wishedItem.id);
          if (!isItemInWishList) {
            return { wishList: [...state.wishList, wishedItem] };
          } else {
            return { wishList: [...state.wishList] };
          }
        });
      },
      removeFromWishList: (wishedItem: Item) => {
        set((state) => ({wishList: state.wishList.filter((i: Item) => i.id !== wishedItem.id)}));
      },
      increaseAmountInShoppingCart: (product: Item) => {
        set((state) => {
          const isItemInCart = state.shoppingCart.findIndex((item: CartItem) => item.item.id === product.id);
          if (isItemInCart !== -1) {
            const newCart = [...state.shoppingCart]
            newCart[isItemInCart].quantity += 1
            return { shoppingCart: [...newCart]}
          }
          return { shoppingCart: [...state.shoppingCart] }
        });
      },
      decreaseAmountInShoppingCart: (product: Item) => {
        set((state) => {
          const isItemInCart = state.shoppingCart.findIndex((item: CartItem) => item.item.id === product.id);
          if (isItemInCart !== -1 && state.shoppingCart[isItemInCart].quantity === 1) {
            return {shoppingCart: state.shoppingCart.filter((i: CartItem) => i.item.id !== product.id)}
          }
          else if (isItemInCart !== -1) {
            const newCart = [...state.shoppingCart]
            newCart[isItemInCart].quantity -= 1
            return { shoppingCart: [...newCart]}
          }
          return { shoppingCart: [...state.shoppingCart] }
        });
      },
      removeFromShoppingCart: (product: Item) => {
        set((state) => {
          const isItemInCart = state.shoppingCart.find((item: CartItem) => item.item.id === product.id);
          if (isItemInCart !== undefined) {
            return {shoppingCart: state.shoppingCart.filter((i: CartItem) => i.item.id !== product.id)}
          }
          return { shoppingCart: [...state.shoppingCart] }
        });
      },
      addToShoppingCart: (product: Item) => {
        set((state) => {
          const isItemInCart = state.shoppingCart.findIndex((item: CartItem) => item.item.id === product.id);
          if (isItemInCart === -1) {
            return { shoppingCart: [...state.shoppingCart, {item: product, quantity: 1}] };
          } else {
            state.increaseAmountInShoppingCart(product)
          }
          return { shoppingCart: [...state.shoppingCart] }
        });
      },
      init: () => {
        const items = localStorage.getItem('items');
        const wishList = localStorage.getItem('wishList');
        const shoppingCart = localStorage.getItem('shoppingCart');

        if (items) {
          set({ items: JSON.parse(items) });
        }
        if (wishList) {
          set({ wishList: JSON.parse(wishList) });
        }
        if (shoppingCart) {
          set({ shoppingCart: JSON.parse(shoppingCart) });
        }
      },
    })),
)

useItemStore.subscribe(
    (state) => state.items,
    (items) => {
      localStorage.setItem('items', JSON.stringify(items));
    }
);

useItemStore.subscribe(
    (state) => state.wishList,
    (wishList) => {
      localStorage.setItem('wishList', JSON.stringify(wishList));
    }
);

useItemStore.subscribe(
    (state) => state.shoppingCart,
    (shoppingCart) => {
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }
);

// Call init to initialize the store with values from localStorage
useItemStore.getState().init();
