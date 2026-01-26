import { useHomeData } from "./hooks/useHomeData";
import {
  Container,
  MainContent,
  LeftColumn,
  RightColumn,
  LoadingTitle,
} from "./Home.styled";
import WelcomeHeader from "./components/WelcomeHeader";
import HeroSection from "./components/HeroSection";
import StatsGrid from "./components/StatsGrid";
import CurrentMembership from "./components/CurrentMembership";
import PaymentHistory from "./components/PaymentHistory";
import AttendanceChart from "./components/AttendanceChart";
import SidebarWidgets from "./components/SidebarWidgets";
import PlansSection from "./components/PlansSection";

const Home = () => {
  const { data, loading } = useHomeData();

  if (loading)
    return (
      <Container>
        <LoadingTitle>Yuklanmoqda...</LoadingTitle>
      </Container>
    );
  if (!data) return null;

  return (
    <Container className="container">
      <WelcomeHeader name={data.user.name} bio={data.user.bio} />
      <HeroSection streak={data.attendance.streak} />
      <StatsGrid stats={data.stats} />
      <CurrentMembership membership={data.membership} phone={data.user.phone} />

      <MainContent>
        <LeftColumn>
          <PaymentHistory payments={data.payments} />
          <AttendanceChart attendance={data.attendance} />
        </LeftColumn>
        <RightColumn>
          <SidebarWidgets
            features={data.membership.features}
            streak={data.attendance.streak}
          />
        </RightColumn>
      </MainContent>

      <PlansSection
        plans={data.plans}
        currentPlanName={data.membership.planName}
      />
    </Container>
  );
};

export default Home;
