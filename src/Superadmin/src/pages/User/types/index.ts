export interface User {
    id: number | string;
    firstName: string; // first_name emas
    lastName: string;  // last_name emas
    email: string;
    phone: string;
    role: 'SUPER_ADMIN' | 'MANAGER' | 'MEMBER' | string;
    isActive: boolean; // is_active emas
    gymId?: number | null; // gym_id emas
}


export interface Gym {
    id: number | string;
    name: string;
}

// types.ts faylida
export interface UserFormData {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    gym_id: string;
    birthDate?: string;
    weight?: string;
    height?: string;
    address?: string;
    bio?: string;
    image_url?: string;
}
export interface ConfirmModalState {
    isOpen: boolean;
    title: string;
    message: string;
    type: 'info' | 'danger' | 'warning' | 'success';
    onConfirm: (() => void) | null;
}