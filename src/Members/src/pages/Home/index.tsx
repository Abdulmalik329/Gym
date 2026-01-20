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
  // Yangi importlar (Home.styled.tsx ga qo'shganingizdan keyin ishlaydi)
  PlansSection,
  SectionTitle,
  PlansGrid,
  PlanCard,
  PlanName,
  PlanPrice,
  PlanFeatureList,
  PlanFeatureItem,
  PlanButton,
} from "./Home.styled";

// --- YORDAMCHI FUNKSIYA: Tokenni decode qilish ---
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
    console.error("Tokenni o'qishda xatolik:", error);
    return null;
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      // 1. Tokenni olish
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // 2. Token ichidan ID ni olish
      const decodedToken = decodeJwt(token);
      const userId =
        decodedToken?.id || decodedToken?.sub || decodedToken?.user?.id;

      if (!userId) {
        setError("Token ichidan ID topilmadi. Qayta kiring.");
        setLoading(false);
        return;
      }

      try {
        // 3. Promise.all bilan barcha API larga parallel so'rov yuboramiz
        const [userRes, paymentsRes, attendanceRes, plansRes] =
          await Promise.all([
            fetch(`https://nt-gym-api.it-mahalla.uz/api/users/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`https://nt-gym-api.it-mahalla.uz/api/payments`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`https://nt-gym-api.it-mahalla.uz/api/attendances`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`https://nt-gym-api.it-mahalla.uz/api/membership-plans`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        // Agar token eskirgan bo'lsa (401)
        if (userRes.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }

        // --- JSON Parsing ---
        const userDataRaw = await userRes.json();
        const paymentsData = paymentsRes.ok ? await paymentsRes.json() : [];
        const attendanceData = attendanceRes.ok
          ? await attendanceRes.json()
          : [];
        const plansData = plansRes.ok ? await plansRes.json() : [];

        // User array ichida kelishi mumkin, shuni tekshiramiz
        const userData = Array.isArray(userDataRaw)
          ? userDataRaw[0]
          : userDataRaw;

        // --- MAPPING ---

        // 1. Ism Familiyani to'g'irlash
        // Backend first_name (snake_case) yoki firstName (camelCase) berishi mumkin
        const fName = userData.first_name || userData.firstName || "";
        const lName = userData.last_name || userData.lastName || "";
        const fullName = `${fName} ${lName}`.trim();
        // Agar ism bo'sh bo'lsa, telefon raqamni ko'rsatamiz
        const displayName =
          fullName.length > 0 ? fullName : userData.phone || "Foydalanuvchi";

        // 2. Davomat soni (Kelgan kunlar)
        const visitCount = Array.isArray(attendanceData)
          ? attendanceData.length
          : 0;

        // 3. Ma'lumotlarni statega tayyorlash
        const formattedData = {
          user: {
            name: displayName,
            bio: userData.bio || "Xush kelibsiz!",
            weight: userData.weight || 0,
            height: userData.height || 0,
            phone: userData.phone,
            address: userData.address || "Manzil kiritilmagan",
          },
          membership: {
            planName: userData.plan?.name || "Member",
            status: userData.isActive !== false ? "Faol" : "Nofaol",
            expiresAt: userData.expireDate
              ? new Date(userData.expireDate).toDateString()
              : "-",
          },
          attendance: {
            totalVisits: visitCount, // Jami kelgan kunlar soni
            history: Array.isArray(attendanceData)
              ? attendanceData.slice(0, 5)
              : [], // Oxirgi 5 ta
          },
          payments: Array.isArray(paymentsData) ? paymentsData : [],
          plans: Array.isArray(plansData) ? plansData : [],
          stats: { hours: 0 },
        };

        setData(formattedData);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      } finally {
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

  if (error)
    return (
      <Container>
        <Title style={{ color: "#ff4d4d" }}>{error}</Title>
        <Subtitle
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Qayta kirish
        </Subtitle>
      </Container>
    );

  if (!data) return null;

  return (
    <Container>
      <Header>
        <WelcomeSection>
          {/* ISM FAMILIYA CHIQADIGAN JOY */}
          <Title>Salom, {data.user.name}</Title>
          <Subtitle>{data.user.bio}</Subtitle>
        </WelcomeSection>
      </Header>

      <HeroImage backgroundImage="https://images.unsplash.com/photo-1599058917212-d750089bc07e">
        {/* O'RTADAGI DUMALOQ - KELGAN KUNLAR SONI */}
        <WorkoutBadge>
          <BadgeNumber>{data.attendance.totalVisits}</BadgeNumber>
          <BadgeText>TASHRIFLAR</BadgeText>
        </WorkoutBadge>
      </HeroImage>

      <StatsGrid>
        <StatCard>
          <StatNumber>{data.user.weight}</StatNumber>
          <StatLabel>Vazn (kg)</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{data.user.height}</StatNumber>
          <StatLabel>Bo'y (sm)</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{data.attendance.totalVisits}</StatNumber>
          <StatLabel>Jami Tashriflar</StatLabel>
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
            <Label>Telefon</Label>
            <Value style={{ fontSize: "12px" }}>{data.user.phone}</Value>
          </DetailRow>
          <DetailRow>
            <Label>Manzil</Label>
            <Value style={{ fontSize: "12px" }}>{data.user.address}</Value>
          </DetailRow>
        </MembershipDetails>
      </MembershipCard>

      <MainContent>
        <LeftColumn>
          {/* TO'LOVLAR TARIXI (API dan) */}
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
                      <TableCell>
                        {new Date(
                          p.createdAt || Date.now()
                        ).toLocaleDateString()}
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

          {/* DAVOMAT TARIXI (API dan) */}
          <AttendanceCard>
            <AttendanceHeader>
              <div>
                <Label>Davomat</Label>
                <VisitsCount>
                  <VisitsNumber>{data.attendance.totalVisits}</VisitsNumber>
                </VisitsCount>
              </div>
              <StreakBadge>Jami</StreakBadge>
            </AttendanceHeader>
            <WeekGrid>
              {data.attendance.history.length > 0 ? (
                data.attendance.history.map((log: any, idx: number) => (
                  <p
                    key={idx}
                    style={{ color: "#ccc", fontSize: "12px", margin: "5px 0" }}
                  >
                    ✅{" "}
                    {new Date(log.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                ))
              ) : (
                <p style={{ color: "#777", fontSize: "12px", padding: "10px" }}>
                  Hali tashrif buyurilmagan
                </p>
              )}
            </WeekGrid>
          </AttendanceCard>
        </LeftColumn>

        <RightColumn>
          <PerksCard>
            <PerksTitle>Qulayliklar</PerksTitle>
            <PerksList>
              <p style={{ color: "#777", fontSize: "12px" }}>
                Siz hozirda {data.membership.planName} rejasidan
                foydalanmoqdasiz.
              </p>
            </PerksList>
          </PerksCard>
          <MotivationCard>Harakatda barakat!</MotivationCard>
        </RightColumn>
      </MainContent>

      {/* --- YANGI TARIFLAR QATORI --- */}
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
                <PlanButton active={data.membership.planName === plan.name}>
                  {data.membership.planName === plan.name
                    ? "JORIY REJA"
                    : "TANLASH"}
                </PlanButton>
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
