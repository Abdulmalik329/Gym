import styled from "styled-components";
import { UserPlus, Calendar, Package, Mail, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background: linear-gradient(180deg, #0f1318, #0b0e13);
  padding: 24px;
  border-radius: 18px;
  border: 2px solid #1f2937;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Action = styled.button`
  background: #111827;
  border: 1px solid #1f2937;
  color: #fff;
  padding: 14px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background: #1f2937;
  }
`;
const AlertBox = styled.div`
  margin-top: 8px;
  padding: 16px;
  border-radius: 14px;
  background: linear-gradient(180deg, #0b1220, #020617);
  border: 1px solid #1e3a8a;
`;
const AlertTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 6px;
`;
const AlertText = styled.p`
  font-size: 13px;
  color: #cbd5f5;
  line-height: 1.4;
`;

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <div>
        <Title>Quick Actions</Title>
        <List>
          <Action onClick={() => navigate("/members/create")}>
            <UserPlus size={18} /> Add New Member
          </Action>
          <Action onClick={() => navigate("/dashboard/book-trainer")}>
            <Calendar size={18} /> Book Personal Trainer
          </Action>
          <Action onClick={() => navigate("/dashboard/inventory")}>
            <Package size={18} /> Inventory Count
          </Action>
          <Action onClick={() => navigate("/dashboard/email")}>
            <Mail size={18} /> Send Broadcast Email
          </Action>
        </List>
      </div>

      <AlertBox>
        <AlertTitle>
          <AlertCircle size={16} /> SYSTEM ALERT
        </AlertTitle>
        <AlertText>
          A/C maintenance scheduled for tomorrow at 10:00 AM in Studio B.
        </AlertText>
      </AlertBox>
    </Card>
  );
};

export default QuickActions;
