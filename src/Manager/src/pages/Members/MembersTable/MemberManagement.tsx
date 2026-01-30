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
  Sub,
  Footer,
  ErrorText,
  Loading,
} from "./MemberManagement.styled";
type GymUserApi = {
  id?: number; 
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

type MemberRow = {
  id: number; 
  fullName: string;
  email: string;
  phone: string;
  status: "ACTIVE";
};


const API_URL = "https://nt-gym-api.it-mahalla.uz/api/users/get-my-gym-users";

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

const normalizeUsers = (json: any): GymUserApi[] => {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.users)) return json.users;
  if (Array.isArray(json?.rows)) return json.rows;
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
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMembers = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();
      if (!token) {
        setMembers([]);
        setError(
          "Token topilmadi. Login qiling va token saqlanayotganini tekshiring.",
        );
        return;
      }

      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
        throw new Error(`Members error (${res.status}): ${t || "Error"}`);
      }

      const json = await res.json();
      const list = normalizeUsers(json);

      const mapped: MemberRow[] = list.map((u, idx) => ({
        id: u.id ?? idx + 1, // ✅ backend id bo‘lsa shuni oladi
        fullName:
          `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || "No name",
        email: u.email ?? "-",
        phone: u.phone ?? "-",
        status: "ACTIVE",
      }));

      setMembers(mapped);
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      console.error(e);
      setMembers([]);
      setError(e?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadMembers(controller.signal);
    return () => controller.abort();
  }, [loadMembers]);

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
            {loading ? "..." : "Refresh"}
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
            <Cell>Email</Cell>
            <Cell>Phone</Cell>
            <Cell>Status</Cell>
            <Cell>Id</Cell>
          </HeadRow>

          {members.length === 0 ? (
            <Loading>No members found</Loading>
          ) : (
            members.map((m) => (
              <Row key={m.id}>
                <Cell>
                  <Member>
                    <Avatar>
                      {(m.fullName || "U").charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <Name>{m.fullName}</Name>
                    </div>
                  </Member>
                </Cell>

                <Cell>{m.email}</Cell>
                <Cell>{m.phone}</Cell>
                <Cell>{m.status}</Cell>

                <Cell style={{ color: "#94a3b8", fontWeight: 700 }}>
                  {m.id}
                </Cell>
              </Row>
            ))
          )}
        </Table>
      )}

      <Footer>
        <span>Showing {members.length} members</span>
        <span>Updated from backend</span>
      </Footer>
    </Wrapper>
  );
};

export default MemberManagement;
