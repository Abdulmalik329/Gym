export interface User {
    id: number | string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: 'SUPER_ADMIN' | 'MANAGER' | 'MEMBER' | string;
    is_active: boolean;
    gym_id?: number | null;
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