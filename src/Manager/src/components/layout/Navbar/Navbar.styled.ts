import styled, { keyframes } from "styled-components";

/* ================= HEADER STYLES (YANGILANDI) ================= */
export const Header = styled.header`
  height: 72px;
  padding: 0 24px;
  background: #111418; /* Rasmga mos to'q fon */
  border-bottom: 1px solid #1f2937;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  z-index: 40;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// Sidebar ochib-yopish tugmasi
export const MenuTrigger = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: #fff;
    background: #1f2937;
  }
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #fff;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// Notification tugmasi (Rasmdagi kabi kvadrat va to'q)
export const IconButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #1f2937;
  border: 1px solid #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;

  &:hover {
    background: #374151;
    color: #fff;
    border-color: #4b5563;
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #111418;
`;

// Profil rasmi (faqat rasm)
export const ProfileTrigger = styled.div`
  cursor: pointer;
  border-radius: 50%;
  padding: 2px;
  border: 2px solid transparent;
  transition: border-color 0.2s;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const AvatarSmall = styled.div<{ $image?: string }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ $image }) =>
    $image ? `url(${$image}) center/cover` : "#374151"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #fff;
  font-size: 14px;
  border: 1px solid #374151;
`;

/* ================= ESKI STYLES (MODAL, DRAWER, INBOX UCHUN) ================= */
// Bu qism sizning eski kodingizdan olib qolindi, faqat ranglari yangi dizaynga moslandi.

const pop = keyframes`
  from { transform: translateY(10px) scale(.98); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 99;
`;

export const Drawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 90vw;
  height: 100vh;
  background: #111418;
  border-left: 1px solid #1f2937;
  padding: 28px;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
`;
export const AvatarLarge = styled(AvatarSmall)`
  width: 80px;
  height: 80px;
  font-size: 28px;
`;
export const DrawerName = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #fff;
`;
export const DrawerRole = styled.div`
  font-size: 14px;
  color: #94a3b8;
`;
export const DrawerHint = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #94a3b8;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 14px;
`;
export const InfoItem = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;
export const InfoLabel = styled.span`
  font-size: 13px;
  color: #94a3b8;
`;
export const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DrawerFooter = styled.div`
  margin-top: auto;
  display: flex;
  gap: 12px;
`;
export const LogoutButton = styled.button`
  width: 100%;
  padding: 14px 0;
  border-radius: 14px;
  border: none;
  background: #ef4444;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #dc2626;
  }
`;
export const GhostButton = styled.button`
  width: 100%;
  padding: 14px 0;
  border-radius: 14px;
  border: 1px solid #374151;
  background: transparent;
  color: #e5e7eb;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #1f2937;
  }
`;

// Modal Styles
export const Modal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
`;
export const ModalCard = styled.div`
  width: 980px;
  max-width: 96vw;
  background: #111418;
  border: 1px solid #374151;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: ${pop} 160ms ease-out;
`;
export const ModalHead = styled.div`
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid #374151;
  background: #1f2937;
`;
export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 900;
  color: #fff;
`;
export const HeadRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid #374151;
  background: #111418;
  color: #e5e7eb;
  cursor: pointer;
  &:hover {
    background: #374151;
  }
`;
export const Tabs = styled.div`
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  border-radius: 14px;
  border: 1px solid #374151;
  background: #111418;
`;
export const Tab = styled.button<{ $active?: boolean }>`
  border: 0;
  cursor: pointer;
  padding: 9px 12px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 12px;
  color: ${({ $active }) => ($active ? "#fff" : "#9ca3af")};
  background: ${({ $active }) => ($active ? "#3b82f6" : "transparent")};
  &:hover {
    background: ${({ $active }) => ($active ? "#2563eb" : "#1f2937")};
  }
`;

export const ModalBody = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 14px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
export const Block = styled.div`
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 16px;
  padding: 14px;
`;
export const BlockTitle = styled.div`
  font-size: 12px;
  letter-spacing: 0.4px;
  font-weight: 900;
  color: #fff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  color: #e5e7eb;
  background: rgba(59, 130, 246, 0.16);
  border: 1px solid rgba(59, 130, 246, 0.22);
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid #374151;
  background: #111418;
  color: #e5e7eb;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #3b82f6;
  }
`;
export const Textarea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid #374151;
  background: #111418;
  color: #e5e7eb;
  font-size: 14px;
  outline: none;
  resize: vertical;
  &:focus {
    border-color: #3b82f6;
  }
`;
export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid #374151;
  background: #111418;
  color: #e5e7eb;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #3b82f6;
  }
`;
export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;
export const Small = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.35;
`;
export const ErrorText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #fecaca;
  background: rgba(239, 68, 68, 0.14);
  border: 1px solid rgba(239, 68, 68, 0.22);
  padding: 10px 12px;
  border-radius: 14px;
`;
export const SuccessText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #bbf7d0;
  background: rgba(34, 197, 94, 0.14);
  border: 1px solid rgba(34, 197, 94, 0.22);
  padding: 10px 12px;
  border-radius: 14px;
`;

export const Footer = styled.div`
  padding: 14px 16px;
  border-top: 1px solid #374151;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: #1f2937;
`;
export const PrimaryBtn = styled.button`
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: #3b82f6;
  color: #fff;
  font-weight: 900;
  cursor: pointer;
  &:hover {
    filter: brightness(1.05);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
export const SecondaryBtn = styled.button`
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid #374151;
  background: #111418;
  color: #e5e7eb;
  font-weight: 900;
  cursor: pointer;
  &:hover {
    background: #374151;
  }
`;

// Inbox Styles
export const InboxSearch = styled.div`
  display: flex;
  gap: 10px;
`;
export const InboxList = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 440px;
  overflow: auto;
  padding-right: 4px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 999px;
  }
`;
export const InboxItem = styled.button<{ $unread?: boolean }>`
  text-align: left;
  border: 1px solid #374151;
  background: ${({ $unread }) =>
    $unread ? "rgba(59,130,246,.10)" : "#111418"};
  border-radius: 16px;
  padding: 12px 12px;
  cursor: pointer;
  transition: all 0.12s ease;
  &:hover {
    transform: translateY(-1px);
    border-color: #3b82f6;
  }
`;
export const InboxTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
export const InboxTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  strong {
    font-size: 13px;
    color: #fff;
    font-weight: 900;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
export const UnreadDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
  flex: 0 0 auto;
`;
export const TypeChip = styled.span`
  font-size: 11px;
  font-weight: 900;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #374151;
  color: #cbd5e1;
  background: #1f2937;
  flex: 0 0 auto;
`;
export const InboxMeta = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.35;
  white-space: pre-line;
`;

// Member List Styles
export const MemberList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 260px;
  overflow: auto;
  padding-right: 4px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 999px;
  }
`;
export const MemberItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #111418;
  border: 1px solid #374151;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.12s;
  &:hover {
    background: #1f2937;
    border-color: #3b82f6;
  }
`;
export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
`;
export const MemberMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;
export const MemberName = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const MemberSub = styled.div`
  font-size: 12px;
  color: #94a3b8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* ================= ESKIDAN QOLGAN QISMLAR UCHUN EMPTY PLACEHOLDERS (Xatolik bermasligi uchun) ================= */
// Bular eski Navbar.tsx da ishlatilgan, lekin yangi dizaynda o'chirilgan bo'lsa ham,
// agar siz logikani 100% saqlagan bo'lsangiz, importlar xato bermasligi kerak.
// Quyidagilar yangi dizaynda ishlatilmaydi, lekin import xatosini oldini olish uchun qoldirdim:
export const SearchBox = styled.div`
  display: none;
`;
export const SearchIcon = styled.div`
  display: none;
`;
export const SearchInput = styled.input`
  display: none;
`;
export const UserInfo = styled.div`
  display: none;
`;
export const Name = styled.div`
  display: none;
`;
export const Role = styled.div`
  display: none;
`;
