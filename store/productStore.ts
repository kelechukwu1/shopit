import { create } from 'zustand';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    inStock: boolean;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    getProduct: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [
        {
            id: '1',
            name: 'Apple iPhone 16 128GB|Teal',
            price: 700,
            image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Smartphones',
            description: 'This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers. There will be no visible cosmetic imperfections when held at an arm\'s length.',
            inStock: true
        },
        {
            id: '2',
            name: 'M4 Macbook Air 13" 256GB|Sky blue',
            price: 1000,
            image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Laptops',
            description: 'The new MacBook Air with M4 chip offers incredible performance with up to 18 hours of battery life, a stunning Liquid Retina display, and enhanced camera quality.',
            inStock: true
        },
        {
            id: '3',
            name: 'Google Pixel 9A 128GB|Iris',
            price: 499,
            image: 'https://images.pexels.com/photos/7014395/pexels-photo-7014395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Smartphones',
            description: 'The Google Pixel 9A features an incredible camera system, clean Android experience, and all-day battery life in a compact design.',
            inStock: true
        },
        {
            id: '4',
            name: 'Apple Airpods 4 Active Noise Cancellation',
            price: 129,
            image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Accessories',
            description: 'Experience immersive sound with the new Apple AirPods 4 featuring active noise cancellation, adaptive EQ, and spatial audio with dynamic head tracking.',
            inStock: true
        }
    ],
    loading: false,
    error: null,
    fetchProducts: async () => {
        // In a real app, this would fetch from an API
        set({ loading: true, error: null });
        try {
            // Simulate API fetch delay
            await new Promise(resolve => setTimeout(resolve, 500));
            // Products are already loaded in the initial state
            set({ loading: false });
        } catch (error) {
            console.warn(error)
            set({ loading: false, error: 'Failed to fetch products' });
        }
    },
    getProduct: (id: string) => {
        return get().products.find(product => product.id === id);
    }
}));