import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import type { AxiosResponse } from "axios";
import ReportsMember from "./ReportsMember";


interface ManagerStats {
  monthly_revenue: string;
  active_members_count: number;
  today_attendance_count: number;
  users_expiring_soon: Array<{ name: string; email: string }>;
}

interface RevenueChartItem {
  month: string;
  amount: number;
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

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  color: #e5e7eb;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  color: #fff;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background: linear-gradient(180deg, #0b1220, #020617);
  border: 1px solid #1f2937;
  border-radius: 18px;
  padding: 18px;
  position: relative;
  overflow: hidden;
`;

const CardTitle = styled.div`
  font-size: 13px;
  color: #94a3b8;
`;

const CardValue = styled.div`
  font-size: 26px;
  font-weight: 800;
  margin-top: 6px;
`;

const Badge = styled.span<{ type?: "success" | "warning" | "primary" }>`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${(p) =>
    p.type === "success"
      ? "rgba(34,197,94,0.15)"
      : p.type === "warning"
        ? "rgba(245,158,11,0.15)"
        : "rgba(59,130,246,0.15)"};
  color: ${(p) =>
    p.type === "success"
      ? "#22c55e"
      : p.type === "warning"
        ? "#f59e0b"
        : "#3b82f6"};
`;

const Skeleton = styled.div<{ h?: string; w?: string }>`
  height: ${(p) => p.h || "16px"};
  width: ${(p) => p.w || "100%"};
  border-radius: 8px;
  background: linear-gradient(90deg, #020617 25%, #0b1220 37%, #020617 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

/* ===================== HELPERS ===================== */
const formatMoney = (v?: string | number) =>
  v ? Number(v).toLocaleString("uz-UZ") + " so'm" : "0";

/* ===================== COMPONENT ===================== */
const ReportsMain: React.FC = () => {
  const [managerStats, setManagerStats] = useState<ManagerStats | null>(null);
  const [revenueChart, setRevenueChart] = useState<RevenueChartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [statsRes, chartRes]: [
        AxiosResponse<ManagerStats>,
        AxiosResponse<RevenueChartItem[]>,
      ] = await Promise.all([
        api.get("/reports/gym-manager?gym_id=1"),
        api.get("/reports/gym-manager/revenue-chart?gym_id=1"),
      ]);

      setManagerStats(statsRes.data);
      setRevenueChart(chartRes.data);
    } catch (err) {
      console.error("Reports fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Page>
      <Header>
        <Title>Reports</Title>
      </Header>

      <Grid>
        <Card>
          <CardTitle>Monthly Revenue</CardTitle>
          {loading ? (
            <Skeleton h="28px" w="120px" />
          ) : (
            <CardValue>{formatMoney(managerStats?.monthly_revenue)}</CardValue>
          )}
          <Badge type="success">This month</Badge>
        </Card>

        <Card>
          <CardTitle>Active Members</CardTitle>
          {loading ? (
            <Skeleton h="28px" w="60px" />
          ) : (
            <CardValue>{managerStats?.active_members_count}</CardValue>
          )}
          <Badge type="primary">Currently</Badge>
        </Card>

        <Card>
          <CardTitle>Today Attendance</CardTitle>
          {loading ? (
            <Skeleton h="28px" w="60px" />
          ) : (
            <CardValue>{managerStats?.today_attendance_count}</CardValue>
          )}
          <Badge type="success">Today</Badge>
        </Card>

        <Card>
          <CardTitle>Expiring Soon</CardTitle>
          {loading ? (
            <Skeleton h="28px" w="60px" />
          ) : (
            <CardValue>
              {managerStats?.users_expiring_soon?.length || 0}
            </CardValue>
          )}
          <Badge type="warning">Attention</Badge>
        </Card>
      </Grid>

      <Card>
        <CardTitle>Revenue Trend</CardTitle>
        {loading ? (
          <div style={{ marginTop: 14 }}>
            <Skeleton h="180px" />
          </div>
        ) : (
          <div style={{ marginTop: 14 }}>
            {revenueChart.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #1f2937",
                  fontSize: 13,
                }}
              >
                <span>{m.month}</span>
                <strong>{formatMoney(m.amount)}</strong>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ===================== MEMBER REPORT ===================== */}
      <ReportsMember />
    </Page>
  );
};

export default ReportsMain;
