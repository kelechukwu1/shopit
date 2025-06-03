import { create } from 'zustand';
import { Product } from './productStore';

interface FavoriteState {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
    favorites: [],
    addToFavorites: (product: Product) => {
        const currentFavorites = get().favorites;
        const isAlreadyFavorite = currentFavorites.some(fav => fav.id === product.id);

        if (!isAlreadyFavorite) {
            set({ favorites: [...currentFavorites, product] });
        }
    },
    removeFromFavorites: (productId: string) => {
        set({
            favorites: get().favorites.filter(fav => fav.id !== productId)
        });
    },
    isFavorite: (productId: string) => {
        return get().favorites.some(fav => fav.id === productId);
    }
}));