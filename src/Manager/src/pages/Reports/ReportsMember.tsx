import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import type { AxiosResponse } from "axios";

/* ===================== TYPES ===================== */

interface CurrentPlan {
  gym: string;
  plan: string;
  type: string;
  sessions_left: number | null;
  days_left: number;
  end_date: string;
}

interface LastVisit {
  gym: string;
  date: string;
}

interface Payment {
  date: string;
  plan: string;
  amount: string;
  status: string;
}

interface MemberCurrent {
  current_plan: CurrentPlan;
  last_visits: LastVisit[];
  total_spent: string;
}

interface MemberStats {
  user: {
    name: string;
    email: string;
    avatar: string | null;
  };
  stats: {
    workouts: number;
    calories: number;
    hours: string;
  };
  membership: {
    plan: string;
    status: string;
    expiresAt: string;
  };
  attendance: {
    totalVisits: number;
    streak: number;
    week: Record<string, boolean>;
  };
  perks: Array<{ icon: string; title: string; description: string }>;
  payments: Payment[];
}

/* ===================== API SETUP ===================== */
const api = axios.create({
  baseURL: "https://nt-gym-api.it-mahalla.uz/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ===================== STYLES ===================== */
const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

const Section = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: linear-gradient(180deg, #0b1220, #020617);
  border: 1px solid #1f2937;
  border-radius: 18px;
  padding: 18px;
  overflow: hidden;
`;

const CardTitle = styled.div`
  font-size: 13px;
  color: #94a3b8;
`;

const CardValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-top: 6px;
`;

const Skeleton = styled.div<{ h?: string; w?: string }>`
  height: ${(p) => p.h || "16px"};
  width: ${(p) => p.w || "100%"};
  border-radius: 8px;
  background: linear-gradient(90deg, #020617 25%, #0b1220 37%, #020617 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

/* ===================== COMPONENT ===================== */
const ReportsMember: React.FC = () => {
  const [memberReport, setMemberReport] = useState<{
    current: MemberCurrent;
    stats: MemberStats;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchMemberReport = async () => {
    try {
      setLoading(true);

      const [currentRes, statsRes]: [
        AxiosResponse<MemberCurrent>,
        AxiosResponse<MemberStats>,
      ] = await Promise.all([
        api.get("/reports/member/me?user_id=3"),
        api.get("/reports/member?userId=3"),
      ]);

      setMemberReport({
        current: currentRes.data,
        stats: statsRes.data,
      });
    } catch (err) {
      console.error("Member report error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberReport();
  }, []);

  return (
    <Section>
      <Card>
        <CardTitle>Current Plan</CardTitle>
        {loading ? (
          <Skeleton h="28px" w="120px" />
        ) : (
          <>
            <CardValue>{memberReport?.current.current_plan.plan}</CardValue>
            <div>{memberReport?.current.current_plan.gym}</div>
            <div>Days Left: {memberReport?.current.current_plan.days_left}</div>
            <div>
              End Date:{" "}
              {memberReport?.current.current_plan.end_date
                ? new Date(
                    memberReport.current.current_plan.end_date,
                  ).toLocaleDateString()
                : "-"}
            </div>
          </>
        )}
      </Card>

      <Card>
        <CardTitle>Workout Stats</CardTitle>
        {loading ? (
          <Skeleton h="60px" />
        ) : (
          <div>
            Workouts: {memberReport?.stats.stats.workouts} | Calories:{" "}
            {memberReport?.stats.stats.calories} | Hours:{" "}
            {memberReport?.stats.stats.hours}
          </div>
        )}
      </Card>

      <Card>
        <CardTitle>Last Visits</CardTitle>
        {loading ? (
          <Skeleton h="100px" />
        ) : (
          <div>
            {memberReport?.current.last_visits.map((v, i) => (
              <div key={i}>
                {new Date(v.date).toLocaleString()} - {v.gym}
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <CardTitle>Payments</CardTitle>
        {loading ? (
          <Skeleton h="60px" />
        ) : (
          <div>
            {memberReport?.stats.payments.map((p, i) => (
              <div key={i}>
                {p.date} | {p.plan} | {p.amount} | {p.status}
              </div>
            ))}
          </div>
        )}
      </Card>
    </Section>
  );
};

export default ReportsMember;
