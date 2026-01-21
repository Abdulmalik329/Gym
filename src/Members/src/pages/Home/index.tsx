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
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
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
  WeekGrid,
  PaymentHistoryCard,
  PaymentHeader,
  PaymentTable,
  TableHeader,
  TableRow,
  TableCell,
  PerksCard,
  PerksTitle,
  PerksList,
  MotivationCard,
  PlansSection,
  SectionTitle,
  PlansGrid,
  PlanCard,
  PlanName,
  PlanPrice,
  PlanFeatureList,
  PlanFeatureItem,
} from "./Home.styled";

// --- Tokenni decode qilish ---
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const decoded = decodeJwt(token);
      const userId = decoded?.id || decoded?.sub || decoded?.user?.id;

      if (!userId) {
        localStorage.clear();
        return navigate("/login");
      }

      try {
        const [reportRes, plansRes, paymentsRes] = await Promise.all([
          fetch(
            `https://nt-gym-api.it-mahalla.uz/api/reports/member?userId=${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(`https://nt-gym-api.it-mahalla.uz/api/membership-plans`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`https://nt-gym-api.it-mahalla.uz/api/payments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (reportRes.status === 401) {
          localStorage.clear();
          return navigate("/login");
        }

        const reportData = reportRes.ok ? await reportRes.json() : null;
        const plansData = plansRes.ok ? await plansRes.json() : [];
        const paymentsData = paymentsRes.ok ? await paymentsRes.json() : [];

        // 1. Ism (Reportdan)
        const displayName = reportData?.user?.name || "Foydalanuvchi";

        // 2. Plan va Features (Reportdagi membership dan olamiz yoki Plans dan topamiz)
        // Agar reportData.perks bo'lsa, o'shani ishlatamiz (Siz yuborgan JSON da perks bor ekan)
        let features: string[] = [];
        if (reportData?.perks && Array.isArray(reportData.perks)) {
          // Perks obyekti ichidan title larni olamiz
          features = reportData.perks.map((p: any) => p.title);
        } else {
          // Fallback: Plan nomiga qarab plans ro'yxatidan qidirish
          const planName = reportData?.membership?.plan;
          const foundPlan = plansData.find((p: any) => p.name === planName);
          if (foundPlan) {
            if (Array.isArray(foundPlan.features))
              features = foundPlan.features;
            else if (foundPlan.description) features = [foundPlan.description];
          }
        }

        // 3. Davomat (Week Object)
        // JSON dagi structure: { "M": false, "T": true, ... }
        const attendanceWeek = reportData?.attendance?.week || {};

        setData({
          user: {
            name: displayName,
            bio: "Exciting working out",
            weight: 0, // Agar reportda kelmasa 0 turadi
            height: 0,
            phone: reportData?.user?.email || "", // Emailni phone o'rniga ko'rsatish mumkin vaqtincha
            address: "Tashkent",
          },
          membership: {
            planName: reportData?.membership?.plan || "Reja yo'q",
            status: reportData?.membership?.status || "Nofaol",
            expiresAt: reportData?.membership?.expiresAt || "-",
            features: features,
          },
          attendance: {
            totalVisits: reportData?.attendance?.totalVisits || 0,
            streak: reportData?.attendance?.streak || 0,
            week: attendanceWeek, // <--- Mana shu haftalik ma'lumot
          },
          stats: reportData?.stats || { workouts: 0, calories: 0, hours: 0 },
          payments: Array.isArray(paymentsData) ? paymentsData : [],
          plans: Array.isArray(plansData) ? plansData : [],
        });

        setLoading(false);
      } catch (e) {
        console.error("Xatolik:", e);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [navigate]);

  if (loading)
    return (
      <Container>
        <Title>Yuklanmoqda...</Title>
      </Container>
    );
  if (!data) return null;

  // Hafta kunlarini tartiblash uchun yordamchi massiv
  const weekDays = [
    { key: "M", label: "Du" },
    { key: "T", label: "Se" },
    { key: "W", label: "Ch" },
    { key: "Th", label: "Pa" },
    { key: "F", label: "Ju" },
    { key: "S", label: "Sh" },
    { key: "Su", label: "Ya" },
  ];

  return (
    <Container>
      <Header>
        <WelcomeSection>
          <Title>Salom, {data.user.name}</Title>
          <Subtitle>{data.user.bio}</Subtitle>
        </WelcomeSection>
      </Header>

      <HeroImage backgroundImage="https://images.unsplash.com/photo-1599058917212-d750089bc07e">
        <WorkoutBadge>
          {/* O'rtada streak (ketma-ket) kunlarni chiqaramiz */}
          <BadgeNumber>{data.attendance.streak}</BadgeNumber>
          <BadgeText>KUN STREAK</BadgeText>
        </WorkoutBadge>
      </HeroImage>

      <StatsGrid>
        <StatCard>
          <StatNumber>{data.stats.workouts}</StatNumber>
          <StatLabel>Workouts</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{data.stats.calories}</StatNumber>
          <StatLabel>Kcal</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{data.stats.hours}</StatNumber>
          <StatLabel>Soat</StatLabel>
        </StatCard>
      </StatsGrid>

      <MembershipCard>
        <CardHeader>
          <div>
            <Label>Joriy A'zolik</Label>
            <CardTitle>{data.membership.planName}</CardTitle>
          </div>
        </CardHeader>
        <MembershipDetails>
          <DetailRow>
            <Label>Holati</Label>
            <StatusBadge>● {data.membership.status}</StatusBadge>
          </DetailRow>
          <DetailRow>
            <Label>Tugash vaqti</Label>
            <Value>{data.membership.expiresAt}</Value>
          </DetailRow>
          <DetailRow>
            <Label>Email</Label>
            <Value style={{ fontSize: "12px" }}>{data.user.phone}</Value>
          </DetailRow>
        </MembershipDetails>
      </MembershipCard>

      <MainContent>
        <LeftColumn>
          <PaymentHistoryCard>
            <PaymentHeader>
              <Label>To'lovlar Tarixi</Label>
            </PaymentHeader>
            <PaymentTable>
              <thead>
                <TableHeader>
                  <th>Sana</th>
                  <th>Summa</th>
                  <th>Usul</th>
                </TableHeader>
              </thead>
              <tbody>
                {data.payments.length > 0 ? (
                  data.payments.map((p: any, i: number) => (
                    <TableRow key={i}>
                      {/* Agar payments API dan sana kelsa o'shani, yo'qsa reportdagi formatni */}
                      <TableCell>
                        {p.date
                          ? p.date
                          : new Date(p.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{p.amount} UZS</TableCell>
                      <TableCell>{p.paymentMethod || "Naqd"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      style={{ textAlign: "center", color: "#777" }}
                    >
                      To'lovlar mavjud emas
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </PaymentTable>
          </PaymentHistoryCard>

          <AttendanceCard>
            <AttendanceHeader>
              <div>
                <Label>Haftalik Davomat</Label>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#8b98a8",
                    marginTop: "4px",
                  }}
                >
                  Jami {data.attendance.totalVisits} marta tashrif
                </div>
              </div>
              <StreakBadge>
                Bugun: {data.attendance.week["T"] ? "Keldi" : "Yo'q"}
              </StreakBadge>
            </AttendanceHeader>

            {/* --- YANGI HAFTALIK DAVOMAT LOGIKASI --- */}
            <WeekGrid
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              {weekDays.map((day) => {
                const isActive = data.attendance.week[day.key]; // true yoki false
                return (
                  <div
                    key={day.key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: isActive ? "#2b8feb" : "#1a2634", // Faol bo'lsa ko'k
                        border: isActive ? "none" : "1px solid #2a3b4c",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isActive ? "#fff" : "#6b7a8f",
                        fontWeight: "bold",
                        fontSize: "14px",
                        boxShadow: isActive
                          ? "0 4px 10px rgba(43, 143, 235, 0.4)"
                          : "none",
                      }}
                    >
                      {day.label}
                    </div>
                    {/* Pastidagi nuqta indikatori */}
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: isActive ? "#2b8feb" : "transparent",
                      }}
                    />
                  </div>
                );
              })}
            </WeekGrid>
          </AttendanceCard>
        </LeftColumn>

        <RightColumn>
          {/* --- QULAYLIKLAR (PERKS) --- */}
          <PerksCard>
            <PerksTitle>Qulayliklar</PerksTitle>
            <PerksList>
              {data.membership.features.length > 0 ? (
                data.membership.features.map(
                  (feature: string, index: number) => (
                    <p
                      key={index}
                      style={{
                        color: "#fff",
                        fontSize: "13px",
                        marginBottom: "8px",
                      }}
                    >
                      ✨ {feature}
                    </p>
                  )
                )
              ) : (
                <p style={{ color: "#777", fontSize: "12px" }}>Ma'lumot yo'q</p>
              )}
            </PerksList>
          </PerksCard>

          <MotivationCard>
            {data.attendance.streak > 0 ? (
              <>
                🔥 {data.attendance.streak} kunlik STREAK!
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "5px",
                    opacity: 0.8,
                    fontWeight: "normal",
                  }}
                >
                  Ajoyib natija, to'xtamang!
                </div>
              </>
            ) : (
              <>
                Harakatda barakat! 🚀
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "5px",
                    opacity: 0.8,
                    fontWeight: "normal",
                  }}
                >
                  Zalga kelishni unutmang.
                </div>
              </>
            )}
          </MotivationCard>
        </RightColumn>
      </MainContent>

      <PlansSection>
        <SectionTitle>Mavjud Tariflar</SectionTitle>
        <PlansGrid>
          {data.plans.length > 0 ? (
            data.plans.map((plan: any) => (
              <PlanCard
                key={plan.id}
                active={data.membership.planName === plan.name}
              >
                <PlanName>{plan.name}</PlanName>
                <PlanPrice>
                  {plan.price} <span>so'm</span>
                </PlanPrice>
                <PlanFeatureList>
                  <PlanFeatureItem>
                    Davomiyligi: {plan.durationDays} kun
                  </PlanFeatureItem>
                  <PlanFeatureItem>
                    {plan.description || "Barcha qulayliklar"}
                  </PlanFeatureItem>
                </PlanFeatureList>
              </PlanCard>
            ))
          ) : (
            <p
              style={{ color: "#888", gridColumn: "1/-1", textAlign: "center" }}
            >
              Tariflar topilmadi
            </p>
          )}
        </PlansGrid>
      </PlansSection>
    </Container>
  );
};

export default Home;
