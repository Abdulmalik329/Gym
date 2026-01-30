import React, { useEffect, useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Wrapper,
  Header,
  Title,
  Table,
  HeadRow,
  Row,
  Cell,
  Member,
  Avatar,
  Overlay,
  ModalContent,
  ModalHeader,
  CloseBtn,
  UserInfo,
  UserName,
  UserDetail,
  Tabs,
  Tab,
  Label,
  Input,
  Select,
  PaymentMethods,
  MethodCard,
  PayButton,
  Loading,
} from "./Payments.styled";

/* ================= TYPES ================= */
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Plan {
  id: number;
  name: string;
  price: string;
  durationDays: number;
}

type PaymentType = "PLAN" | "CUSTOM";
type PaymentMethod = "CASH" | "CARD" | "CLICK" | "PAYME";

/* ================= HELPERS ================= */
const API_URL = "https://nt-gym-api.it-mahalla.uz/api";

const getToken = () => {
  const raw = localStorage.getItem("token") || "";
  return raw.replace(/^"+|"+$/g, "").replace(/^Bearer\s/, "");
};

// Tokendan ma'lumotlarni xavfsiz olish
const decodeTokenData = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    const decoded = JSON.parse(jsonPayload);

    // Token ichida har xil joylashgan bo'lishi mumkin, hammasini tekshiramiz
    const managerId = decoded.id || decoded.user?.id;
    const gymId = decoded.gymId || decoded.gym_id || decoded.user?.gymId || 1; // Default 1

    return { managerId, gymId };
  } catch (e) {
    console.error("Token decode error:", e);
    return null;
  }
};

const formatPrice = (price: string | number) => {
  return parseInt(String(price)).toLocaleString("uz-UZ");
};

/* ================= COMPONENT ================= */
const Payments: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Payment Form State
  const [paymentType, setPaymentType] = useState<PaymentType>("PLAN");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [method, setMethod] = useState<PaymentMethod>("CASH");
  const [isProcessing, setIsProcessing] = useState(false);

  const token = getToken();
  const tokenData = decodeTokenData();

  // 1. Load Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users/get-my-gym-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // API array yoki { data: [] } qaytarishi mumkin
        if (Array.isArray(data)) setUsers(data);
        else if (Array.isArray(data.data)) setUsers(data.data);
        else setUsers([]);
      } catch (err) {
        console.error(err);
        toast.error("Foydalanuvchilarni yuklashda xatolik!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  // 2. Load Plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_URL}/membership-plans`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data || [];
        setPlans(list);
      } catch (err) {
        console.error("Plans error", err);
      }
    };
    fetchPlans();
  }, [token]);

  // Handle Submit
  const handlePayment = async () => {
    if (!selectedUser) return;
    if (!tokenData?.managerId) {
      toast.error("Sessiya eskirgan. Iltimos, qayta kiring.");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Jarayonda...");

    try {
      let finalAmount = 0;
      let membershipId = null;
      const currentGymId = Number(tokenData.gymId);

      // ---------------------------------------------
      // 1-QADAM: Membership yaratish (Agar PLAN bo'lsa)
      // ---------------------------------------------
      if (paymentType === "PLAN") {
        if (!selectedPlanId) throw new Error("Iltimos, tarifni tanlang");

        const plan = plans.find((p) => String(p.id) === selectedPlanId);
        if (!plan) throw new Error("Tarif topilmadi");
        finalAmount = parseInt(plan.price);

        // Membership API ga so'rov
        const memRes = await fetch(`${API_URL}/user-memberships`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: Number(selectedUser.id),
            plan_id: Number(selectedPlanId),
            gym_id: currentGymId,
            start_date: new Date().toISOString(),
          }),
        });

        const memData = await memRes.json();

        if (!memRes.ok) {
          // Xatolikni chiroyli qilib ko'rsatish
          const message = memData.message || "Membership yaratishda xatolik";
          throw new Error(Array.isArray(message) ? message[0] : message);
        }

        membershipId = memData.id || memData.data?.id;
      } else {
        // CUSTOM to'lov
        if (!customAmount || parseInt(customAmount) <= 0) {
          throw new Error("Iltimos, to'g'ri summa kiriting");
        }
        finalAmount = parseInt(customAmount);
      }

      // ---------------------------------------------
      // 2-QADAM: To'lovni amalga oshirish
      // ---------------------------------------------
      const paymentPayload: any = {
        gym_id: currentGymId,
        user_id: Number(selectedUser.id),
        amount: Number(finalAmount),
        method: method,
        received_by_id: Number(tokenData.managerId),
      };

      if (membershipId) {
        paymentPayload.membership_id = Number(membershipId);
      }

      console.log("Sending Payment:", paymentPayload); // Debug uchun

      const payRes = await fetch(`${API_URL}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentPayload),
      });

      const resData = await payRes.json();

      if (!payRes.ok) {
        const message = resData.message || "To'lovda xatolik yuz berdi";
        throw new Error(Array.isArray(message) ? message[0] : message);
      }

      toast.success("Muvaffaqiyatli! ✅", { id: toastId });
      closeModal();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Xatolik yuz berdi", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setPaymentType("PLAN");
    setSelectedPlanId("");
    setCustomAmount("");
  };

  const displayTotal = useMemo(() => {
    if (paymentType === "PLAN" && selectedPlanId) {
      const p = plans.find((x) => String(x.id) === selectedPlanId);
      return p ? parseInt(p.price) : 0;
    }
    if (paymentType === "CUSTOM") {
      return customAmount ? parseInt(customAmount) : 0;
    }
    return 0;
  }, [paymentType, selectedPlanId, customAmount, plans]);

  return (
    <Wrapper>
      {/* Toast Notification Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />

      <Header>
        <Title>Payments & Transactions</Title>
      </Header>

      {loading ? (
        <Loading>Loading users...</Loading>
      ) : (
        <Table>
          <HeadRow>
            <Cell>Member</Cell>
            <Cell>Email</Cell>
            <Cell>Phone</Cell>
            <Cell style={{ textAlign: "right" }}>Action</Cell>
          </HeadRow>

          {users.length === 0 ? (
            <Loading>No members found</Loading>
          ) : (
            users.map((u, index) => (
              // FIX: unique key = id + index (takrorlanishni oldini olish uchun)
              <Row key={`${u.id}-${index}`} onClick={() => setSelectedUser(u)}>
                <Cell>
                  <Member>
                    <Avatar>{u.firstName?.charAt(0) || "U"}</Avatar>
                    <div style={{ fontWeight: 600, color: "#fff" }}>
                      {u.firstName} {u.lastName}
                    </div>
                  </Member>
                </Cell>
                <Cell>{u.email}</Cell>
                <Cell>{u.phone}</Cell>
                <Cell style={{ textAlign: "right" }}>
                  <span
                    style={{
                      color: "#3b82f6",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    + PAY
                  </span>
                </Cell>
              </Row>
            ))
          )}
        </Table>
      )}

      {/* ================= PAYMENT MODAL ================= */}
      {selectedUser && (
        <Overlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <Title>New Payment</Title>
              <CloseBtn onClick={closeModal}>&times;</CloseBtn>
            </ModalHeader>

            <UserInfo>
              <UserName>
                {selectedUser.firstName} {selectedUser.lastName}
              </UserName>
              <UserDetail>
                {selectedUser.phone} • {selectedUser.email}
              </UserDetail>
            </UserInfo>

            <Tabs>
              <Tab
                $active={paymentType === "PLAN"}
                onClick={() => setPaymentType("PLAN")}
              >
                Membership Plan
              </Tab>
              <Tab
                $active={paymentType === "CUSTOM"}
                onClick={() => setPaymentType("CUSTOM")}
              >
                Custom Amount
              </Tab>
            </Tabs>

            {paymentType === "PLAN" ? (
              <>
                <Label>Select Plan</Label>
                <Select
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                >
                  <option value="">-- Choose a plan --</option>
                  {plans.map((p, index) => (
                    // FIX: unique key
                    <option key={`${p.id}-${index}`} value={p.id}>
                      {p.name} - {formatPrice(p.price)} UZS ({p.durationDays}{" "}
                      days)
                    </option>
                  ))}
                </Select>
              </>
            ) : (
              <>
                <Label>Enter Amount (UZS)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 50000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </>
            )}

            <Label>Payment Method</Label>
            <PaymentMethods>
              {(["CASH", "CARD", "CLICK", "PAYME"] as PaymentMethod[]).map(
                (m) => (
                  <MethodCard
                    key={m}
                    $active={method === m}
                    onClick={() => setMethod(m)}
                  >
                    {m}
                  </MethodCard>
                ),
              )}
            </PaymentMethods>

            <PayButton onClick={handlePayment} disabled={isProcessing}>
              {isProcessing
                ? "Processing..."
                : `Confirm Payment: ${displayTotal.toLocaleString()} UZS`}
            </PayButton>
          </ModalContent>
        </Overlay>
      )}
    </Wrapper>
  );
};

export default Payments;
