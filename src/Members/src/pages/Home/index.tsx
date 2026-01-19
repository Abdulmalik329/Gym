import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Header,
  WelcomeSection,
  Title,
  Subtitle,
  HeroImage,
  WorkoutBadge,
  BadgeNumber,
  BadgeText,
  MembershipCard,
  CardHeader,
  CardTitle,
  MembershipDetails,
  DetailRow,
  Label,
  Value,
  StatusBadge,
  MainContent,
  LeftColumn,
  RightColumn,
  AttendanceCard,
  AttendanceHeader,
  StreakBadge,
  VisitsCount,
  VisitsNumber,
  VisitsChange,
  WeekGrid,
  DayItem,
  DayLabel,
  PerksCard,
  PerksTitle,
  PerksList,
  PerkItem,
  PerkIcon,
  PerkContent,
  PerkTitle,
  PerkDescription,
  ChallengeCard,
  ChallengeTitle,
  ChallengeDescription,
  ChallengeProgress,
  ProgressText,
  PaymentHistoryCard,
  PaymentHeader,
  DownloadLink,
  PaymentTable,
  TableHeader,
  TableRow,
  TableCell,
  StatusCell,
  DownloadIcon,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  MotivationCard,
} from "./Home.styled";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMemberData = async () => {
      // 1. Tokenni olish
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // --- O'ZGARISH SHU YERDA ---
        // Oldin: /api/users (Bu Adminlar uchun ro'yxat)
        // Hozir: /api/users/profile (Bu Memberning o'z ma'lumoti)
        const response = await fetch(
          "https://nt-gym-api.it-mahalla.uz/api/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Agar token eskirgan bo'lsa (401) loginga otamiz.
        // Lekin 403 (Ruxsat yo'q) bo'lsa, demak URL noto'g'ri tanlangan bo'lishi mumkin.
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Xatolik: ${response.status}`);
        }

        const resData = await response.json();
        console.log("User Profile Data:", resData); // Konsolda tekshirish uchun

        // 3. Mapping (Backenddan kelgan ma'lumotni UI ga moslash)
        const formattedData = {
          user: {
            name: resData.firstName
              ? `${resData.firstName} ${resData.lastName}`
              : resData.phoneNumber || "Foydalanuvchi",
            email:
              resData.email || resData.phoneNumber || "Aloqa ma'lumoti yo'q",
          },
          stats: {
            workouts: resData.workoutCount || 0,
            calories: resData.caloriesBurned || 0,
            hours: resData.totalHours || 0,
          },
          membership: {
            plan: resData.plan?.name || "Standard",
            status: resData.isActive ? "Active" : "Inactive",
            expiresAt: resData.expireDate
              ? new Date(resData.expireDate).toDateString()
              : "N/A",
          },
          attendance: {
            visits: resData.visitsCount || 0,
            improvement: 10,
            streak: resData.streak || 0,
            week: resData.weeklyAttendance || {
              M: false,
              T: false,
              W: false,
              Th: false,
              F: false,
              S: false,
            },
          },
          perks: [
            { icon: "🏋️", title: "Gym Access", description: "Full equipment" },
            { icon: "🧖", title: "Sauna", description: "Available" },
          ],
          challenge: {
            completed: resData.visitsCount || 0,
            total: 20,
          },
          payments: resData.payments || [],
        };

        setData(formattedData);
      } catch (err) {
        console.error("Data fetch error:", err);
        // Xatolik bo'lsa ham darhol loginga otmaymiz, xabarni chiqaramiz.
        setError(
          "Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos qayta urining."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [navigate]);

  if (loading)
    return (
      <Container>
        <Title>Yuklanmoqda...</Title>
      </Container>
    );
  if (error)
    return (
      <Container>
        <Title>{error}</Title>
        <Subtitle onClick={() => navigate("/login")}>Qayta kirish</Subtitle>
      </Container>
    );
  if (!data) return null;

  return (
    <Container>
      <Header>
        <WelcomeSection>
          <Title>Welcome back, {data.user.name} </Title>
          <Subtitle>You’re doing great. Keep pushing forward!</Subtitle>
        </WelcomeSection>
      </Header>

      <HeroImage backgroundImage="https://images.unsplash.com/photo-1599058917212-d750089bc07e">
        <WorkoutBadge>
          <BadgeNumber>{data.stats.workouts}</BadgeNumber>
          <BadgeText>WORKOUTS</BadgeText>
        </WorkoutBadge>
      </HeroImage>

      <StatsGrid>
        <StatCard>
          <StatNumber>{data.stats.workouts}</StatNumber>
          <StatLabel>Workouts</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{data.stats.calories}</StatNumber>
          <StatLabel>Calories</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{data.stats.hours}</StatNumber>
          <StatLabel>Hours</StatLabel>
        </StatCard>
      </StatsGrid>

      <MembershipCard>
        <CardHeader>
          <div>
            <Label>Membership</Label>
            <CardTitle>{data.membership.plan}</CardTitle>
          </div>
        </CardHeader>

        <MembershipDetails>
          <DetailRow>
            <Label>Status</Label>
            <StatusBadge>● {data.membership.status}</StatusBadge>
          </DetailRow>
          <DetailRow>
            <Label>Expires</Label>
            <Value>{data.membership.expiresAt}</Value>
          </DetailRow>
        </MembershipDetails>
      </MembershipCard>

      <MainContent>
        <LeftColumn>
          <AttendanceCard>
            <AttendanceHeader>
              <div>
                <Label>Attendance</Label>
                <VisitsCount>
                  <VisitsNumber>{data.attendance.visits}</VisitsNumber>
                  <VisitsChange>+{data.attendance.improvement}%</VisitsChange>
                </VisitsCount>
              </div>
              <StreakBadge>🔥 {data.attendance.streak} day streak</StreakBadge>
            </AttendanceHeader>

            <WeekGrid>
              {data.attendance.week &&
                Object.entries(data.attendance.week).map(([d, v]) => (
                  <DayItem key={d}>
                    <DayLabel>{d}</DayLabel>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        background: v ? "#2B8FEB" : "#1A2634",
                      }}
                    />
                  </DayItem>
                ))}
            </WeekGrid>
          </AttendanceCard>

          <PaymentHistoryCard>
            <PaymentHeader>
              <Label>Payments</Label>
              <DownloadLink>Download</DownloadLink>
            </PaymentHeader>

            <PaymentTable>
              <thead>
                <TableHeader>
                  <th>Date</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
                </TableHeader>
              </thead>
              <tbody>
                {data.payments.length > 0 ? (
                  data.payments.map((p: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{p.date || p.createdAt}</TableCell>
                      <TableCell>{p.plan || "Plan"}</TableCell>
                      <TableCell>{p.amount}</TableCell>
                      <StatusCell>{p.status}</StatusCell>
                      <TableCell>
                        <DownloadIcon>⬇</DownloadIcon>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center" }}>
                      To'lovlar tarixi mavjud emas
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </PaymentTable>
          </PaymentHistoryCard>
        </LeftColumn>

        <RightColumn>
          <PerksCard>
            <PerksTitle>Perks</PerksTitle>
            <PerksList>
              {data.perks.map((p: any, i: number) => (
                <PerkItem key={i}>
                  <PerkIcon>{p.icon}</PerkIcon>
                  <PerkContent>
                    <PerkTitle>{p.title}</PerkTitle>
                    <PerkDescription>{p.description}</PerkDescription>
                  </PerkContent>
                </PerkItem>
              ))}
            </PerksList>
          </PerksCard>

          <ChallengeCard>
            <ChallengeTitle>Monthly Challenge</ChallengeTitle>
            <ChallengeDescription>
              Complete 20 visits this month
            </ChallengeDescription>
            <ProgressText>
              {data.challenge.completed}/{data.challenge.total}
            </ProgressText>
            <ChallengeProgress>
              <div
                style={{
                  width: `${
                    (data.challenge.completed / data.challenge.total) * 100
                  }%`,
                  height: "100%",
                  background: "#fff",
                }}
              />
            </ChallengeProgress>
          </ChallengeCard>

          <MotivationCard>
            Consistency beats motivation. See you at the gym today!
          </MotivationCard>
        </RightColumn>
      </MainContent>
    </Container>
  );
};

export default Home;
