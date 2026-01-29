import React, { useEffect, useMemo, useState } from "react";
import {
  Wrapper,
  Card,
  Header,
  Title,
  Subtitle,
  Steps,
  StepItem,
  StepCircle,
  StepLabel,
  SectionTitle,
  Grid,
  Group,
  Label,
  Input,
  UploadBox,
  PreviewImage,
  PlanCard,
  PlanTag,
  Option,
  Actions,
  Button,
  SummaryRow,
  Divider,
  Total,
} from "./CreateMember.styled";

/* ===================== TYPES ===================== */
interface Gym {
  name: string;
}

interface Plan {
  id: number;
  gymId: number;
  name: string;
  description: string;
  tag: string | null;
  features: string[];
  type: string;
  durationDays: number;
  price: string;
  isActive: boolean;
  gym: Gym;
}

type PaymentMethod = "CASH" | "CARD" | "ONLINE" | null;

/* ===================== HELPERS ===================== */
const API_BASE = "https://nt-gym-api.it-mahalla.uz";

const getCleanToken = () => {
  const t = (localStorage.getItem("token") || "").trim();
  if (!t) return "";
  const unquoted = t.replace(/^"+|"+$/g, "");
  return unquoted.startsWith("Bearer ") ? unquoted.slice(7).trim() : unquoted;
};

const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const buildUploadUrl = (fileNameOrPath: string) => {
  if (!fileNameOrPath) return "";
  if (fileNameOrPath.startsWith("http")) return fileNameOrPath;
  if (fileNameOrPath.startsWith("/")) return `${API_BASE}${fileNameOrPath}`;
  return `${API_BASE}/uploads/${fileNameOrPath}`;
};

export default function CreateMember() {
  const token = getCleanToken();

  const decodedToken = useMemo(
    () => (token ? decodeJwt(token) : null),
    [token],
  );

  const currentGymId = decodedToken?.gymId || decodedToken?.gym_id || 1;
  const currentManagerId = decodedToken?.id || decodedToken?.user?.id || 1;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    image_url: "",
  });

  const registrationFee = 25000;
  const planPrice = selectedPlan ? parseInt(selectedPlan.price || "0") : 0;
  const total = planPrice + registrationFee;

  /* ===================== PLANS FETCH ===================== */
  useEffect(() => {
    const fetchPlans = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/api/membership-plans`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || "Plans API error");
        }

        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];

        setPlans(list);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setPlans([]);
      }
    };

    if (step === 2) fetchPlans();
  }, [step, token]);

  /* ===================== INPUT HANDLERS ===================== */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  /* ===================== ✅ UPLOAD (FINAL FIX) ===================== */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!token) return alert("Token topilmadi. Login qiling.");

    const file = e.target.files[0];

    // local preview (darrov ko‘rsatish uchun)
    const localPreview = URL.createObjectURL(file);
    setFormData((p) => ({ ...p, image_url: localPreview }));

    const tryUpload = async (fieldName: "image") => {
      const fd = new FormData();
      fd.append(fieldName, file); 

      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: fd,
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Upload failed (${res.status})`);
      }

      const ct = res.headers.get("content-type") || "";
      let raw = "";

      if (ct.includes("application/json")) {
        const result: any = await res.json();
        raw =
          result?.image_url ||
          result?.url ||
          result?.path ||   
          result?.filename ||
          result?.fileName ||
          result?.data?.image_url ||
          result?.data?.url ||
          result?.data?.path ||
          result?.data?.filename ||
          "";
      } else {
        raw = (await res.text()).trim();
      }

      const finalUrl = buildUploadUrl(raw);
      if (!finalUrl) throw new Error("Upload response'dan url/path topilmadi.");

      return finalUrl;
    };

    setUploading(true);
    try {
      let uploadedUrl = "";
        uploadedUrl = await tryUpload("image");


      setFormData((p) => ({ ...p, image_url: uploadedUrl }));
    } catch (err: any) {
      console.error(err);
      alert("Rasm yuklashda xatolik: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.password || !formData.email) {
        alert("Majburiy maydonlarni to'ldiring");
        return;
      }
    }
    if (step === 2 && !selectedPlan) {
      alert("Tarif rejasini tanlang");
      return;
    }
    if (step < 3) setStep((p) => p + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((p) => p - 1);
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async () => {
    if (!selectedPlan || !paymentMethod) return alert("To'lov usulini tanlang");
    if (!token) return alert("Siz tizimga kirmagansiz.");

    setLoading(true);

    try {
      // 1) USER CREATE
      const userRes = await fetch(`${API_BASE}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          photo: formData.image_url, 
          gym_id: currentGymId,
        }),
      });

      if (!userRes.ok) {
        const t = await userRes.text();
        if (userRes.status === 409) {
          throw new Error("Bu email allaqachon mavjud. Boshqa email kiriting.");
        }
        throw new Error(`User yaratishda xato: ${t}`);
      }

      const userData = await userRes.json();
      const userId = userData?.id || userData?.data?.id;
      if (!userId) throw new Error("User ID topilmadi (backend response).");

      // 2) MEMBERSHIP CREATE
      const membershipRes = await fetch(`${API_BASE}/api/user-memberships`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          plan_id: selectedPlan.id,
          gym_id: currentGymId,
          start_date: new Date().toISOString(),
        }),
      });

      if (!membershipRes.ok) {
        const t = await membershipRes.text();
        throw new Error("Membership xatosi: " + t);
      }

      const membershipData = await membershipRes.json();
      const membershipId =
        membershipData?.id ||
        membershipData?.data?.id ||
        membershipData?.membership_id ||
        null;

      // 3) PAYMENT CREATE
      const paymentRes = await fetch(`${API_BASE}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gym_id: currentGymId,
          user_id: userId,
          membership_id: membershipId || selectedPlan.id,
          amount: total,
          method: paymentMethod,
          received_by_id: currentManagerId,
        }),
      });

      if (!paymentRes.ok) {
        const t = await paymentRes.text();
        throw new Error("To'lovda xatolik: " + t);
      }

      alert("Member muvaffaqiyatli create qilindi ✅");

      setStep(1);
      setSelectedPlan(null);
      setPaymentMethod(null);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        image_url: "",
      });
    } catch (err: any) {
      console.error(err);
      alert(`Xatolik: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Header>
          <Title>Create New Member</Title>
          <Subtitle>
            Manager: <b>ID {currentManagerId}</b> | Gym:{" "}
            <b>ID {currentGymId}</b>
          </Subtitle>
        </Header>

        <Steps>
          <StepItem $active={step === 1}>
            <StepCircle $active={step >= 1}>1</StepCircle>
            <StepLabel>Personal</StepLabel>
          </StepItem>

          <StepItem $active={step === 2}>
            <StepCircle $active={step >= 2}>2</StepCircle>
            <StepLabel>Membership</StepLabel>
          </StepItem>

          <StepItem $active={step === 3}>
            <StepCircle $active={step >= 3}>3</StepCircle>
            <StepLabel>Payment</StepLabel>
          </StepItem>
        </Steps>

        {step === 1 && (
          <>
            <SectionTitle>Personal Information</SectionTitle>

            <div style={{ marginBottom: 20 }}>
              <input
                type="file"
                id="file-upload"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />

              <UploadBox
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                {formData.image_url ? (
                  <PreviewImage src={formData.image_url} alt="Profile" />
                ) : (
                  <div style={{ fontSize: 24, color: "#3b82f6" }}>📷</div>
                )}

                <p style={{ color: "#3b82f6", fontSize: 14, marginTop: 8 }}>
                  {uploading ? "Yuklanmoqda..." : "Rasm yuklash"}
                </p>
              </UploadBox>
            </div>

            <Grid>
              <Group>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                />
              </Group>

              <Group>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </Group>

              <Group>
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+998..."
                />
              </Group>

              <Group>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@gmail.com"
                />
              </Group>

              <Group style={{ gridColumn: "span 2" }}>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </Group>
            </Grid>
          </>
        )}

        {step === 2 && (
          <>
            <SectionTitle>Select a Plan</SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  $active={selectedPlan?.id === plan.id}
                  onClick={() => setSelectedPlan(plan)}
                >
                  {plan.tag && <PlanTag>{plan.tag}</PlanTag>}
                  <div style={{ fontWeight: 800 }}>{plan.name}</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>
                    {plan.description}
                  </div>
                  <div
                    style={{ color: "#3b82f6", fontWeight: 900, marginTop: 8 }}
                  >
                    {parseInt(plan.price).toLocaleString()} UZS
                  </div>
                </PlanCard>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <SectionTitle>Payment Method</SectionTitle>
            <Grid>
              <Option
                $active={paymentMethod === "CASH"}
                onClick={() => setPaymentMethod("CASH")}
              >
                💵 Cash
              </Option>
              <Option
                $active={paymentMethod === "CARD"}
                onClick={() => setPaymentMethod("CARD")}
              >
                💳 Card
              </Option>
              <Option
                $active={paymentMethod === "ONLINE"}
                onClick={() => setPaymentMethod("ONLINE")}
              >
                🌐 Online
              </Option>
            </Grid>
          </>
        )}

        <Actions>
          {step > 1 && <Button onClick={handleBack}>Back</Button>}
          {step < 3 ? (
            <Button $primary onClick={handleNext} disabled={uploading}>
              Next Step
            </Button>
          ) : (
            <Button
              $primary
              onClick={handleSubmit}
              disabled={loading || uploading}
            >
              {loading ? "Jarayonda..." : "Confirm & Pay"}
            </Button>
          )}
        </Actions>
      </Card>

      <Card>
        <Header>
          <Title>Summary</Title>
        </Header>

        {formData.firstName && (
          <div
            style={{
              marginBottom: 18,
              paddingBottom: 18,
              borderBottom: "1px solid #1f2937",
            }}
          >
            <div style={{ fontWeight: 800 }}>
              {formData.firstName} {formData.lastName}
            </div>
            {formData.image_url && (
              <div style={{ marginTop: 8, opacity: 0.9, fontSize: 12 }}>
                image_url: {formData.image_url}
              </div>
            )}
          </div>
        )}

        <SummaryRow>
          <span>Ro'yxatdan o'tish</span>
          <span>{registrationFee.toLocaleString()} UZS</span>
        </SummaryRow>

        {selectedPlan && (
          <SummaryRow>
            <span>{selectedPlan.name}</span>
            <span>{parseInt(selectedPlan.price).toLocaleString()} UZS</span>
          </SummaryRow>
        )}

        <Divider />

        <Total>
          {total.toLocaleString()}{" "}
          <span style={{ fontSize: 14, color: "#94a3b8" }}>UZS</span>
        </Total>
      </Card>
    </Wrapper>
  );
}
