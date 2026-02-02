import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  FiUsers,
  FiUserPlus,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";
import {
  Container,
  Header,
  Title,
  DateText,
  TopGrid,
  StatCard,
  StatHeader,
  IconBox,
  StatValue,
  StatLabel,
  PercentBadge,
  AttendanceSection,
  AttendanceInfo,
  AttendanceChartWrapper,
  LargeValue,
  ProgressBar,
  ProgressFill,
  ChartsGrid,
  ChartCard,
  SectionTitle,
  ExpiringList,
  ExpiringItem,
} from "./Dashboard.styled";

// --- TYPES ---
interface AttendanceStats {
  value: number;
  target: number;
  percent_change: number;
}

interface NewMembersStats {
  value: number;
  percent_change: number;
}

interface GymManagerStats {
  stats: {
    attendance: AttendanceStats;
    new_members: NewMembersStats;
  };
  heatmap: { date: string; count: number }[];
  active_members_total: number;
}

interface ExpiringUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  daysLeft: number;
  endDate: string;
}

interface GeneralReport {
  monthly_revenue: string;
  active_members_count: number;
  today_attendance_count: number;
  users_expiring_soon: ExpiringUser[];
}

interface RevenueChartItem {
  month: string;
  amount: number;
}

const BASE_URL = "https://nt-gym-api.it-mahalla.uz/api";
const GYM_ID = 1;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<GymManagerStats | null>(null);
  const [report, setReport] = useState<GeneralReport | null>(null);
  const [revenueChart, setRevenueChart] = useState<RevenueChartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Currency formatter - formatMoney funksiyasi
  const formatMoney = useCallback((amount: number | string) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, reportRes, revChartRes] = await Promise.all([
          axios.get<GymManagerStats>(
            `${BASE_URL}/reports/gym-manager-stats?gym_id=${GYM_ID}`,
            { headers },
          ),
          axios.get<GeneralReport>(
            `${BASE_URL}/reports/gym-manager?gym_id=${GYM_ID}`,
            { headers },
          ),
          axios.get<RevenueChartItem[]>(
            `${BASE_URL}/reports/gym-manager/revenue-chart?gym_id=${GYM_ID}`,
            { headers },
          ),
        ]);

        setStats(statsRes.data);
        setReport(reportRes.data);
        setRevenueChart(revChartRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Title>Yuklanmoqda...</Title>
      </Container>
    );
  }

  if (!stats || !report) {
    return (
      <Container>
        <Title>Ma'lumot topilmadi</Title>
      </Container>
    );
  }

  const { attendance, new_members } = stats.stats;
  const totalMembers = stats.active_members_total;

  const attendanceData = stats.heatmap.map((item) => ({
    name: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    count: item.count,
  }));

  const revenueData = revenueChart.map((item) => ({
    name: item.month,
    amount: Number(item.amount),
  }));

  const attendancePercent = Math.min(
    (attendance.value / (attendance.target || 20)) * 100,
    100,
  );

  return (
    <Container>
      <Header>
        <div>
          <Title>Gym Dashboard</Title>
          <DateText>{new Date().toDateString()}</DateText>
        </div>
      </Header>

      {/* --- TOP STATISTICS --- */}
      <TopGrid>
        <StatCard>
          <StatHeader>
            <IconBox $bg="rgba(139, 92, 246, 0.1)" $color="#8b5cf6">
              <FiUsers />
            </IconBox>
            <PercentBadge $isPositive={true}>Active</PercentBadge>
          </StatHeader>
          <div>
            <StatLabel>Total Active Members</StatLabel>
            <StatValue>{totalMembers}</StatValue>
          </div>
          <ProgressBar>
            <ProgressFill $width={100} $color="#8b5cf6" />
          </ProgressBar>
        </StatCard>

        <StatCard>
          <StatHeader>
            <IconBox $bg="rgba(16, 185, 129, 0.1)" $color="#10b981">
              <FiUserPlus />
            </IconBox>
            <PercentBadge $isPositive={new_members.percent_change >= 0}>
              {new_members.percent_change >= 0 ? (
                <FiTrendingUp />
              ) : (
                <FiTrendingDown />
              )}
              {Math.abs(new_members.percent_change)}%
            </PercentBadge>
          </StatHeader>
          <div>
            <StatLabel>New Members (This Week)</StatLabel>
            <StatValue>{new_members.value}</StatValue>
          </div>
          <ProgressBar>
            <ProgressFill
              $width={Math.min(new_members.value * 10, 100)}
              $color="#10b981"
            />
          </ProgressBar>
        </StatCard>

        <StatCard>
          <StatHeader>
            <IconBox $bg="rgba(245, 158, 11, 0.1)" $color="#f59e0b">
              <FiDollarSign />
            </IconBox>
            <PercentBadge $isPositive={true}>This Month</PercentBadge>
          </StatHeader>
          <div>
            <StatLabel>Monthly Revenue</StatLabel>
            <StatValue style={{ fontSize: "28px" }}>
              {formatMoney(report.monthly_revenue)}
            </StatValue>
          </div>
          <ProgressBar>
            <ProgressFill $width={100} $color="#f59e0b" />
          </ProgressBar>
        </StatCard>
      </TopGrid>

      {/* --- MIDDLE CHARTS --- */}
      <ChartsGrid>
        <AttendanceSection>
          <AttendanceInfo>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              <IconBox
                $bg="rgba(59, 130, 246, 0.1)"
                $color="#3b82f6"
                style={{ width: "48px", height: "48px" }}
              >
                <FiCheckCircle />
              </IconBox>
              <h2 style={{ color: "white", fontSize: "18px", margin: 0 }}>
                Attendance
              </h2>
            </div>
            <div>
              <StatLabel style={{ marginBottom: "8px" }}>
                Today's Visits
              </StatLabel>
              <LargeValue>
                {attendance.value}{" "}
                <span>/ {attendance.target || 20} target</span>
              </LargeValue>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#94a3b8",
                  marginBottom: "5px",
                }}
              >
                <span>Daily Goal</span>
                <span>{Math.round(attendancePercent)}%</span>
              </div>
              <ProgressBar style={{ height: "8px" }}>
                <ProgressFill $width={attendancePercent} $color="#3b82f6" />
              </ProgressBar>
            </div>
          </AttendanceInfo>

          <AttendanceChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "#111418",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  // TS Xatosini bartaraf etish:
                  formatter={(value: any) => value}
                />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </AttendanceChartWrapper>
        </AttendanceSection>

        <ChartCard>
          <SectionTitle>Revenue Trend</SectionTitle>
          <div style={{ width: "100%", height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v / 1000}k`}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111418",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  // MUHIM: Xatolikni to'g'irlaydigan formatter
                  formatter={(value: number | string | undefined) =>
                    value !== undefined ? formatMoney(value) : ""
                  }
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </ChartsGrid>

      {/* --- BOTTOM SECTION --- */}
      <ChartCard style={{ marginTop: "0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <FiAlertCircle color="#ef4444" size={20} />
          <SectionTitle style={{ marginBottom: 0 }}>Expiring Soon</SectionTitle>
        </div>

        {report.users_expiring_soon.length === 0 ? (
          <div style={{ color: "#64748b", fontStyle: "italic" }}>
            No memberships expiring soon.
          </div>
        ) : (
          <ExpiringList>
            {report.users_expiring_soon.map((user) => (
              <ExpiringItem key={user.id}>
                <div className="user-info">
                  <div className="name">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="phone">{user.phone}</div>
                </div>
                <div className="date-info">
                  Expires: {new Date(user.endDate).toLocaleDateString()}
                </div>
              </ExpiringItem>
            ))}
          </ExpiringList>
        )}
      </ChartCard>
    </Container>
  );
};

export default Dashboard;
