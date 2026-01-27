import { useHomeData } from "./hooks/useHomeData";
import {
  Container,
  MainContent,
  LeftColumn,
  RightColumn,
  SkeletonHeaderWrapper,
  SkeletonBox,
  SkeletonGrid,
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

  // --- LOADING HOLATI (SKELETON) ---
  if (loading)
    return (
      <Container className="container">
        <SkeletonHeaderWrapper>
          <SkeletonBox $width="40%" $height="40px" />
          <SkeletonBox $width="25%" $height="20px" />
        </SkeletonHeaderWrapper>

        <SkeletonBox $height="280px" $mb="32px" />

        <SkeletonGrid>
          <SkeletonBox $height="120px" />
          <SkeletonBox $height="120px" />
          <SkeletonBox $height="120px" />
        </SkeletonGrid>

        <SkeletonBox $height="100px" $mb="32px" />

        <MainContent>
          <LeftColumn>
            <SkeletonBox $height="250px" />
            <SkeletonBox $height="350px" />
          </LeftColumn>
          <RightColumn>
            <SkeletonBox $height="600px" />
          </RightColumn>
        </MainContent>

        <div style={{ marginTop: "32px" }}>
          <SkeletonBox $width="200px" $height="30px" $mb="20px" />
          <SkeletonGrid>
            <SkeletonBox $height="300px" />
            <SkeletonBox $height="300px" />
            <SkeletonBox $height="300px" />
          </SkeletonGrid>
        </div>
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

          <AttendanceChart
            records={data.attendance.records}
            totalVisits={data.attendance.totalVisits}
          />
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
