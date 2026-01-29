import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/ui/StatCard/StatCard";
import styled from "styled-components";
import { Users, UserPlus, CreditCard } from "lucide-react";
import Heatmap from "./Heatmap";
import QuickActions from "./QuickActions";
import MemberManagement from "./MemberManagement";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const LowerGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-top: 24px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  margin-top: 24px;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [heatmapView, setHeatmapView] = useState<"daily" | "weekly">("daily");

  return (
    <>
      <Grid>
        <StatCard
          title="Daily Attendance"
          value="142 / 200"
          change="+12%"
          positive
          progress={71}
          icon={<Users size={20} color="#3b82f6" />}
          iconColor="rgba(59, 130, 246, 0.15)"
          onClick={() => navigate("/dashboard/attendance")}
        />
        <StatCard
          title="New Members This Week"
          value="24"
          change="+5%"
          positive
          progress={80}
          icon={<UserPlus size={20} color="#22c55e" />}
          iconColor="rgba(34, 197, 94, 0.15)"
          onClick={() => navigate("/members")}
        />
        <StatCard
          title="Pending Payments"
          value="$3,450"
          change="-8%"
          progress={40}
          icon={<CreditCard size={20} color="#ef4444" />}
          iconColor="rgba(239, 68, 68, 0.15)"
          onClick={() => navigate("/dashboard/payments")}
        />
      </Grid>

      <LowerGrid>
        <Heatmap view={heatmapView} setView={setHeatmapView} />
        <QuickActions />
      </LowerGrid>

      <Section>
        <MemberManagement />
      </Section>
    </>
  );
};

export default Dashboard;
