import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const Container = styled.aside`
  width: 260px;
  background: #111418;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  color: ${({ theme }) => theme.colors.text};
`;

const TopSection = styled.div``;

const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  color: #3b82f6;
  margin-bottom: 4px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 24px;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled(NavLink)`
  padding: 12px 16px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;
  font-weight: 500;

  &.active {
    background: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const BottomSection = styled.div`
  margin-top: auto;
`;

const StorageUsageContainer = styled.div`
  background: #1c2229;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 16px;
`;

const StorageLabel = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 6px;
`;

const StorageBar = styled.div`
  background: ${({ theme }) => theme.colors.border};
  height: 8px;
  border-radius: 8px;
  overflow: hidden;
`;

const StorageFill = styled.div`
  height: 100%;
  width: 68%;
  background: ${({ theme }) => theme.colors.primary};
`;

const StorageText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 6px;
  font-weight: 600;
  text-align: right;
`;

const CheckinButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 0;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <TopSection>
        <Title>Gym Bros</Title>
        <Subtitle>Downtown Branch Manager</Subtitle>

        <Menu>
          <MenuItem to="/manager/dashboard">Dashboard</MenuItem>
          <MenuItem to="/manager/members">Members</MenuItem>
          <MenuItem to="/manager/reports">Reports</MenuItem>
          <MenuItem to="/manager/settings">Settings</MenuItem>
        </Menu>
      </TopSection>

      <BottomSection>

        <CheckinButton onClick={() => navigate("/manager/members/create")}>
          Check-in Member
        </CheckinButton>
      </BottomSection>
    </Container>
  );
};

export default Sidebar;
