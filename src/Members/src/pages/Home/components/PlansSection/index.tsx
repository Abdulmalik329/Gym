import {
  SectionContainer,
  SectionTitle,
  PlansGrid,
  PlanCard,
  PlanName,
  PlanPrice,
  PlanFeatureList,
  PlanFeatureItem,
} from "./PlansSection.styled";

interface Props {
  plans: any[];
  currentPlanName: string;
}

const PlansSection = ({ plans, currentPlanName }: Props) => {
  return (
    <SectionContainer>
      <SectionTitle>Mavjud Tariflar</SectionTitle>
      <PlansGrid>
        {plans.length > 0 ? (
          plans.map((plan: any) => (
            <PlanCard key={plan.id} active={currentPlanName === plan.name}>
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
          <p style={{ color: "#888", gridColumn: "1/-1", textAlign: "center" }}>
            Tariflar topilmadi
          </p>
        )}
      </PlansGrid>
    </SectionContainer>
  );
};

export default PlansSection;
