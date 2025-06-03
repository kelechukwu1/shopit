import { create } from 'zustand';
import { Product } from './productStore';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getItemsCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addToCart: (product: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.product.id === product.id);

        if (existingItem) {
            set({
                items: currentItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            });
        } else {
            set({ items: [...currentItems, { product, quantity: 1 }] });
        }
    },
    removeFromCart: (productId: string) => {
        set({
            items: get().items.filter(item => item.product.id !== productId)
        });
    },
    updateQuantity: (productId: string, quantity: number) => {
        const currentItems = get().items;
        if (quantity <= 0) {
            set({
                items: currentItems.filter(item => item.product.id !== productId)
            });
        } else {
            set({
                items: currentItems.map(item =>
                    item.product.id === productId ? { ...item, quantity } : item
                )
            });
        }
    },
    clearCart: () => {
        set({ items: [] });
    },
    getCartTotal: () => {
        return get().items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    },
    getItemsCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
    }
}));