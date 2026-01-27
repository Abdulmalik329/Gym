/**
 * Tarif rejasining asosiy turi
 */
export interface MembershipPlan {
    id: number | string;
    gym_id: number | string;
    name: string;
    description: string;
    tag: string;
    features: string[];
    type: 'TIME_BASED' | 'SESSION_BASED';
    duration_days: number;
    session_count: number;
    price: number;
    isActive: boolean;
}

/**
 * Tasdiqlash va bildirishnoma modali uchun holat turi
 */
export interface ConfirmModalState {
    isOpen: boolean;
    title: string;
    message: string;
    type: 'info' | 'danger' | 'warning' | 'success';
    onConfirm: (() => void) | null;
}

/**
 * Tema (dizayn) sozlamalari interfeysi
 */
export interface ThemeSettings {
    isDarkMode: boolean;
    bg: string;
    card: string;
    input: string;
    subText: string;
    border?: string;
    tableHeader?: string;
    rowHover?: string;
}

/**
 * Forma ma'lumotlari uchun qisman (Partial) tur
 * (Yaratish va tahrirlashda ishlatiladi)
 */
export type PlanFormData = Partial<MembershipPlan>;