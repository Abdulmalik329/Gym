import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1265px;
  width: 100%;
  padding: 40px 16px;
  margin: 0 auto;
  color: #fff;
`;

export const Header = styled.div`
  height: 280px;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438");
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  position: relative;
`;

export const AvatarContainer = styled.div`
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 5px solid #0b1620;
  background: #000;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Content = styled.div`
  margin-top: 80px;
  padding: 40px;
  background: #0f2233;
  border-radius: 24px;
`;

// --- MODAL STYLES ---
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

export const ModalContent = styled.div`
  background: #162f45;
  padding: 35px;
  border-radius: 24px;
  width: 95%;
  max-width: 750px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #2f80ed44;
`;

export const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #2f80ed;
  }

  label {
    margin-top: 12px;
    background: #2f80ed;
    color: white;
    padding: 6px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
  }

  input {
    display: none;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const Item = styled.div`
  background: #1c3a57;
  padding: 18px;
  border-radius: 15px;
  span {
    font-size: 12px;
    color: #8fa6bc;
  }
  p {
    margin-top: 5px;
    font-weight: 600;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
  label {
    font-size: 13px;
    color: #8fa6bc;
  }
  input {
    background: #0f2233;
    border: 1px solid #25486a;
    padding: 12px;
    border-radius: 10px;
    color: white;
    outline: none;
    &:focus {
      border-color: #2f80ed;
    }
  }
`;

export const Button = styled.button<{ outline?: boolean; danger?: boolean }>`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: ${(props) =>
    props.danger ? "#ff4d4d" : props.outline ? "transparent" : "#2f80ed"};
  color: #fff;
  border: ${(props) => (props.outline ? "1px solid #2f80ed" : "none")};
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
  }
`;
