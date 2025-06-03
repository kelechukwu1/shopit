import { create } from 'zustand';

export interface User {
    name: string;
    address: string;
    email: string;
    phone: string;
}

interface UserState {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateUserInfo: (userData: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: {
        name: 'John Doe',
        address: 'Umuezike Road, Oyo State',
        email: 'john.doe@example.com',
        phone: '+234 123 456 7890'
    },
    isLoggedIn: true,
    login: (userData: User) => {
        set({ user: userData, isLoggedIn: true });
    },
    logout: () => {
        set({ user: null, isLoggedIn: false });
    },
    updateUserInfo: (userData: Partial<User>) => {
        set(state => ({
            user: state.user ? { ...state.user, ...userData } : null
        }));
    }
}));