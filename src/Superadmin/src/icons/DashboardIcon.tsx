import React from 'react';
import styled from 'styled-components';

interface StyledSvgProps {
    $color?: string;
    $hoverColor?: string;
}

interface DashboardIconProps extends React.SVGAttributes<SVGElement> {
    size?: number;
    color?: string;
    hoverColor?: string;
}

const StyledSvg = styled.svg<StyledSvgProps>`
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  
  rect {
    fill: ${props => props.$color || '#2196F3'};
    transition: fill 0.2s ease-in-out;
  }
`;

const DashboardIcon: React.FC<DashboardIconProps> = ({
    size = 24,
    color,
    hoverColor,
    ...props
}) => {
    return (
        <StyledSvg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            $color={color}      
            $hoverColor={hoverColor}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x="3" y="3" width="8" height="11" rx="1.5" />
            <rect x="13" y="3" width="8" height="7" rx="1.5" />
            <rect x="3" y="16" width="8" height="5" rx="1.5" />
            <rect x="13" y="12" width="8" height="9" rx="1.5" />
        </StyledSvg>
    );
};

export default DashboardIcon;