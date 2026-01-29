import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/* ================= STYLED COMPONENTS ================= */

const Wrapper = styled.div`
  background: linear-gradient(180deg, #0f1318, #0b0e13);
  border-radius: 20px;
  border: 1px solid #1f2937;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  background: #111827;
  border: 1px solid #1f2937;
  color: #fff;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
`;

const Table = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1.6fr 1.2fr 1fr 1.4fr;
  align-items: center;
  padding: 16px 12px;
  border-bottom: 1px solid #1f2937;
`;

const HeadRow = styled(Row)`
  padding: 12px;
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
`;

const Cell = styled.div`
  font-size: 14px;
  color: #e5e7eb;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
`;

const Name = styled.div`
  font-weight: 600;
  color: #fff;
`;

const Email = styled.div`
  font-size: 12px;
  color: #64748b;
`;

const Badge = styled.span<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: ${(props) =>
    props.$active ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)"};
  color: ${(props) => (props.$active ? "#22c55e" : "#ef4444")};
`;

const ActionBtn = styled.button<{ $clickable?: boolean }>`
  background: #111827;
  border: 1px solid #1f2937;
  color: #fff;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};

  &:hover {
    opacity: ${(props) => (props.$clickable ? 0.9 : 1)};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  font-size: 12px;
  color: #64748b;
`;

const Pagination = styled.div`
  display: flex;
  gap: 10px;
`;

const PageBtn = styled.button`
  background: #111827;
  border: 1px solid #1f2937;
  color: #fff;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

/* ================= TYPES ================= */

type MembershipApi = {
  id: number;
  user_id: number;
  status?: number; // 1 active bo‘lishi mumkin
  start_date?: string;
  end_date?: string;
};

type UserApi = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
};

interface MemberType {
  membershipId: number;
  userId: number;
  status: number; // default 0
  startDate: string;
  endDate: string;
  name: string;
  email: string;
}

/* ================= HELPERS ================= */

const API_BASE = "https://nt-gym-api.it-mahalla.uz";
const MEMBERSHIPS_URL = `${API_BASE}/api/user-memberships`;
const USER_URL = (id: number) => `${API_BASE}/api/users/${id}`;

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : "";
};

const getToken = () => {
  const ls = (localStorage.getItem("token") || "").trim();
  const ss = (sessionStorage.getItem("token") || "").trim();
  const ck = (getCookie("token") || "").trim();

  const raw = (ls || ss || ck).trim();
  if (!raw) return "";

  return raw.startsWith("Bearer ") ? raw.slice(7).trim() : raw;
};

const normalizeMemberships = (json: any): MembershipApi[] => {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.rows)) return json.rows;
  if (Array.isArray(json?.memberships)) return json.memberships;
  return [];
};

const safeText = async (res: Response) => {
  try {
    return await res.text();
  } catch {
    return "";
  }
};

/* ================= COMPONENT ================= */

const MemberManagement: React.FC = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState<MemberType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  const token = useMemo(() => getToken(), []);

  const loadMembers = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setLoading(true);
        setError("");

        const freshToken = getToken(); // har safar yangisini olamiz
        if (!freshToken) {
          setMembers([]);
          setError(
            "Token topilmadi. Login qiling va token localStorage/sessionStorage'ga yozilganini tekshiring.",
          );
          return;
        }

        // 1) memberships
        const res = await fetch(MEMBERSHIPS_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${freshToken}`,
            Accept: "application/json",
          },
          signal,
        });

        if (res.status === 401) {
          setMembers([]);
          setError(
            "401 Unauthorized. Token eskirgan yoki noto‘g‘ri. Qayta login qiling.",
          );
          return;
        }

        if (!res.ok) {
          const t = await safeText(res);
          throw new Error(`Memberships error (${res.status}): ${t || "Error"}`);
        }

        const membershipsJson = await res.json();
        const memberships = normalizeMemberships(membershipsJson);

        // 2) agar bo‘sh bo‘lsa
        if (!memberships.length) {
          setMembers([]);
          return;
        }

        // 3) userlarni parallel olib kelamiz
        const usersWithInfo: MemberType[] = await Promise.all(
          memberships.map(async (m) => {
            const userRes = await fetch(USER_URL(m.user_id), {
              method: "GET",
              headers: {
                Authorization: `Bearer ${freshToken}`,
                Accept: "application/json",
              },
              signal,
            });

            if (userRes.status === 401) {
              // agar membership ok bo‘lib, user 401 bo‘lsa ham token muammo
              throw new Error(
                "401 Unauthorized (users). Token eskirgan yoki ruxsat yo‘q.",
              );
            }

            if (!userRes.ok) {
              const t = await safeText(userRes);
              // user topilmasa ham listni buzmaymiz
              return {
                membershipId: m.id,
                userId: m.user_id,
                status: Number(m.status ?? 0),
                startDate: m.start_date ?? "-",
                endDate: m.end_date ?? "-",
                name: "Unknown",
                email: "-",
              } satisfies MemberType;
            }

            const userJson: any = await userRes.json();

            // ba’zan backend {data:{...}} qaytarishi mumkin
            const u: UserApi = userJson?.data ?? userJson;

            const fullName =
              `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim();

            return {
              membershipId: m.id,
              userId: m.user_id,
              status: Number(m.status ?? 0),
              startDate: m.start_date ?? "-",
              endDate: m.end_date ?? "-",
              name: fullName || "No name",
              email: u.email ?? "-",
            } satisfies MemberType;
          }),
        );

        setMembers(usersWithInfo);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error("Backend error:", err);
        setMembers([]);
        setError(err?.message || "Backend error");
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadMembers(controller.signal);
    return () => controller.abort();
  }, [loadMembers]);

  const filteredMembers = members.filter((m) => {
    if (filter === "ALL") return true;
    if (filter === "ACTIVE") return m.status === 1;
    return m.status !== 1;
  });

  if (loading)
    return <div style={{ color: "#fff", padding: 20 }}>Loading...</div>;

  return (
    <Wrapper>
      <Header>
        <Title>Member Management</Title>

        <Controls>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="ALL">All Members</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </Select>

          <ActionBtn $clickable onClick={() => loadMembers()} title="Refresh">
            Refresh
          </ActionBtn>
        </Controls>
      </Header>

      {error && (
        <div style={{ color: "#fecaca", marginBottom: 12, fontSize: 13 }}>
          {error}
        </div>
      )}

      <Table>
        <HeadRow>
          <Cell>Member Name</Cell>
          <Cell>Email</Cell>
          <Cell>User ID</Cell>
          <Cell>Status</Cell>
          <Cell>Actions</Cell>
        </HeadRow>

        {filteredMembers.map((m) => (
          <Row key={m.membershipId}>
            <Member>
              <Avatar>{(m.name || "U").charAt(0).toUpperCase()}</Avatar>
              <div>
                <Name>{m.name}</Name>
                <Email>{m.email}</Email>
              </div>
            </Member>

            <Cell>{m.email}</Cell>
            <Cell>{m.userId}</Cell>

            <Cell>
              <Badge $active={m.status === 1}>
                {m.status === 1 ? "ACTIVE" : "INACTIVE"}
              </Badge>
            </Cell>

            <Cell>
              <ActionBtn
                $clickable
                onClick={() => navigate(`/members/details/${m.userId}`)}
              >
                Details
              </ActionBtn>
            </Cell>
          </Row>
        ))}
      </Table>

      <Footer>
        <span>Showing {filteredMembers.length} members</span>
        <Pagination>
          <PageBtn type="button">Previous</PageBtn>
          <PageBtn type="button">Next</PageBtn>
        </Pagination>
      </Footer>
    </Wrapper>
  );
};

export default MemberManagement;
