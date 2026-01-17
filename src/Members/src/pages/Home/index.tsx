import { useEffect, useState } from "react";
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
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const mock = {
      user: {
        name: "John Doe",
        email: "john@gmail.com",
      },
      stats: {
        workouts: 4,
        calories: 1240,
        hours: 6.5,
      },
      membership: {
        plan: "Platinum",
        status: "Active",
        expiresAt: "18 Oct 2025",
      },
      attendance: {
        visits: 18,
        improvement: 15,
        streak: 4,
        week: { M: false, T: true, W: false, Th: true, F: false, S: true },
      },
      perks: [
        { icon: "🏋️", title: "Unlimited Access", description: "Train anytime" },
        { icon: "🧖", title: "Sauna", description: "Recovery zone access" },
        { icon: "👥", title: "Guest Pass", description: "2 left this month" },
      ],
      challenge: {
        completed: 18,
        total: 20,
      },
      payments: [
        { date: "Sep 15", plan: "Platinum", amount: "$75", status: "Paid" },
        { date: "Aug 21", plan: "Gold", amount: "$105", status: "Paid" },
        { date: "May 31", plan: "Classic", amount: "$55", status: "NotPaid" },
        { date: "Aug 12", plan: "Platinum", amount: "$75", status: "Paid" },
      ],
    };

    setData(mock);
  }, []);

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
              {Object.entries(data.attendance.week).map(([d, v]) => (
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
                {data.payments.map((p: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{p.date}</TableCell>
                    <TableCell>{p.plan}</TableCell>
                    <TableCell>{p.amount}</TableCell>
                    <StatusCell>{p.status}</StatusCell>
                    <TableCell>
                      <DownloadIcon>⬇</DownloadIcon>
                    </TableCell>
                  </TableRow>
                ))}
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
