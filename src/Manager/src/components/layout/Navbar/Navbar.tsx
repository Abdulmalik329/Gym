import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Header,
  Left,
  Title,
  SearchBox,
  SearchIcon,
  SearchInput,
  Right,
  IconButton,
  Badge,
  ProfileTrigger,
  AvatarSmall,
  UserInfo,
  Name,
  Role,
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

  // modal
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

  // inbox
  InboxSearch,
  InboxList,
  InboxItem,
  InboxTop,
  InboxTitle,
  InboxMeta,
  UnreadDot,
  TypeChip,
} from "./Navbar.styled";

/* ===================== TYPES ===================== */
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

/* ===================== API CONFIG ===================== */
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
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // ✅ transformRequest OLIB TASHLANDI (axios o‘zi JSON qiladi)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ DEBUG: 400/500 sababini aniq ko‘rsatadi
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("API ERROR status:", err?.response?.status);
    console.log("API ERROR data:", err?.response?.data);
    console.log("API ERROR sent body:", err?.config?.data);
    return Promise.reject(err);
  },
);

/* ===================== HELPERS ===================== */
const safeString = (v: any) => (v == null ? "" : String(v));

const normalizeErrorMessage = (e: any, fallback: string) => {
  const raw =
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    e?.response?.data ||
    e?.message ||
    "";

  if (Array.isArray(raw)) return raw.join(", ");
  if (typeof raw === "object") {
    try {
      return JSON.stringify(raw);
    } catch {
      return fallback;
    }
  }

  const msg = String(raw).trim();
  if (
    msg.startsWith("Cannot POST") ||
    msg.startsWith("Cannot GET") ||
    msg.includes("<!DOCTYPE html>") ||
    msg.includes("<html")
  ) {
    return fallback;
  }
  return msg || fallback;
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
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hh}:${mm}`;
};

/* ===================== STRICT TYPES (BACKEND) ===================== */
const TYPE_OPTIONS = ["SYSTEM", "PAYMENT", "MEMBERSHIP", "ATTENDANCE"] as const;
type NotifType = (typeof TYPE_OPTIONS)[number];

const isAllowedType = (v: string): v is NotifType =>
  TYPE_OPTIONS.includes(v as NotifType);

/* ===================== TEMPLATES ===================== */
const templates = [
  {
    key: "GENERAL",
    label: "General update",
    title: "Gym update",
    message: "Hello! We have an important update from the gym management.",
    type: "SYSTEM" as NotifType,
  },
  {
    key: "PAYMENT",
    label: "Payment reminder",
    title: "Payment reminder",
    message:
      "Hi! This is a friendly reminder that your membership payment is due. Please complete your payment at your earliest convenience.",
    type: "PAYMENT" as NotifType,
  },
  {
    key: "MEMBERSHIP",
    label: "Membership expiring",
    title: "Membership expiring soon",
    message:
      "Hi! Your membership is expiring soon. Please renew to keep your access uninterrupted.",
    type: "MEMBERSHIP" as NotifType,
  },
] as const;

type TemplateKey = (typeof templates)[number]["key"];
type Audience = "ALL" | "CUSTOM";
type TabKey = "INBOX" | "COMPOSE";

/* =====================================================
   COMPONENT
===================================================== */
const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  // ME
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);

  const isManager = useMemo(() => {
    const r = (me?.role || "").toLowerCase();
    return r.includes("manager");
  }, [me?.role]);

  // unread badge (members only)
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // tabs
  const [tab, setTab] = useState<TabKey>("INBOX");

  // INBOX
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifSearch, setNotifSearch] = useState("");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // COMPOSE recipients
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

  // ✅ string state (TS error bo‘lmaydi)
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

  /* ------------------ LOAD ME ------------------ */
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

  /* ------------------ UNREAD COUNT ------------------ */
  const loadUnreadCount = async () => {
    if (!me || isManager) return;
    try {
      const r = await api.get<number | { count: number }>(API.UNREAD_COUNT);
      const val =
        typeof r.data === "number"
          ? r.data
          : Number((r.data as any)?.count ?? 0);
      setUnreadCount(Number.isFinite(val) ? val : 0);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadUnreadCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.id, isManager]);

  /* ------------------ INBOX LOAD ------------------ */
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

  /* ------------------ GYM USERS LOAD (COMPOSE) ------------------ */
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
      setErr(normalizeErrorMessage(e, "Unable to load gym users list."));
      return [];
    } finally {
      setLoadingGymUsers(false);
    }
  };

  /* ------------------ OPEN MODAL ------------------ */
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

  /* ------------------ FILTERS ------------------ */
  const filteredNotifications = useMemo(() => {
    const q = notifSearch.trim().toLowerCase();
    if (!q) return notifications;
    return notifications.filter((n) => {
      const t = (n.title || "").toLowerCase();
      const m = (n.message || "").toLowerCase();
      const ty = (n.type || "").toLowerCase();
      return t.includes(q) || m.includes(q) || ty.includes(q);
    });
  }, [notifications, notifSearch]);

  const filteredGymUsers = useMemo(() => {
    const q = searchUser.trim().toLowerCase();
    if (!q) return gymUsers;

    return gymUsers.filter((u) => {
      const name = fullNameOf(u).toLowerCase();
      const phone = (u.phone || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      return name.includes(q) || phone.includes(q) || email.includes(q);
    });
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
    if (!notifType || !isAllowedType(String(notifType))) return false;
    if (audience === "CUSTOM" && selectedEmails.length === 0) return false;
    return true;
  }, [me, notifTitle, notifMessage, notifType, audience, selectedEmails]);

  /* ------------------ MARK READ ONE ------------------ */
  const markRead = async (id: number) => {
    if (isManager) return;
    try {
      await api.post(API.READ_ONE(id), {});
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      await loadUnreadCount();
    } catch (e: any) {
      setErr(normalizeErrorMessage(e, "Unable to mark as read."));
    }
  };

  /* ------------------ READ ALL ------------------ */
  const readAll = async () => {
    if (isManager) return;
    clearToast();
    try {
      await api.post(API.READ_ALL, {});
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      setOk("All notifications marked as read.");
    } catch (e: any) {
      setErr(normalizeErrorMessage(e, "Unable to mark all as read."));
    }
  };

  /* ------------------ SEND (MANAGER) ------------------ */
  const sendNotification = async () => {
    clearToast();

    const title = String(notifTitle ?? "").trim();
    const message = String(notifMessage ?? "").trim();
    const type = String(notifType ?? "")
      .trim()
      .toUpperCase();

    if (!title) return setErr("Title bo‘sh bo‘lmasin.");
    if (!message) return setErr("Message bo‘sh bo‘lmasin.");
    if (!isAllowedType(type)) {
      return setErr(
        "Type must be one of: SYSTEM, PAYMENT, MEMBERSHIP, ATTENDANCE",
      );
    }

    setSending(true);
    try {
      // fresh list
      const freshUsers = await loadMyGymUsers();
      const usersSource = freshUsers.length ? freshUsers : gymUsers;

      const allEmails = usersSource
        .map((u) => safeString(u.email).trim())
        .filter(Boolean);

      const targetEmails =
        audience === "ALL"
          ? allEmails
          : selectedEmails.map((x) => safeString(x).trim()).filter(Boolean);

      if (targetEmails.length === 0) {
        setErr("Recipients list empty.");
        return;
      }

      // ✅ ONE clean payload (backend DTO shuni kutadi deb faraz qilamiz)
      const payload = { title, message, type };

      console.log(payload);

      console.log("SEND PAYLOAD =>", payload);

      await api.post(API.NOTIFY_GYM_USERS, payload);

      setOk("Notification sent successfully.");
      setAudience("ALL");
      setSelectedEmails([]);
      setSearchUser("");
    } catch (e: any) {
      setErr(normalizeErrorMessage(e, "Unable to send notification."));
    } finally {
      setSending(false);
    }
  };

  /* ------------------ LOGOUT ------------------ */
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <Header>
        <Left>
          <Title>Gym Manager Dashboard</Title>

          <SearchBox>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput placeholder="Search members, payments, activities..." />
          </SearchBox>
        </Left>

        <Right>
          <IconButton onClick={openNotifications} aria-label="Notifications">
            🔔
            {!isManager && unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </IconButton>

          <ProfileTrigger onClick={() => setProfileOpen(true)}>
            <AvatarSmall $image={me?.image_url || undefined}>
              {!me?.image_url && displayInitials}
            </AvatarSmall>

            <UserInfo>
              <Name>{loadingMe ? "Loading..." : displayName}</Name>
              <Role>{me?.role || "—"}</Role>
            </UserInfo>
          </ProfileTrigger>
        </Right>
      </Header>

      {/* ===================== PROFILE DRAWER ===================== */}
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
                <DrawerHint>
                  {me?.email || "—"} • Gym ID: {me?.gymId ?? "—"}
                </DrawerHint>
              </div>
            </DrawerHeader>

            <InfoSection>
              <InfoItem>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{me?.email || "—"}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>{me?.phone || "—"}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Date of Birth</InfoLabel>
                <InfoValue>{me?.birthDate || "—"}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Role</InfoLabel>
                <InfoValue>{me?.role || "—"}</InfoValue>
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

      {/* ===================== NOTIFICATION MODAL ===================== */}
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
                        onClick={async () => {
                          clearToast();
                          setTab("INBOX");
                          await Promise.all([
                            loadUnreadCount(),
                            loadMyNotifications(),
                          ]);
                        }}
                      >
                        Inbox
                      </Tab>
                    )}

                    <Tab
                      $active={tab === "COMPOSE"}
                      onClick={async () => {
                        clearToast();
                        setTab("COMPOSE");
                        await loadMyGymUsers();
                      }}
                    >
                      Compose
                    </Tab>
                  </Tabs>

                  <CloseBtn
                    onClick={() => {
                      setNotifyOpen(false);
                      clearToast();
                    }}
                  >
                    ✕
                  </CloseBtn>
                </HeadRight>
              </ModalHead>

              <ModalBody>
                {/* LEFT */}
                {tab === "INBOX" && !isManager ? (
                  <Block>
                    <BlockTitle>
                      Inbox{" "}
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        {unreadCount > 0 && <Pill>Unread: {unreadCount}</Pill>}
                        <SecondaryBtn onClick={readAll}>Read all</SecondaryBtn>
                      </div>
                    </BlockTitle>

                    <InboxSearch>
                      <Input
                        value={notifSearch}
                        onChange={(e) => setNotifSearch(e.target.value)}
                        placeholder="Search notifications..."
                      />
                      <SecondaryBtn
                        onClick={async () => {
                          clearToast();
                          await Promise.all([
                            loadUnreadCount(),
                            loadMyNotifications(),
                          ]);
                        }}
                      >
                        Refresh
                      </SecondaryBtn>
                    </InboxSearch>

                    <InboxList>
                      {notifLoading ? (
                        <Small>Loading notifications...</Small>
                      ) : filteredNotifications.length === 0 ? (
                        <Small>No notifications.</Small>
                      ) : (
                        filteredNotifications.map((n) => (
                          <InboxItem
                            key={n.id}
                            $unread={!n.isRead}
                            onClick={() => {
                              if (!n.isRead) markRead(n.id);
                            }}
                            title="Click to mark as read"
                          >
                            <InboxTop>
                              <InboxTitle>
                                {!n.isRead && <UnreadDot />}
                                <strong>
                                  {n.title} — #{n.id}
                                </strong>
                              </InboxTitle>
                              <TypeChip>{n.type}</TypeChip>
                            </InboxTop>

                            <InboxMeta>
                              {n.message}
                              {"\n"}
                              {formatTime(n.createdAt)}
                            </InboxMeta>
                          </InboxItem>
                        ))
                      )}
                    </InboxList>

                    {err && <ErrorText>{err}</ErrorText>}
                    {ok && <SuccessText>{ok}</SuccessText>}
                  </Block>
                ) : (
                  <Block>
                    <BlockTitle>Message</BlockTitle>

                    <Row>
                      <div>
                        <Small>Template</Small>
                        <Select
                          value={templateKey}
                          onChange={(e) =>
                            setTemplateKey(e.target.value as TemplateKey)
                          }
                        >
                          {templates.map((t) => (
                            <option key={t.key} value={t.key}>
                              {t.label}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div>
                        <Small>Audience</Small>
                        <Select
                          value={audience}
                          onChange={(e) => {
                            const v = e.target.value as Audience;
                            setAudience(v);
                            if (v === "ALL") setSelectedEmails([]);
                          }}
                        >
                          <option value="ALL">All gym users</option>
                          <option value="CUSTOM">Select users</option>
                        </Select>
                      </div>
                    </Row>

                    <div style={{ marginTop: 12 }}>
                      <Small>Type</Small>
                      <Select
                        value={notifType}
                        onChange={(e) =>
                          setNotifType(e.target.value as NotifType)
                        }
                      >
                        {TYPE_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Select>
                      <Small>
                        Allowed: SYSTEM, PAYMENT, MEMBERSHIP, ATTENDANCE
                      </Small>
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <Small>Title</Small>
                      <Input
                        value={notifTitle}
                        onChange={(e) => setNotifTitle(e.target.value)}
                        placeholder="Notification title"
                      />
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <Small>Message</Small>
                      <Textarea
                        value={notifMessage}
                        onChange={(e) => setNotifMessage(e.target.value)}
                        placeholder="Write your message..."
                      />

                      <Small>
                        {audience === "ALL"
                          ? "This message will be sent to all users in your gym."
                          : `This message will be sent to selected users (${selectedEmails.length}).`}
                      </Small>

                      {err && <ErrorText>{err}</ErrorText>}
                      {ok && <SuccessText>{ok}</SuccessText>}
                    </div>
                  </Block>
                )}

                {/* RIGHT */}
                <Block>
                  <BlockTitle>
                    Recipients{" "}
                    {audience === "CUSTOM" && (
                      <Pill>Selected: {selectedEmails.length}</Pill>
                    )}
                  </BlockTitle>

                  {audience === "ALL" ? (
                    <Small>
                      All users returned by <b>/api/users/get-my-gym-users</b>{" "}
                      will receive the notification.
                    </Small>
                  ) : (
                    <>
                      <Small>Search users</Small>
                      <Input
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        placeholder="Search by name, phone, email..."
                      />

                      <MemberList>
                        {loadingGymUsers ? (
                          <Small>Loading gym users...</Small>
                        ) : filteredGymUsers.length === 0 ? (
                          <Small>No users found.</Small>
                        ) : (
                          filteredGymUsers.map((u) => {
                            const email = safeString(u.email).trim();
                            const checked = selectedEmails.includes(email);

                            return (
                              <MemberItem key={email}>
                                <Checkbox
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleEmail(email)}
                                />
                                <MemberMeta>
                                  <MemberName>{fullNameOf(u)}</MemberName>
                                  <MemberSub>
                                    {u.phone || "—"} • {email}
                                  </MemberSub>
                                </MemberMeta>
                              </MemberItem>
                            );
                          })
                        )}
                      </MemberList>
                    </>
                  )}
                </Block>
              </ModalBody>

              <Footer>
                <SecondaryBtn
                  onClick={() => {
                    setNotifyOpen(false);
                    clearToast();
                  }}
                >
                  Cancel
                </SecondaryBtn>

                <PrimaryBtn
                  onClick={sendNotification}
                  disabled={!canSend || sending}
                >
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
