import type { ReactNode } from 'react';

export interface AdminData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    image_url: string | null;
    birthDate?: string | null;
    weight?: number | null;
    height?: number | null;
    address?: string | null;
    bio?: string | null;
    gymId?: number | null;
    isActive?: boolean;
}

export interface DetailFieldProps {
    label: string;
    icon: ReactNode;
    value: string;
    isEditing: boolean;
    onChange: (val: string) => void;
    autoFocus?: boolean;
}

export interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface ProfileUpdatePayload {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    image_url: string | null;
    birthDate: string | null;
    weight: number | null;
    height: number | null;
    address: string | null;
    bio: string | null;
    gym_id: number | null;
    isActive: boolean;
}