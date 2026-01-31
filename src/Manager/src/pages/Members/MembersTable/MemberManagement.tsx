import React, { useCallback, useEffect, useState } from "react";
import {
  Wrapper,
  Header,
  Title,
  Controls,
  ActionBtn,
  Table,
  HeadRow,
  Row,
  Cell,
  Member,
  Avatar,
  Name,
  Footer,
  ErrorText,
  Loading,
  StatusBadge,
  BtnGroup,
  IconBtn,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseBtn,
  HistoryList,
  HistoryItem,
} from "./MemberManagement.styled";

// --- TYPES ---
type MemberRow = {
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
};

// Backenddan keladigan Responsega moslashtirildi (checkInAt)
type AttendanceRecord = {
  id: number;
  checkInAt?: string; // check_in_at EMAS, checkInAt
  createdAt?: string;
  gymId: number; // gym_id EMAS, gymId
  userId: number;
  membership?: {
    plan?: {
      name: string;
    };
  };
};

type Membership = {
  id: number;
  isActive: boolean;
  status: string;
  plan_name?: string;
};

// --- API CONFIG ---
const BASE_URL = "https://nt-gym-api.it-mahalla.uz/api";
const CURRENT_GYM_ID = 1;

const getToken = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token") || "";
  return token.replace("Bearer ", "").trim();
};

// --- SANA FORMATLASH (Asia/Tashkent) ---
const formatDate = (dateString?: string) => {
  if (!dateString) return "Sana yo'q";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Noto'g'ri format";

    // O'zbekiston vaqtiga (UTC+5) majburiy o'tkazish
    return new Intl.DateTimeFormat("uz-UZ", {
      timeZone: "Asia/Tashkent", // MUHIM: Toshkent vaqti
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24 soatlik format
    }).format(date);
  } catch (e) {
    return "Sana xatosi";
  }
};

const MemberManagement: React.FC = () => {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState<
    AttendanceRecord[]
  >([]);
  const [selectedUserName, setSelectedUserName] = useState("");

  const loadMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token = getToken();
      if (!token) throw new Error("Token topilmadi");

      const res = await fetch(`${BASE_URL}/users/get-my-gym-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("A'zolarni yuklashda xatolik");

      const json = await res.json();
      const list = Array.isArray(json) ? json : json?.data || [];

      const mapped: MemberRow[] = list.map((u: any) => ({
        fullName:
          `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || "No name",
        email: u.email ?? "-",
        phone: u.phone ?? "-",
        isActive: u.isActive ?? true,
      }));

      setMembers(mapped);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const getUserIdByEmail = async (email: string): Promise<number> => {
    const token = getToken();
    const res = await fetch(
      `${BASE_URL}/users/by-email/${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Foydalanuvchi IDsi topilmadi");
    }

    const data = await res.json();
    return data.id;
  };

  const handleToggleActive = async (member: MemberRow) => {
    const action = member.isActive ? "bloklash" : "faollashtirish";
    if (!window.confirm(`${member.fullName}ni ${action}ni xohlaysizmi?`))
      return;

    try {
      const userId = await getUserIdByEmail(member.email);
      const token = getToken();

      const res = await fetch(`${BASE_URL}/users/activate/${userId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Statusni o'zgartirib bo'lmadi");

      setMembers((prev) =>
        prev.map((m) =>
          m.email === member.email ? { ...m, isActive: !m.isActive } : m,
        ),
      );
    } catch (e: any) {
      alert(e.message);
    }
  };

  // --- CHECK-IN (POST) ---
  const handleCheckIn = async (member: MemberRow) => {
    if (!window.confirm(`${member.fullName} uchun kirish qayd etilsinmi?`))
      return;

    try {
      const token = getToken();
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const userId = await getUserIdByEmail(member.email);

      const memRes = await fetch(
        `${BASE_URL}/user-memberships?gym_id=${CURRENT_GYM_ID}&user_id=${userId}`,
        { headers },
      );

      if (!memRes.ok)
        throw new Error("Membership ma'lumotlarini olib bo'lmadi");

      const memData = await memRes.json();
      const memberships: Membership[] = Array.isArray(memData)
        ? memData
        : memData?.data || [];

      const activeMem = memberships.find(
        (m) => m.isActive === true || m.status === "ACTIVE",
      );

      if (!activeMem) {
        throw new Error("Faol a'zolik (membership) mavjud emas!");
      }

      // POST qilayotganda ham ISO string jo'natamiz.
      // Backend uni UTC deb qabul qiladi, lekin biz ko'rsatishda (GET)
      // formatDate funksiyasi orqali Toshkent vaqtiga aylantiramiz.
      const payload = {
        gym_id: Number(CURRENT_GYM_ID),
        user_id: Number(userId),
        membership_id: Number(activeMem.id),
        check_in_at: new Date().toISOString(),
      };

      const checkInRes = await fetch(`${BASE_URL}/attendances/check-in`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!checkInRes.ok) {
        const errorData = await checkInRes.json();
        throw new Error(errorData.message || "Xatolik yuz berdi");
      }

      alert(`Muvaffaqiyatli kirildi!`);
    } catch (e: any) {
      alert(`Xatolik: ${e.message}`);
    }
  };

  // --- HISTORY (GET) ---
  const handleViewHistory = async (member: MemberRow) => {
    setSelectedUserName(member.fullName);
    setIsModalOpen(true);
    setHistoryLoading(true);
    setAttendanceHistory([]);

    try {
      const userId = await getUserIdByEmail(member.email);
      const token = getToken();

      const res = await fetch(
        `${BASE_URL}/attendances?gym_id=${CURRENT_GYM_ID}&user_id=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!res.ok) throw new Error("Tarixni yuklab bo'lmadi");

      const data = await res.json();
      const list = Array.isArray(data) ? data : data?.data || [];

      // Sanaga qarab sortlash (yangilari tepada)
      // Response dagi maydon checkInAt (camelCase)
      const sortedList = list.sort((a: any, b: any) => {
        const dateA = new Date(a.checkInAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.checkInAt || b.createdAt || 0).getTime();
        return dateB - dateA;
      });

      setAttendanceHistory(sortedList);
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>Member Management</Title>
        <Controls>
          <ActionBtn
            onClick={() => (window.location.href = "/manager/members/create")}
          >
            + Add New Member
          </ActionBtn>
          <ActionBtn onClick={() => loadMembers()} disabled={loading}>
            Refresh
          </ActionBtn>
        </Controls>
      </Header>

      {error && <ErrorText>{error}</ErrorText>}

      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Table>
          <HeadRow>
            <Cell>Member</Cell>
            <Cell>Contacts</Cell>
            <Cell>Status</Cell>
            <Cell>Actions</Cell>
          </HeadRow>

          {members.map((m, index) => (
            <Row key={m.email + index}>
              <Cell>
                <Member>
                  <Avatar>{m.fullName.charAt(0).toUpperCase()}</Avatar>
                  <div>
                    <Name>
                      {index + 1} {m.fullName}
                    </Name>
                  </div>
                </Member>
              </Cell>
              <Cell>
                <div style={{ fontSize: "13px" }}>{m.phone}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>
                  {m.email}
                </div>
              </Cell>
              <Cell>
                <StatusBadge
                  $active={m.isActive}
                  onClick={() => handleToggleActive(m)}
                >
                  {m.isActive ? "Active" : "Inactive"}
                </StatusBadge>
              </Cell>
              <Cell>
                <BtnGroup>
                  <IconBtn
                    onClick={() => handleCheckIn(m)}
                    $variant="primary"
                    disabled={!m.isActive}
                  >
                    Check In
                  </IconBtn>
                  <IconBtn
                    onClick={() => handleViewHistory(m)}
                    $variant="secondary"
                  >
                    History
                  </IconBtn>
                </BtnGroup>
              </Cell>
            </Row>
          ))}
        </Table>
      )}

      <Footer>
        <span>Jami: {members.length} ta a'zo</span>
      </Footer>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>History: {selectedUserName}</h3>
              <CloseBtn onClick={() => setIsModalOpen(false)}>&times;</CloseBtn>
            </ModalHeader>
            <ModalBody>
              {historyLoading ? (
                <Loading style={{ color: "#000" }}>Loading...</Loading>
              ) : attendanceHistory.length === 0 ? (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  Tarix topilmadi
                </div>
              ) : (
                <HistoryList>
                  {attendanceHistory.map((item) => (
                    <HistoryItem key={item.id}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "bold" }}>Check-in</span>
                        {/* Membership nomini ko'rsatish (ixtiyoriy) */}
                        <span style={{ fontSize: "10px", color: "#888" }}>
                          {item.membership?.plan?.name || "Plan noma'lum"}
                        </span>
                      </div>
                      <span className="date">
                        {/* Mana shu yerda to'g'ri maydon checkInAt ishlatildi */}
                        {formatDate(item.checkInAt || item.createdAt)}
                      </span>
                    </HistoryItem>
                  ))}
                </HistoryList>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

export default MemberManagement;
