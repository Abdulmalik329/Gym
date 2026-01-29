import styled, { keyframes } from "styled-components";

/* =====================================================
   LAYOUT
===================================================== */

export const Header = styled.header`
  height: 72px;
  padding: 0 28px;
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* =====================================================
   LEFT
===================================================== */

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
`;

/* ================= SEARCH ================= */

export const SearchBox = styled.div`
  position: relative;
  width: 360px;

  @media (max-width: 980px) {
    display: none;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px 10px 42px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.sidebar};
  color: #e5e7eb;
  font-size: 14px;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
`;

/* =====================================================
   RIGHT
===================================================== */

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

/* ================= ICON BUTTON ================= */

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.sidebar};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e5e7eb;
  cursor: pointer;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.card};
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  font-size: 11px;
  font-weight: 900;
  border: 2px solid rgba(2, 6, 23, 0.75);
`;

/* =====================================================
   PROFILE TRIGGER
===================================================== */

export const ProfileTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const AvatarSmall = styled.div<{ $image?: string }>`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ $image }) =>
    $image ? `url(${$image}) center/cover` : "#1e293b"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #ffffff;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 520px) {
    display: none;
  }
`;

export const Name = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
`;

export const Role = styled.span`
  font-size: 12px;
  color: #94a3b8;
`;

/* =====================================================
   OVERLAY + DRAWER
===================================================== */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.58);
  backdrop-filter: blur(10px);
  z-index: 90;
`;

export const Drawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 92vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.card};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding: 28px;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

/* ================= DRAWER HEADER ================= */

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 18px;
`;

export const AvatarLarge = styled.div<{ $image?: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $image }) =>
    $image ? `url(${$image}) center/cover` : "#1e293b"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  position: relative;
`;

export const DrawerName = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
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

/* ================= INFO LIST ================= */

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 14px;
`;

export const InfoItem = styled.div`
  background: ${({ theme }) => theme.colors.sidebar};
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
  color: #ffffff;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* ================= FOOTER ================= */

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
  color: #ffffff;
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
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: #e5e7eb;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.sidebar};
  }
`;

/* =====================================================
   NOTIFICATION MODAL (INBOX + COMPOSE)
===================================================== */

const pop = keyframes`
  from { transform: translateY(10px) scale(.98); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
`;

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
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.45),
    0 1px 0 rgba(255, 255, 255, 0.03) inset;
  animation: ${pop} 160ms ease-out;
`;

export const ModalHead = styled.div`
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.85),
    rgba(2, 6, 23, 0)
  );
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 900;
  color: #ffffff;

  &::before {
    content: "🔔";
    display: inline-flex;
    width: 30px;
    height: 30px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    background: rgba(59, 130, 246, 0.18);
    border: 1px solid rgba(59, 130, 246, 0.25);
  }
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
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.55);
  color: #e5e7eb;
  cursor: pointer;

  &:hover {
    background: rgba(15, 23, 42, 0.85);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Tabs = styled.div`
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.14);
  background: rgba(2, 6, 23, 0.35);
`;

export const Tab = styled.button<{ $active?: boolean }>`
  border: 0;
  cursor: pointer;
  padding: 9px 12px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 12px;
  color: ${({ $active }) => ($active ? "#fff" : "#cbd5e1")};
  background: ${({ $active }) =>
    $active ? "rgba(59,130,246,.28)" : "transparent"};
  border: 1px solid
    ${({ $active }) => ($active ? "rgba(59,130,246,.35)" : "transparent")};

  &:hover {
    background: ${({ $active }) =>
      $active ? "rgba(59,130,246,.30)" : "rgba(15,23,42,.35)"};
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
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  padding: 14px;
`;

export const BlockTitle = styled.div`
  font-size: 12px;
  letter-spacing: 0.4px;
  font-weight: 900;
  color: #ffffff;
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
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.65);
  color: #e5e7eb;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: rgba(59, 130, 246, 0.6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.65);
  color: #e5e7eb;
  font-size: 14px;
  outline: none;
  resize: vertical;
  line-height: 1.45;

  &::placeholder {
    color: rgba(148, 163, 184, 0.75);
  }

  &:focus {
    border-color: rgba(59, 130, 246, 0.6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.65);
  color: #e5e7eb;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: rgba(148, 163, 184, 0.75);
  }

  &:focus {
    border-color: rgba(59, 130, 246, 0.6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
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
  border-top: 1px solid rgba(148, 163, 184, 0.16);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: rgba(2, 6, 23, 0.35);
`;

export const PrimaryBtn = styled.button`
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(59, 130, 246, 0.18);

  &:hover {
    filter: brightness(1.05);
  }

  &:active {
    transform: scale(0.99);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const SecondaryBtn = styled.button`
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.35);
  color: #e5e7eb;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: rgba(15, 23, 42, 0.6);
  }

  &:active {
    transform: scale(0.99);
  }
`;

/* ================= INBOX ================= */

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
    background: rgba(148, 163, 184, 0.22);
    border-radius: 999px;
    border: 2px solid rgba(2, 6, 23, 0.35);
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const InboxItem = styled.button<{ $unread?: boolean }>`
  text-align: left;
  border: 1px solid rgba(148, 163, 184, 0.14);
  background: ${({ $unread }) =>
    $unread ? "rgba(59,130,246,.10)" : "rgba(2,6,23,.55)"};
  border-radius: 16px;
  padding: 12px 12px;
  cursor: pointer;

  transition:
    transform 120ms ease,
    border-color 120ms ease,
    background 120ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(59, 130, 246, 0.28);
    background: ${({ $unread }) =>
      $unread ? "rgba(59,130,246,.14)" : "rgba(2,6,23,.72)"};
  }

  &:active {
    transform: translateY(0);
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
  border: 1px solid rgba(148, 163, 184, 0.16);
  color: #cbd5e1;
  background: rgba(15, 23, 42, 0.45);
  flex: 0 0 auto;
`;

export const InboxMeta = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.35;
  white-space: pre-line; /* \n larni ko'rsatadi */
`;

/* ================= RECIPIENTS LIST (COMPOSE) ================= */

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
    background: rgba(148, 163, 184, 0.22);
    border-radius: 999px;
    border: 2px solid rgba(2, 6, 23, 0.35);
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const MemberItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(2, 6, 23, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 14px;
  cursor: pointer;
  transition:
    transform 120ms ease,
    background 120ms ease,
    border-color 120ms ease;

  &:hover {
    background: rgba(2, 6, 23, 0.72);
    border-color: rgba(59, 130, 246, 0.28);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${({ theme }) => theme.colors.primary};
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
