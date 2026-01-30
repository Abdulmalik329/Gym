import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Header,
  Title,
  Subtitle,
  StatsGrid,
  ContentGrid,
  Card,
  CardHeader,
  CardTitle,
  CardValue,
  Badge,
  Skeleton,
  ChartList,
  ChartItem,
  ProgressBarContainer,
  ProgressBar,
  SectionHeader,
  ListRow,
  RowText,
  RowSubText,
} from "./Reports.styled";

/* ===================== TYPES ===================== */
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

interface MemberReportData {
  current_plan: {
    plan: string;
    gym: string;
    days_left: number;
    end_date: string;
  };
  last_visits: Array<{ gym: string; date: string }>;
  payments: Array<{ date: string; amount: string; status: string }>;
  stats: { workouts: number; calories: number; hours: string };
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

/* ===================== HELPER FUNCTIONS ===================== */
const formatMoney = (v?: string | number) => {
  if (!v) return "0 UZS";
  return Number(v).toLocaleString("uz-UZ") + " UZS";
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

/* ===================== COMPONENT ===================== */
const Reports: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [managerStats, setManagerStats] = useState<ManagerStats | null>(null);
  const [revenueChart, setRevenueChart] = useState<RevenueChartItem[]>([]);
  const [memberData, setMemberData] = useState<MemberReportData | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Barcha so'rovlarni parallel yuboramiz
        const [statsRes, chartRes, memberRes, memberStatsRes] =
          await Promise.all([
            api.get("/reports/gym-manager?gym_id=1"),
            api.get("/reports/gym-manager/revenue-chart?gym_id=1"),
            api.get("/reports/member/me?user_id=3"), // Hozircha hardcoded ID
            api.get("/reports/member?userId=3"),
          ]);

        setManagerStats(statsRes.data);
        setRevenueChart(chartRes.data);

        // Member ma'lumotlarini birlashtiramiz
        setMemberData({
          ...memberRes.data,
          payments: memberStatsRes.data.payments,
          stats: memberStatsRes.data.stats,
        });
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Chart uchun maksimal qiymatni topish (progress bar uchun)
  const maxRevenue =
    revenueChart.length > 0
      ? Math.max(...revenueChart.map((i) => i.amount))
      : 1;

  return (
    <Container>
      <Header>
        <Title>Reports & Analytics</Title>
        <Subtitle>Overview of gym performance and member statistics</Subtitle>
      </Header>

      {/* --- MANAGER STATS (4 Cards) --- */}
      <StatsGrid>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <Badge type="success">Monthly</Badge>
          </CardHeader>
          {loading ? (
            <Skeleton h="32px" w="140px" />
          ) : (
            <CardValue>{formatMoney(managerStats?.monthly_revenue)}</CardValue>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Members</CardTitle>
            <Badge type="primary">Live</Badge>
          </CardHeader>
          {loading ? (
            <Skeleton h="32px" w="60px" />
          ) : (
            <CardValue>{managerStats?.active_members_count}</CardValue>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
            <Badge type="success">Today</Badge>
          </CardHeader>
          {loading ? (
            <Skeleton h="32px" w="60px" />
          ) : (
            <CardValue>{managerStats?.today_attendance_count}</CardValue>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
            <Badge type="warning">Action Needed</Badge>
          </CardHeader>
          {loading ? (
            <Skeleton h="32px" w="60px" />
          ) : (
            <CardValue>
              {managerStats?.users_expiring_soon?.length || 0}
            </CardValue>
          )}
        </Card>
      </StatsGrid>

      {/* --- DETAILED CONTENT --- */}
      <ContentGrid>
        {/* Revenue Trend Chart (Visual Bars) */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          {loading ? (
            <Skeleton h="200px" />
          ) : (
            <ChartList>
              {revenueChart.map((item, index) => (
                <ChartItem key={index}>
                  <div style={{ width: "60px", color: "#94a3b8" }}>
                    {item.month}
                  </div>
                  <ProgressBarContainer>
                    <ProgressBar width={(item.amount / maxRevenue) * 100} />
                  </ProgressBarContainer>
                  <div
                    style={{
                      width: "100px",
                      textAlign: "right",
                      fontWeight: "bold",
                      color: "#e2e8f0",
                    }}
                  >
                    {formatMoney(item.amount)}
                  </div>
                </ChartItem>
              ))}
            </ChartList>
          )}
        </Card>

        {/* Member Insights (Expiring Users List) */}
        <Card>
          <CardHeader>
            <CardTitle>Members Expiring Soon</CardTitle>
          </CardHeader>
          {loading ? (
            <Skeleton h="200px" />
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {managerStats?.users_expiring_soon?.slice(0, 5).map((user, i) => (
                <ListRow key={i}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <RowText>{user.name}</RowText>
                    <RowSubText>{user.email}</RowSubText>
                  </div>
                  <Badge type="danger">Expiring</Badge>
                </ListRow>
              ))}
              {!managerStats?.users_expiring_soon?.length && (
                <RowSubText style={{ textAlign: "center", padding: "20px" }}>
                  No expiring members
                </RowSubText>
              )}
            </div>
          )}
        </Card>
      </ContentGrid>

      {/* --- INDIVIDUAL MEMBER REPORTS (Example Section) --- */}
      <div style={{ marginTop: "12px" }}>
        <SectionHeader>Member Performance </SectionHeader>
        <StatsGrid>
          <Card>
            <CardTitle>Plan Status</CardTitle>
            {loading ? (
              <Skeleton h="40px" />
            ) : (
              <div style={{ marginTop: 8 }}>
                <CardValue style={{ fontSize: "20px" }}>
                  {memberData?.current_plan.plan}
                </CardValue>
                <RowSubText>
                  {memberData?.current_plan.days_left} days left
                </RowSubText>
              </div>
            )}
          </Card>

          <Card>
            <CardTitle>Workouts</CardTitle>
            {loading ? (
              <Skeleton h="40px" />
            ) : (
              <div style={{ marginTop: 8 }}>
                <CardValue style={{ fontSize: "20px" }}>
                  {memberData?.stats.workouts}
                </CardValue>
                <RowSubText>Total sessions</RowSubText>
              </div>
            )}
          </Card>

          <Card>
            <CardTitle>Calories Burned</CardTitle>
            {loading ? (
              <Skeleton h="40px" />
            ) : (
              <div style={{ marginTop: 8 }}>
                <CardValue style={{ fontSize: "20px" }}>
                  {memberData?.stats.calories}
                </CardValue>
                <RowSubText>kcal total</RowSubText>
              </div>
            )}
          </Card>

          <Card>
            <CardTitle>Last Payment</CardTitle>
            {loading ? (
              <Skeleton h="40px" />
            ) : (
              <div style={{ marginTop: 8 }}>
                <CardValue style={{ fontSize: "20px" }}>
                  {memberData?.payments?.[0]?.amount || "0"}
                </CardValue>
                <RowSubText>
                  {memberData?.payments?.[0]?.date
                    ? formatDate(memberData.payments[0].date)
                    : "No data"}
                </RowSubText>
              </div>
            )}
          </Card>
        </StatsGrid>
      </div>
    </Container>
  );
};

export default Reports;
