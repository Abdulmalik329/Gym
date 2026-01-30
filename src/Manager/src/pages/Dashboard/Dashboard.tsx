import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FiUsers,
  FiUserPlus,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
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
} from "./Dashboard.styled";

// --- TYPES ---
interface DashboardData {
  stats: {
    attendance: { value: number; target: number; percent_change: number };
    new_members: { value: number; percent_change: number };
    // pending_payments kerak emas
  };
  heatmap: { date: string; count: number }[];
  active_members_total: number;
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // API Call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://nt-gym-api.it-mahalla.uz/api/reports/gym-manager-stats?gym_id=1",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <Container>
        <Title>Yuklanmoqda...</Title>
      </Container>
    );
  if (!data)
    return (
      <Container>
        <Title>Ma'lumot topilmadi</Title>
      </Container>
    );

  // Data helpers
  const { attendance, new_members } = data.stats;
  const totalMembers = data.active_members_total;

  // Chart data formatlash
  const chartData = data.heatmap.map((item) => {
    const date = new Date(item.date);
    return {
      name: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      count: item.count,
    };
  });

  // Progress bar foizi
  const attendancePercent = Math.min(
    (attendance.value / (attendance.target || 1)) * 100,
    100,
  );

  return (
    <Container>
      <Header>
        <div>
          <Title>Dashboard</Title>
          <DateText>{new Date().toDateString()}</DateText>
        </div>
      </Header>

      {/* --- TEPADAGI 2 TA KARTA (Obshi soni va Yangilar) --- */}
      <TopGrid>
        {/* 1. Total Members */}
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

        {/* 2. New Members */}
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
            <ProgressFill $width={70} $color="#10b981" />
          </ProgressBar>
        </StatCard>
      </TopGrid>

      {/* --- PASTKI ATTENDANCE QISMI (Toliq) --- */}
      <AttendanceSection>
        {/* Chap tomon: Raqamlar */}
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
            <h2 style={{ color: "white", fontSize: "20px" }}>
              Daily Attendance
            </h2>
          </div>

          <div>
            <StatLabel style={{ marginBottom: "8px" }}>
              Today's Visits
            </StatLabel>
            <LargeValue>
              {attendance.value} <span>/ {attendance.target} target</span>
            </LargeValue>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                Capacity Reached
              </span>
              <span style={{ color: "#3b82f6", fontWeight: "bold" }}>
                {Math.round(attendancePercent)}%
              </span>
            </div>
            <ProgressBar style={{ height: "12px" }}>
              <ProgressFill $width={attendancePercent} $color="#3b82f6" />
            </ProgressBar>
          </div>
        </AttendanceInfo>

        {/* O'ng tomon: Grafik */}
        <AttendanceChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
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
                itemStyle={{ color: "#fff" }}
              />
              <Bar
                dataKey="count"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </AttendanceChartWrapper>
      </AttendanceSection>
    </Container>
  );
};

export default Dashboard;
