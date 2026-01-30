import { useEffect, useMemo, useState } from "react";
import axios from "axios";
// Ikonkalar (Yangi dizayn uchun)
import { FiMenu, FiBell } from "react-icons/fi";

import {
  Header,
  Left,
  MenuTrigger,
  Title,
  Right,
  IconButton,
  Badge,
  ProfileTrigger,
  AvatarSmall,
  // Barcha eski stillar shu yerda import qilinishi shart
  Overlay,
  Drawer,
  DrawerHeader,
  AvatarLarge,
  DrawerName,
  DrawerRole,
  DrawerHint,
  InfoSection,
  InfoItem,
  InfoLabel,
  InfoValue,
  DrawerFooter,
  LogoutButton,
  GhostButton,
  Modal,
  ModalCard,
  ModalHead,
  ModalTitle,
  HeadRight,
  CloseBtn,
  Tabs,
  Tab,
  ModalBody,
  Block,
  BlockTitle,
  Select,
  Textarea,
  Input,
  Row,
  Small,
  ErrorText,
  SuccessText,
  Footer,
  PrimaryBtn,
  SecondaryBtn,
  MemberList,
  MemberItem,
  Checkbox,
  MemberMeta,
  MemberName,
  MemberSub,
  Pill,
  InboxSearch,
  InboxList,
  InboxItem,
  InboxTop,
  InboxTitle,
  InboxMeta,
  UnreadDot,
  TypeChip,
} from "./Navbar.styled";

// --- TIPLAR VA API (ESKI KODINGIZDAN KO'CHIRILDI) ---
type MeResponse = {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string | null;
  image_url: string | null;
  gymId: number | null;
};

type GymUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

const BASE_URL = "https://nt-gym-api.it-mahalla.uz";

const API = {
  ME: "/api/users/me",
  MY_GYM_USERS: "/api/users/get-my-gym-users",
  NOTIFICATIONS_ME: "/api/notifications/me",
  UNREAD_COUNT: "/api/notifications/unread-count",
  READ_ONE: (id: number) => `/api/notifications/${id}/read`,
  READ_ALL: "/api/notifications/read-all",
  NOTIFY_GYM_USERS: "/api/notifications/notify-gym-users",
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
);

const safeString = (v: any) => (v == null ? "" : String(v));
const normalizeErrorMessage = (e: any, fallback: string) => {
  const raw = e?.response?.data?.message || e?.message || "";
  return String(raw).trim() || fallback;
};
const fullNameOf = (x: { firstName?: string; lastName?: string }) =>
  `${x.firstName || ""} ${x.lastName || ""}`.trim() || "User";
const initialsOf = (x: { firstName?: string; lastName?: string }) => {
  const a = x.firstName?.[0] || "";
  const b = x.lastName?.[0] || "";
  return (a + b).toUpperCase() || "U";
};
const formatTime = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().slice(0, 16).replace("T", " ");
};

const TYPE_OPTIONS = ["SYSTEM", "PAYMENT", "MEMBERSHIP", "ATTENDANCE"] as const;
type NotifType = (typeof TYPE_OPTIONS)[number];
const isAllowedType = (v: string): v is NotifType =>
  TYPE_OPTIONS.includes(v as NotifType);

const templates = [
  {
    key: "GENERAL",
    label: "General update",
    title: "Gym update",
    message: "Hello! We have an important update.",
    type: "SYSTEM" as NotifType,
  },
  {
    key: "PAYMENT",
    label: "Payment reminder",
    title: "Payment reminder",
    message: "Please complete your payment.",
    type: "PAYMENT" as NotifType,
  },
  {
    key: "MEMBERSHIP",
    label: "Membership expiring",
    title: "Membership expiring",
    message: "Your membership is expiring soon.",
    type: "MEMBERSHIP" as NotifType,
  },
] as const;

type TemplateKey = (typeof templates)[number]["key"];
type Audience = "ALL" | "CUSTOM";
type TabKey = "INBOX" | "COMPOSE";

// --- NAVBAR KOMPONENTI (PROPS QO'SHILDI) ---
interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);

  const isManager = useMemo(() => {
    const r = (me?.role || "").toLowerCase();
    return r.includes("manager");
  }, [me?.role]);

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [tab, setTab] = useState<TabKey>("INBOX");
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifSearch, setNotifSearch] = useState("");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [gymUsers, setGymUsers] = useState<GymUser[]>([]);
  const [loadingGymUsers, setLoadingGymUsers] = useState(false);
  const [templateKey, setTemplateKey] = useState<TemplateKey>("GENERAL");
  const [audience, setAudience] = useState<Audience>("ALL");
  const [searchUser, setSearchUser] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const currentTemplate = useMemo(
    () => templates.find((t) => t.key === templateKey)!,
    [templateKey],
  );
  const [notifTitle, setNotifTitle] = useState<string>(currentTemplate.title);
  const [notifMessage, setNotifMessage] = useState<string>(
    currentTemplate.message,
  );
  const [notifType, setNotifType] = useState<NotifType>(currentTemplate.type);

  useEffect(() => {
    setNotifTitle(currentTemplate.title);
    setNotifMessage(currentTemplate.message);
    setNotifType(currentTemplate.type);
  }, [currentTemplate.key]);

  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const clearToast = () => {
    setErr("");
    setOk("");
  };
  const displayName = useMemo(() => (me ? fullNameOf(me) : "Loading..."), [me]);
  const displayInitials = useMemo(() => (me ? initialsOf(me) : "U"), [me]);

  useEffect(() => {
    const loadMe = async () => {
      setLoadingMe(true);
      try {
        const r = await api.get<MeResponse>(API.ME);
        setMe(r.data);
      } catch (e: any) {
        setErr(normalizeErrorMessage(e, "Unable to load profile data."));
      } finally {
        setLoadingMe(false);
      }
    };
    loadMe();
  }, []);

  const loadUnreadCount = async () => {
    if (!me || isManager) return;
    try {
      const r = await api.get<any>(API.UNREAD_COUNT);
      const val =
        typeof r.data === "number" ? r.data : Number(r.data?.count ?? 0);
      setUnreadCount(Number.isFinite(val) ? val : 0);
    } catch {}
  };

  useEffect(() => {
    loadUnreadCount();
  }, [me?.id, isManager]);

  const loadMyNotifications = async () => {
    if (!me || isManager) return;
    setNotifLoading(true);
    try {
      const r = await api.get<NotificationItem[]>(API.NOTIFICATIONS_ME);
      setNotifications(Array.isArray(r.data) ? r.data : []);
    } catch (e: any) {
      setNotifications([]);
      setErr(normalizeErrorMessage(e, "Unable to load notifications."));
    } finally {
      setNotifLoading(false);
    }
  };

  const loadMyGymUsers = async () => {
    if (!me) return [];
    setLoadingGymUsers(true);
    try {
      const r = await api.get<GymUser[]>(API.MY_GYM_USERS);
      const list = Array.isArray(r.data) ? r.data : [];
      setGymUsers(list);
      return list;
    } catch (e: any) {
      setGymUsers([]);
      setErr(normalizeErrorMessage(e, "Unable to load gym users."));
      return [];
    } finally {
      setLoadingGymUsers(false);
    }
  };

  const openNotifications = async () => {
    clearToast();
    setNotifyOpen(true);
    if (isManager) {
      setTab("COMPOSE");
      setAudience("ALL");
      setSelectedEmails([]);
      setSearchUser("");
      await loadMyGymUsers();
      return;
    }
    setTab("INBOX");
    await Promise.all([loadUnreadCount(), loadMyNotifications()]);
  };

  const filteredNotifications = useMemo(() => {
    const q = notifSearch.trim().toLowerCase();
    if (!q) return notifications;
    return notifications.filter((n) =>
      (n.title + n.message).toLowerCase().includes(q),
    );
  }, [notifications, notifSearch]);

  const filteredGymUsers = useMemo(() => {
    const q = searchUser.trim().toLowerCase();
    if (!q) return gymUsers;
    return gymUsers.filter((u) =>
      (fullNameOf(u) + u.phone + u.email).toLowerCase().includes(q),
    );
  }, [gymUsers, searchUser]);

  const toggleEmail = (email: string) => {
    const e = email.trim();
    setSelectedEmails((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e],
    );
  };

  const canSend = useMemo(() => {
    if (!me) return false;
    if (!notifTitle.trim() || !notifMessage.trim()) return false;
    if (audience === "CUSTOM" && selectedEmails.length === 0) return false;
    return true;
  }, [me, notifTitle, notifMessage, notifType, audience, selectedEmails]);

  const markRead = async (id: number) => {
    if (isManager) return;
    try {
      await api.post(API.READ_ONE(id), {});
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      await loadUnreadCount();
    } catch (e: any) {}
  };

  const readAll = async () => {
    if (isManager) return;
    try {
      await api.post(API.READ_ALL, {});
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (e: any) {}
  };

  const sendNotification = async () => {
    clearToast();
    setSending(true);
    try {
      const freshUsers = await loadMyGymUsers();
      const usersSource = freshUsers.length ? freshUsers : gymUsers;
      const allEmails = usersSource
        .map((u) => safeString(u.email).trim())
        .filter(Boolean);
      const targetEmails = audience === "ALL" ? allEmails : selectedEmails;

      if (targetEmails.length === 0) {
        setErr("Recipients empty.");
        return;
      }

      await api.post(API.NOTIFY_GYM_USERS, {
        title: notifTitle,
        message: notifMessage,
        type: notifType,
      });
      setOk("Notification sent.");
      setAudience("ALL");
      setSelectedEmails([]);
      setSearchUser("");
    } catch (e: any) {
      setErr(normalizeErrorMessage(e, "Failed to send."));
    } finally {
      setSending(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // --- RETURN QISMI (YANGI DIZAYNGA MOSLANDI) ---
  return (
    <>
      <Header>
        <Left>
          {/* Sidebar Tugmasi */}
          <MenuTrigger onClick={toggleSidebar}>
            <FiMenu size={24} />
          </MenuTrigger>
          <Title>Dashboard</Title>
        </Left>

        <Right>
          <IconButton onClick={openNotifications} aria-label="Notifications">
            <FiBell size={20} />
            {!isManager && unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </IconButton>

          <ProfileTrigger onClick={() => setProfileOpen(true)}>
            <AvatarSmall $image={me?.image_url || undefined}>
              {!me?.image_url && displayInitials}
            </AvatarSmall>
          </ProfileTrigger>
        </Right>
      </Header>

      {/* --- ESKI LOGIKALI DRAWER --- */}
      {profileOpen && (
        <>
          <Overlay onClick={() => setProfileOpen(false)} />
          <Drawer>
            <DrawerHeader>
              <AvatarLarge $image={me?.image_url || undefined}>
                {!me?.image_url && displayInitials}
              </AvatarLarge>
              <div>
                <DrawerName>
                  {loadingMe ? "Loading..." : displayName}
                </DrawerName>
                <DrawerRole>{me?.role || "—"}</DrawerRole>
                <DrawerHint>{me?.email || "—"}</DrawerHint>
              </div>
            </DrawerHeader>
            <InfoSection>
              <InfoItem>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{me?.email}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>{me?.phone}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Role</InfoLabel>
                <InfoValue>{me?.role}</InfoValue>
              </InfoItem>
            </InfoSection>
            <DrawerFooter>
              <GhostButton onClick={() => setProfileOpen(false)}>
                Close
              </GhostButton>
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </DrawerFooter>
          </Drawer>
        </>
      )}

      {/* --- ESKI LOGIKALI MODAL --- */}
      {notifyOpen && (
        <>
          <Overlay
            onClick={() => {
              setNotifyOpen(false);
              clearToast();
            }}
          />
          <Modal>
            <ModalCard>
              <ModalHead>
                <ModalTitle>
                  {isManager ? "Send notification" : "Notifications"}
                </ModalTitle>
                <HeadRight>
                  <Tabs>
                    {!isManager && (
                      <Tab
                        $active={tab === "INBOX"}
                        onClick={() => setTab("INBOX")}
                      >
                        Inbox
                      </Tab>
                    )}
                    <Tab
                      $active={tab === "COMPOSE"}
                      onClick={() => setTab("COMPOSE")}
                    >
                      Compose
                    </Tab>
                  </Tabs>
                  <CloseBtn onClick={() => setNotifyOpen(false)}>✕</CloseBtn>
                </HeadRight>
              </ModalHead>
              <ModalBody>
                {tab === "INBOX" && !isManager ? (
                  <Block>
                    <BlockTitle>
                      Inbox {unreadCount > 0 && <Pill>{unreadCount}</Pill>}
                    </BlockTitle>
                    <InboxSearch>
                      <Input
                        value={notifSearch}
                        onChange={(e) => setNotifSearch(e.target.value)}
                        placeholder="Search..."
                      />
                    </InboxSearch>
                    <InboxList>
                      {filteredNotifications.map((n) => (
                        <InboxItem
                          key={n.id}
                          $unread={!n.isRead}
                          onClick={() => !n.isRead && markRead(n.id)}
                        >
                          <InboxTop>
                            <InboxTitle>
                              <strong>{n.title}</strong>
                            </InboxTitle>
                            <TypeChip>{n.type}</TypeChip>
                          </InboxTop>
                          <InboxMeta>{n.message}</InboxMeta>
                        </InboxItem>
                      ))}
                    </InboxList>
                  </Block>
                ) : (
                  <>
                    <Block>
                      <BlockTitle>Compose</BlockTitle>
                      <Row>
                        <Select
                          value={templateKey}
                          onChange={(e) =>
                            setTemplateKey(e.target.value as any)
                          }
                        >
                          {templates.map((t) => (
                            <option key={t.key} value={t.key}>
                              {t.label}
                            </option>
                          ))}
                        </Select>
                        <Select
                          value={audience}
                          onChange={(e) => setAudience(e.target.value as any)}
                        >
                          <option value="ALL">All</option>
                          <option value="CUSTOM">Select</option>
                        </Select>
                      </Row>
                      <div style={{ marginTop: 12 }}>
                        <Input
                          value={notifTitle}
                          onChange={(e) => setNotifTitle(e.target.value)}
                        />
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <Textarea
                          value={notifMessage}
                          onChange={(e) => setNotifMessage(e.target.value)}
                        />
                      </div>
                      {err && <ErrorText>{err}</ErrorText>}{" "}
                      {ok && <SuccessText>{ok}</SuccessText>}
                    </Block>
                    <Block>
                      <BlockTitle>
                        Recipients{" "}
                        {audience === "CUSTOM" && (
                          <Pill>{selectedEmails.length}</Pill>
                        )}
                      </BlockTitle>
                      {audience === "ALL" ? (
                        <Small>All users will receive this.</Small>
                      ) : (
                        <>
                          <Input
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                            placeholder="Search users..."
                          />
                          <MemberList>
                            {filteredGymUsers.map((u) => (
                              <MemberItem key={u.email}>
                                <Checkbox
                                  type="checkbox"
                                  checked={selectedEmails.includes(
                                    safeString(u.email),
                                  )}
                                  onChange={() =>
                                    toggleEmail(safeString(u.email))
                                  }
                                />
                                <MemberMeta>
                                  <MemberName>{fullNameOf(u)}</MemberName>
                                  <MemberSub>{u.email}</MemberSub>
                                </MemberMeta>
                              </MemberItem>
                            ))}
                          </MemberList>
                        </>
                      )}
                    </Block>
                  </>
                )}
              </ModalBody>
              <Footer>
                <SecondaryBtn onClick={() => setNotifyOpen(false)}>
                  Cancel
                </SecondaryBtn>
                <PrimaryBtn onClick={sendNotification} disabled={sending}>
                  {sending ? "Sending..." : "Send"}
                </PrimaryBtn>
              </Footer>
            </ModalCard>
          </Modal>
        </>
      )}
    </>
  );
};

export default Navbar;
