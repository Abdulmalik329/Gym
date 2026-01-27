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

export interface UserFormData {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    birthDate: string;   // Mana bu yerda xatolik chiqayotgan edi
    weight: string | number;
    height: string | number;
    address: string;
    bio: string;
    gym_id: string | number;
    image_url: string;
}

export interface ConfirmModalState {
    isOpen: boolean;
    title: string;
    message: string;
    type: 'info' | 'danger' | 'warning' | 'success';
    onConfirm: (() => void) | null;
}