export interface Gym {
    id: number | string;
    name: string;
    address: string;
    phones: string;
    phones2?: string;
    social_tg?: string;
    social_ins?: string;
}

export interface GymFormData {
    name: string;
    address: string;
    phones: string;
    phones2: string;
    social_tg: string;
    social_ins: string;
}