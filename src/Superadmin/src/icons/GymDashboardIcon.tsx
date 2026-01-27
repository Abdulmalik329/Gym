import React from 'react';

/**
 * DumbbellIcon komponenti uchun xususiyatlar interfeysi
 */
interface DumbbellIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
}

/**
 * Gantel (Dumbbell) ikonka komponenti.
 * Tanlangan SVG kodi asosida tayyorlangan.
 */
const DumbbellIcon: React.FC<DumbbellIconProps> = ({
    size = 24,
    color = 'currentColor',
    className = '',
    ...props
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            {/* Markaziy qism (dastak) */}
            <rect
                x="2"
                y="11"
                width="20"
                height="2"
                rx="1"
                fill={color}
            />

            {/* Chap tomondagi toshlar */}
            <rect
                x="6"
                y="5"
                width="2.5"
                height="14"
                rx="1"
                fill={color}
            />
            <rect
                x="3"
                y="7"
                width="2"
                height="10"
                rx="0.8"
                fill={color}
            />

            {/* O'ng tomondagi toshlar */}
            <rect
                x="15.5"
                y="5"
                width="2.5"
                height="14"
                rx="1"
                fill={color}
            />
            <rect
                x="19"
                y="7"
                width="2"
                height="10"
                rx="0.8"
                fill={color}
            />
        </svg>
    );
};

export default DumbbellIcon;

// Ishlatishga misol:
// <DumbbellIcon size={48} color="#3b82f6" />