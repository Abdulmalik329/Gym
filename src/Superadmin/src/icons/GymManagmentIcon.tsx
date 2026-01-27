import React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  
  rect {
    transition: fill 0.2s ease-in-out;
  }
`;

const GymManagmentIcon: React.FC<React.SVGAttributes<SVGElement> & { size?: number }> = ({
    size = 24,
    ...props
}) => {
    return (
        <StyledSvg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x="2" y="9" width="4" height="6" rx="1" fill="currentColor" />
            <rect x="18" y="9" width="4" height="6" rx="1" fill="currentColor" />
            <rect x="6" y="11" width="12" height="2" fill="currentColor" />
            <rect x="5" y="7" width="2" height="10" rx="1" fill="currentColor" />
            <rect x="17" y="7" width="2" height="10" rx="1" fill="currentColor" />
        </StyledSvg>
    );
};

export default GymManagmentIcon;