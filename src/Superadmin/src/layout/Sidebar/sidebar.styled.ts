import styled from "styled-components";

export const LeftColumn = styled.div`
    background-color: #111418;
    color: white;
    width: 18%;
    height: 100%;

    .gymlogo {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }
`

export const GymLogoBox = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding-left: 25px;
    margin: 20px 0;
    p {
        color: #9DABB9;
        font-size: 16px;
        font-weight: 600;
    }
`

export const LeftColNavigationBox = styled.div`
    padding: 0 10px;
`

export const NavigationItem = styled.div<{ $isActive?: boolean }>`
    display: flex;

    gap: 10px;

    align-items: center;

    border-radius: 5px;

    cursor: pointer;

    padding: 10px 15px;

    margin: 5px 0;;
    
    background-color: ${props => props.$isActive ? '#131F2D' : 'transparent'};
    
    svg rect {
        fill: ${props => props.$isActive ? '#2B8CEE' : '#93A2B7'} !important;
    }
    svg {
        color: ${props => props.$isActive ? '#2B8CEE' : '#93A2B7'} !important;
    }
    p {
        font-weight: 600;
        color: ${props => props.$isActive ? '#2B8CEE' : '#94A3B7'};
    }

    &:hover {
        background-color: ${props => props.$isActive ? '131F2D' : '#1a1d21'};
    }
`