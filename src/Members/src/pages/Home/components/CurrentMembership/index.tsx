import {
  MembershipCard,
  CardHeader,
  Label,
  CardTitle,
  MembershipDetails,
  DetailRow,
  Value,
  StatusBadge,
} from "./CurrentMembership.styled";

interface Props {
  membership: {
    planName: string;
    status: string;
    expiresAt: string;
  };
  phone: string;
}

const CurrentMembership = ({ membership, phone }: Props) => {
  return (
    <MembershipCard>
      <CardHeader>
        <div>
          <Label>Joriy A'zolik</Label>
          <CardTitle>{membership.planName}</CardTitle>
        </div>
      </CardHeader>
      <MembershipDetails>
        <DetailRow>
          <Label>Holati</Label>
          <StatusBadge>● {membership.status}</StatusBadge>
        </DetailRow>
        <DetailRow>
          <Label>Tugash vaqti</Label>
          <Value>{membership.expiresAt}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Email</Label>
          <Value style={{ fontSize: "12px" }}>{phone}</Value>
        </DetailRow>
      </MembershipDetails>
    </MembershipCard>
  );
};

export default CurrentMembership;
