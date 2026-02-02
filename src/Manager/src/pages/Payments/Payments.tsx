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
// Ro'yxatdan keladigan user (ID bo'lmasligi mumkin)
interface BasicUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// To'liq user (ID bilan)
interface User extends BasicUser {
  id: number;
}

interface Plan {
  id: number;
  name: string;
  price: string;
  durationDays: number;
}

interface UserMembership {
  id: number;
  plan_id: number;
  plan: Plan;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

type PaymentType = "PLAN" | "CUSTOM";
type PaymentMethod = "CASH" | "CARD" | "CLICK" | "PAYME";

/* ================= HELPERS ================= */
const API_URL = "https://nt-gym-api.it-mahalla.uz/api";

const getToken = () => {
  const raw = localStorage.getItem("token") || "";
  return raw.replace(/^"+|"+$/g, "").replace(/^Bearer\s/, "");
};

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
    const managerId = decoded.id || decoded.user?.id;
    const gymId = decoded.gymId || decoded.gym_id || decoded.user?.gymId || 1;
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
  // Ro'yxat uchun BasicUser ishlatamiz (chunki ID yo'q)
  const [users, setUsers] = useState<BasicUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State - bu yerda to'liq User (ID bilan) bo'ladi
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentMembership, setCurrentMembership] =
    useState<UserMembership | null>(null);
  const [loadingMembership, setLoadingMembership] = useState(false);
  const [fetchingUserDetail, setFetchingUserDetail] = useState(false); // User ID ni olish uchun loader

  // Payment Form State
  const [paymentType, setPaymentType] = useState<PaymentType>("PLAN");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [method, setMethod] = useState<PaymentMethod>("CASH");
  const [isProcessing, setIsProcessing] = useState(false);

  const token = getToken();
  const tokenData = decodeTokenData();

  // 1. Load Users List (ID siz)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users/get-my-gym-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // API dan kelgan data arrayini set qilamiz
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

  // 2. Load Plans (O'ZGARTIRILDI: gym_id QO'SHILDI)
  useEffect(() => {
    const fetchPlans = async () => {
      // Agar tokenData bo'lmasa yoki gymId yo'q bo'lsa, to'xtatamiz
      if (!tokenData?.gymId) return;

      try {
        // MUHIM O'ZGARISH SHU YERDA: ?gym_id=${tokenData.gymId}
        const res = await fetch(
          `${API_URL}/membership-plans?gym_id=${tokenData.gymId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data || [];
        setPlans(list);
      } catch (err) {
        console.error("Plans error", err);
      }
    };
    fetchPlans();
  }, [token, tokenData?.gymId]); // Dependency ga tokenData.gymId qo'shildi

  // 3. HANDLE ROW CLICK - User ID ni olish
  const handleRowClick = async (email: string) => {
    setFetchingUserDetail(true);
    const toastId = toast.loading("Foydalanuvchi ma'lumotlari yuklanmoqda...");

    try {
      // Email orqali ID bor bo'lgan to'liq ma'lumotni olamiz
      // URL encoded qilinadi (masalan @ belgisi %40 bo'lishi uchun)
      const res = await fetch(
        `${API_URL}/users/by-email/${encodeURIComponent(email)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) throw new Error("Foydalanuvchi ID sini olib bo'lmadi");

      const fullUserData = await res.json();

      // Response tuzilishi har xil bo'lishi mumkin, tekshiramiz
      const userWithId = fullUserData.data || fullUserData;

      if (!userWithId?.id) {
        throw new Error("API ID qaytarmadi");
      }

      // Muvaffaqiyatli - modalni ochamiz
      setSelectedUser(userWithId);
      toast.dismiss(toastId);
    } catch (err) {
      console.error(err);
      toast.error("Foydalanuvchi ma'lumotlarini olishda xatolik", {
        id: toastId,
      });
    } finally {
      setFetchingUserDetail(false);
    }
  };

  // 4. User tanlanganda (ID bor bo'lganda) uning Membershipini yuklash
  useEffect(() => {
    if (selectedUser?.id && tokenData) {
      const fetchMembership = async () => {
        setLoadingMembership(true);
        setCurrentMembership(null);
        setSelectedPlanId("");

        try {
          const res = await fetch(
            `${API_URL}/user-memberships?user_id=${selectedUser.id}&gym_id=${tokenData.gymId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const data = await res.json();
          const memberships = Array.isArray(data) ? data : data.data || [];

          const active =
            memberships.find((m: any) => m.isActive) || memberships[0];

          if (active) {
            setCurrentMembership(active);
            setSelectedPlanId(String(active.plan_id || active.plan?.id));
          }
        } catch (error) {
          console.error("Membership fetch error:", error);
        } finally {
          setLoadingMembership(false);
        }
      };

      fetchMembership();
    }
  }, [selectedUser]); // selectedUser o'zgarganda ishlaydi

  // Handle Payment Logic
  const handlePayment = async () => {
    if (!selectedUser || !selectedUser.id) {
      toast.error("Foydalanuvchi ID si topilmadi");
      return;
    }
    if (!tokenData?.managerId) {
      toast.error("Sessiya eskirgan. Iltimos, qayta kiring.");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("To'lov jarayonda...");

    try {
      let finalAmount = 0;
      let finalMembershipId = currentMembership?.id || null;
      const currentGymId = Number(tokenData.gymId);

      // SUMMANI ANIQLASH
      if (paymentType === "PLAN") {
        if (!selectedPlanId) throw new Error("Iltimos, tarifni tanlang");
        const plan = plans.find((p) => String(p.id) === selectedPlanId);
        if (!plan) throw new Error("Tarif topilmadi");
        finalAmount = parseInt(plan.price);
      } else {
        if (!customAmount || parseInt(customAmount) <= 0) {
          throw new Error("Iltimos, to'g'ri summa kiriting");
        }
        finalAmount = parseInt(customAmount);
      }

      // 1. YANGI MEMBERSHIP (Agar yo'q bo'lsa)
      if (!finalMembershipId) {
        if (!selectedPlanId)
          throw new Error("Yangi a'zo uchun tarif tanlash majburiy!");

        const createRes = await fetch(`${API_URL}/user-memberships`, {
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

        const createData = await createRes.json();
        if (!createRes.ok)
          throw new Error(
            createData.message || "Membership yaratishda xatolik",
          );

        finalMembershipId = createData.id || createData.data?.id;
      }

      // 2. TARIFNI YANGILASH (Agar membership bor bo'lsa va PLAN tanlansa)
      else if (paymentType === "PLAN") {
        const currentPlanId =
          currentMembership?.plan_id || currentMembership?.plan?.id;

        if (Number(selectedPlanId) !== Number(currentPlanId)) {
          const patchRes = await fetch(
            `${API_URL}/user-memberships/${finalMembershipId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                plan_id: Number(selectedPlanId),
              }),
            },
          );

          if (!patchRes.ok)
            throw new Error("Tarifni o'zgartirishda xatolik (Patch)");
        }
      }

      // 3. TO'LOV (PAYMENT)
      const paymentPayload: any = {
        gym_id: currentGymId,
        user_id: Number(selectedUser.id),
        amount: Number(finalAmount),
        method: method,
        received_by_id: Number(tokenData.managerId),
        membership_id: Number(finalMembershipId),
      };

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
        throw new Error(resData.message || "To'lovda xatolik yuz berdi");
      }

      toast.success("To'lov muvaffaqiyatli! ✅", { id: toastId });
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
    setCurrentMembership(null);
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
              <Row
                key={`${u.email}-${index}`}
                onClick={() => !fetchingUserDetail && handleRowClick(u.email)}
                style={{
                  opacity: fetchingUserDetail ? 0.7 : 1,
                  cursor: fetchingUserDetail ? "wait" : "pointer",
                }}
              >
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

              <div style={{ marginTop: "10px", fontSize: "13px" }}>
                {loadingMembership ? (
                  <span style={{ color: "#94a3b8" }}>
                    Checking membership...
                  </span>
                ) : currentMembership ? (
                  <span style={{ color: "#22c55e" }}>
                    Active Plan:{" "}
                    <b>{currentMembership.plan?.name || "Unknown Plan"}</b>
                  </span>
                ) : (
                  <span style={{ color: "#eab308" }}>No Active Membership</span>
                )}
              </div>
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
                <Label>
                  Select Plan {currentMembership && "(Change to update)"}
                </Label>
                <Select
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                >
                  <option value="">-- Choose a plan --</option>
                  {plans.map((p, index) => (
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

            <PayButton
              onClick={handlePayment}
              disabled={isProcessing || loadingMembership}
            >
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
