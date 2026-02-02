import React, { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
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
  InboxSearch,
  InboxList,
  InboxItem,
  InboxTop,
  InboxTitle,
  InboxMeta,
  TypeChip,
} from "./Navbar.styled";

// --- TYPES ---
interface MeResponse {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string | null;
  image_url: string | null;
  gymId: number | null;
}

interface GymUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

const TYPE_OPTIONS = ["SYSTEM", "PAYMENT", "MEMBERSHIP", "ATTENDANCE"] as const;
type NotifType = (typeof TYPE_OPTIONS)[number];

interface Template {
  key: string;
  label: string;
  title: string;
  message: string;
  type: NotifType;
}

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

// --- UTILS ---
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


const normalizeErrorMessage = (e: any, fallback: string) => {
  return e?.response?.data?.message || e?.message || fallback;
};

const fullNameOf = (x: { firstName?: string; lastName?: string }) =>
  `${x.firstName || ""} ${x.lastName || ""}`.trim() || "User";

const initialsOf = (x: { firstName?: string; lastName?: string }) => {
  const a = x.firstName?.[0] || "";
  const b = x.lastName?.[0] || "";
  return (a + b).toUpperCase() || "U";
};

const templates: Template[] = [
  {
    key: "GENERAL",
    label: "General update",
    title: "Gym update",
    message: "Hello! We have an important update.",
    type: "SYSTEM",
  },
  {
    key: "PAYMENT",
    label: "Payment reminder",
    title: "Payment reminder",
    message: "Please complete your payment.",
    type: "PAYMENT",
  },
  {
    key: "MEMBERSHIP",
    label: "Membership expiring",
    title: "Membership expiring",
    message: "Your membership is expiring soon.",
    type: "MEMBERSHIP",
  },
];

type Audience = "ALL" | "CUSTOM";
type TabKey = "INBOX" | "COMPOSE";

interface NavbarProps {
  toggleSidebar: () => void;
}

// --- MAIN COMPONENT ---
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);

  const isManager = useMemo(
    () => me?.role?.toLowerCase().includes("manager") ?? false,
    [me],
  );

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [tab, setTab] = useState<TabKey>("INBOX");
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifSearch, setNotifSearch] = useState("");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [gymUsers, setGymUsers] = useState<GymUser[]>([]);

  const [templateKey, setTemplateKey] = useState<string>("GENERAL");
  const [audience, setAudience] = useState<Audience>("ALL");
  const [searchUser, setSearchUser] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const currentTemplate = useMemo(
    () => templates.find((t) => t.key === templateKey) || templates[0],
    [templateKey],
  );

  const [notifTitle, setNotifTitle] = useState(currentTemplate.title);
  const [notifMessage, setNotifMessage] = useState(currentTemplate.message);
  const [notifType, setNotifType] = useState<NotifType>(currentTemplate.type);

  useEffect(() => {
    setNotifTitle(currentTemplate.title);
    setNotifMessage(currentTemplate.message);
    setNotifType(currentTemplate.type);
  }, [currentTemplate]);

  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const clearToast = useCallback(() => {
    setErr("");
    setOk("");
  }, []);

  // API Actions
  const loadMe = async () => {
    setLoadingMe(true);
    try {
      const r = await api.get<MeResponse>(API.ME);
      setMe(r.data);
    } catch (e: any) {
      setErr(normalizeErrorMessage(e, "Unable to load profile."));
    } finally {
      setLoadingMe(false);
    }
  };

  const loadUnreadCount = async () => {
    if (!me || isManager) return;
    try {
      const r = await api.get(API.UNREAD_COUNT);
      setUnreadCount(r.data?.count ?? r.data ?? 0);
    } catch {}
  };

  const loadMyNotifications = async () => {
    if (!me || isManager) return;
    setNotifLoading(true);
    try {
      const r = await api.get<NotificationItem[]>(API.NOTIFICATIONS_ME);
      setNotifications(Array.isArray(r.data) ? r.data : []);
    } catch (e: any) {
      setErr(normalizeErrorMessage(e, "Error loading inbox."));
    } finally {
      setNotifLoading(false);
    }
  };

  const loadMyGymUsers = async () => {
    try {
      const r = await api.get<GymUser[]>(API.MY_GYM_USERS);
      setGymUsers(r.data);
      return r.data;
    } catch (e: any) {
      setErr(normalizeErrorMessage(e, "Error loading users."));
      return [];
    }
  };

  useEffect(() => {
    loadMe();
  }, []);
  useEffect(() => {
    loadUnreadCount();
  }, [me, isManager]);

  const openNotifications = async () => {
    clearToast();
    setNotifyOpen(true);
    if (isManager) {
      setTab("COMPOSE");
      await loadMyGymUsers();
    } else {
      setTab("INBOX");
      loadMyNotifications();
    }
  };

  const filteredNotifications = useMemo(() => {
    const q = notifSearch.toLowerCase();
    return notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q),
    );
  }, [notifications, notifSearch]);

  const filteredGymUsers = useMemo(() => {
    const q = searchUser.toLowerCase();
    return gymUsers.filter(
      (u) =>
        fullNameOf(u).toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }, [gymUsers, searchUser]);

  const sendNotification = async () => {
    clearToast();
    if (!notifTitle.trim() || !notifMessage.trim()) {
      setErr("Title and message required.");
      return;
    }

    setSending(true);
    try {
      const payload: any = {
        title: notifTitle,
        message: notifMessage,
        type: notifType,
      };

      if (audience === "CUSTOM") {
        payload.emails = selectedEmails;
      }

      await api.post(API.NOTIFY_GYM_USERS, payload);
      setOk("Notification sent successfully!");
      setSelectedEmails([]);
    } catch (e: any) {
      setErr(normalizeErrorMessage(e, "Failed to send notification."));
    } finally {
      setSending(false);
    }
  };

  const markRead = async (id: number) => {
    try {
      await api.post(API.READ_ONE(id));
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      loadUnreadCount();
    } catch {}
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const displayInitials = me ? initialsOf(me) : "U";

  return (
    <>
      <Header>
        <Left>
          <MenuTrigger onClick={toggleSidebar}>
            <FiMenu size={24} />
          </MenuTrigger>
          <Title>Dashboard</Title>
        </Left>

        <Right>
          <IconButton onClick={openNotifications}>
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
                  {loadingMe ? "Loading..." : fullNameOf(me!)}
                </DrawerName>
                <DrawerRole>{me?.role || "—"}</DrawerRole>
                <DrawerHint>{me?.email || "—"}</DrawerHint>
              </div>
            </DrawerHeader>
            <InfoSection>
              <InfoItem>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>{me?.phone || "N/A"}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Member ID</InfoLabel>
                <InfoValue>#{me?.id}</InfoValue>
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
                  {isManager ? "Management" : "Notifications"}
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
                    {isManager && (
                      <Tab
                        $active={tab === "COMPOSE"}
                        onClick={() => setTab("COMPOSE")}
                      >
                        Compose
                      </Tab>
                    )}
                  </Tabs>
                  <CloseBtn onClick={() => setNotifyOpen(false)}>✕</CloseBtn>
                </HeadRight>
              </ModalHead>
              <ModalBody>
                {tab === "INBOX" ? (
                  <Block>
                    <InboxSearch>
                      <Input
                        placeholder="Search notifications..."
                        value={notifSearch}
                        onChange={(e) => setNotifSearch(e.target.value)}
                      />
                    </InboxSearch>
                    <InboxList>
                      {notifLoading ? (
                        <Small>Loading...</Small>
                      ) : (
                        filteredNotifications.map((n) => (
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
                        ))
                      )}
                    </InboxList>
                  </Block>
                ) : (
                  <>
                    <Block>
                      <BlockTitle>Message Template</BlockTitle>
                      <Row>
                        <Select
                          value={templateKey}
                          onChange={(e) => setTemplateKey(e.target.value)}
                        >
                          {templates.map((t) => (
                            <option key={t.key} value={t.key}>
                              {t.label}
                            </option>
                          ))}
                        </Select>
                        <Select
                          value={audience}
                          onChange={(e) =>
                            setAudience(e.target.value as Audience)
                          }
                        >
                          <option value="ALL">All Members</option>
                          <option value="CUSTOM">Specific Members</option>
                        </Select>
                      </Row>
                      <Input
                        style={{ marginTop: 12 }}
                        placeholder="Notification Title"
                        value={notifTitle}
                        onChange={(e) => setNotifTitle(e.target.value)}
                      />
                      <Textarea
                        style={{ marginTop: 12 }}
                        placeholder="Message content..."
                        value={notifMessage}
                        onChange={(e) => setNotifMessage(e.target.value)}
                      />
                      {err && <ErrorText>{err}</ErrorText>}
                      {ok && <SuccessText>{ok}</SuccessText>}
                    </Block>

                    {audience === "CUSTOM" && (
                      <Block>
                        <BlockTitle>
                          Select Recipients ({selectedEmails.length})
                        </BlockTitle>
                        <Input
                          placeholder="Search users..."
                          value={searchUser}
                          onChange={(e) => setSearchUser(e.target.value)}
                        />
                        <MemberList>
                          {filteredGymUsers.map((u) => (
                            <MemberItem key={u.email}>
                              <Checkbox
                                type="checkbox"
                                checked={selectedEmails.includes(u.email)}
                                onChange={() =>
                                  setSelectedEmails((prev) =>
                                    prev.includes(u.email)
                                      ? prev.filter((e) => e !== u.email)
                                      : [...prev, u.email],
                                  )
                                }
                              />
                              <MemberMeta>
                                <MemberName>{fullNameOf(u)}</MemberName>
                                <MemberSub>{u.email}</MemberSub>
                              </MemberMeta>
                            </MemberItem>
                          ))}
                        </MemberList>
                      </Block>
                    )}
                  </>
                )}
              </ModalBody>
              <Footer>
                <SecondaryBtn onClick={() => setNotifyOpen(false)}>
                  Close
                </SecondaryBtn>
                {tab === "COMPOSE" && (
                  <PrimaryBtn onClick={sendNotification} disabled={sending}>
                    {sending ? "Sending..." : "Send Notification"}
                  </PrimaryBtn>
                )}
              </Footer>
            </ModalCard>
          </Modal>
        </>
      )}
    </>
  );
};

export default Navbar;
