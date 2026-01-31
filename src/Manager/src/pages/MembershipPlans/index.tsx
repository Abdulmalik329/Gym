import React, { useCallback, useEffect, useState } from "react";
// Barcha stillar bitta joydan import qilinmoqda
import {
  Wrapper,
  Header,
  Title,
  ActionBtn,
  Table,
  HeadRow,
  Row,
  Cell,
  StatusBadge,
  BtnGroup,
  IconBtn,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseBtn,
  Loading,
  ErrorText,
  FormGroup,
} from "./MembershipPlans.styled";

// --- TYPES ---
type MembershipPlan = {
  id: number;
  name: string;
  description?: string;
  tag?: string;
  type: "TIME_BASED" | "SESSION_BASED";
  durationDays: number;
  sessionCount?: number;
  price: number;
  isActive: boolean;
  features?: string[];
};

type PlanFormData = {
  id?: number;
  name: string;
  description: string;
  type: "TIME_BASED" | "SESSION_BASED";
  duration_days: number;
  session_count: number;
  price: number;
  features: string;
};

const BASE_URL = "https://nt-gym-api.it-mahalla.uz/api";
const CURRENT_GYM_ID = 1;

const getToken = () =>
  localStorage.getItem("token")?.replace("Bearer ", "").trim() || "";

const MembershipPlans = () => {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState<PlanFormData>({
    name: "",
    description: "",
    type: "TIME_BASED",
    duration_days: 30,
    session_count: 0,
    price: 0,
    features: "",
  });

  // --- FETCH PLANS ---
  const loadPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token = getToken();
      // Swagger: GET /membership-plans?gym_id=...
      const res = await fetch(
        `${BASE_URL}/membership-plans?gym_id=${CURRENT_GYM_ID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Tariflarni yuklashda xatolik");

      const json = await res.json();
      const list = Array.isArray(json) ? json : json?.data || [];
      setPlans(list);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  // --- HANDLERS ---
  const handleOpenModal = (plan?: MembershipPlan) => {
    if (plan) {
      // EDIT
      setFormData({
        id: plan.id,
        name: plan.name,
        description: plan.description || "",
        type: plan.type,
        duration_days: plan.durationDays,
        session_count: plan.sessionCount || 0,
        price: plan.price,
        features: plan.features ? plan.features.join(", ") : "",
      });
    } else {
      // CREATE
      setFormData({
        name: "",
        description: "",
        type: "TIME_BASED",
        duration_days: 30,
        session_count: 12,
        price: 0,
        features: "",
      });
    }
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Haqiqatan ham bu tarifni o'chirmoqchimisiz?")) return;
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/membership-plans/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok)
        throw new Error(
          "O'chirish imkonsiz (bog'langan a'zolar mavjud bo'lishi mumkin)",
        );

      setPlans((prev) => prev.filter((p) => p.id !== id));
      alert("Tarif o'chirildi");
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const token = getToken();
      // Swagger: POST /membership-plans/activate/{id}
      const res = await fetch(`${BASE_URL}/membership-plans/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Statusni o'zgartirib bo'lmadi");

      // Optimistic update
      setPlans((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive: !currentStatus } : p)),
      );
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError("");

    try {
      const token = getToken();
      const isEdit = !!formData.id;

      const url = isEdit
        ? `${BASE_URL}/membership-plans/${formData.id}`
        : `${BASE_URL}/membership-plans`;

      const method = isEdit ? "PATCH" : "POST";

      const payload = {
        gym_id: CURRENT_GYM_ID,
        name: formData.name,
        description: formData.description,
        type: formData.type,
        duration_days: Number(formData.duration_days),
        session_count:
          formData.type === "SESSION_BASED"
            ? Number(formData.session_count)
            : null,
        price: Number(formData.price),
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f.length > 0),
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.message || "Saqlashda xatolik");
      }

      setIsModalOpen(false);
      loadPlans();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setFormLoading(false);
    }
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
    }).format(val);
  };

  return (
    <Wrapper>
      <Header>
        <Title>Membership Plans</Title>
        <ActionBtn onClick={() => handleOpenModal()}>+ New Plan</ActionBtn>
      </Header>

      {error && !isModalOpen && <ErrorText>{error}</ErrorText>}

      {loading ? (
        <Loading>Yuklanmoqda...</Loading>
      ) : (
        <Table>
          <HeadRow>
            <Cell>Plan Name</Cell>
            <Cell>Type</Cell>
            <Cell>Limits</Cell>
            <Cell>Price</Cell>
            <Cell>Status</Cell>
            <Cell>Actions</Cell>
          </HeadRow>

          {plans.length === 0 && (
            <div style={{ padding: 20, textAlign: "center", color: "#64748b" }}>
              Tariflar mavjud emas
            </div>
          )}

          {plans.map((plan) => (
            <Row key={plan.id}>
              <Cell>
                <div style={{ fontWeight: "bold", color: "#eef3f9" }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: "11px", color: "#b9d2f4" }}>
                  {plan.description?.slice(0, 30)}...
                </div>
              </Cell>
              <Cell style={{ fontSize: "12px", color: "#e7ebf2" }}>
                {plan.type === "TIME_BASED"
                  ? "Vaqtga asoslangan"
                  : "Sessiyaga asoslangan"}
              </Cell>
              <Cell>
                <div style={{ fontSize: "13px", color: "#e0e8f3" }}>
                  {plan.durationDays} kun
                  {plan.type === "SESSION_BASED" &&
                    ` / ${plan.sessionCount} ta`}
                </div>
              </Cell>
              <Cell style={{ fontWeight: 600, color: "#2563eb" }}>
                {formatPrice(plan.price)}
              </Cell>
              <Cell>
                <StatusBadge
                  $active={plan.isActive}
                  onClick={() => handleToggleActive(plan.id, plan.isActive)}
                >
                  {plan.isActive ? "Active" : "Disabled"}
                </StatusBadge>
              </Cell>
              <Cell>
                <BtnGroup>
                  <IconBtn
                    $variant="edit"
                    onClick={() => handleOpenModal(plan)}
                  >
                    Edit
                  </IconBtn>
                  <IconBtn
                    $variant="danger"
                    onClick={() => handleDelete(plan.id)}
                  >
                    Delete
                  </IconBtn>
                </BtnGroup>
              </Cell>
            </Row>
          ))}
        </Table>
      )}

      {/* --- CREATE / EDIT MODAL --- */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>{formData.id ? "Edit Plan" : "Create New Plan"}</h3>
              <CloseBtn onClick={() => setIsModalOpen(false)}>&times;</CloseBtn>
            </ModalHeader>

            <ModalBody>
              {error && <ErrorText>{error}</ErrorText>}

              <form id="planForm" onSubmit={handleSubmit}>
                <FormGroup>
                  <label>Plan Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Standard Monthly"
                  />
                </FormGroup>

                <div style={{ display: "flex", gap: "15px" }}>
                  <FormGroup style={{ flex: 1 }}>
                    <label>Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as any,
                        })
                      }
                    >
                      <option value="TIME_BASED">Vaqt (Time Based)</option>
                      <option value="SESSION_BASED">
                        Sessiya (Session Based)
                      </option>
                    </select>
                  </FormGroup>
                  <FormGroup style={{ flex: 1 }}>
                    <label>Price (UZS)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </FormGroup>
                </div>

                <div style={{ display: "flex", gap: "15px" }}>
                  <FormGroup style={{ flex: 1 }}>
                    <label>Duration (Days)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.duration_days}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration_days: Number(e.target.value),
                        })
                      }
                    />
                  </FormGroup>

                  {formData.type === "SESSION_BASED" && (
                    <FormGroup style={{ flex: 1 }}>
                      <label>Sessions Count</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.session_count}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            session_count: Number(e.target.value),
                          })
                        }
                      />
                    </FormGroup>
                  )}
                </div>

                <FormGroup>
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <label>Features (vergul bilan ajrating)</label>
                  <input
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                    placeholder="Sauna, Pool, Towel..."
                  />
                </FormGroup>
              </form>
            </ModalBody>

            <ModalFooter>
              <ActionBtn
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: "#94a3b8" }}
              >
                Cancel
              </ActionBtn>
              <ActionBtn type="submit" form="planForm" disabled={formLoading}>
                {formLoading ? "Saving..." : "Save Plan"}
              </ActionBtn>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

export default MembershipPlans;
