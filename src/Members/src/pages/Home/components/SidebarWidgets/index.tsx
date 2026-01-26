import {
  PerksCard,
  PerksTitle,
  PerksList,
  MotivationCard,
} from "./SidebarWidgets.styled";

interface Props {
  features: string[];
  streak: number;
}

const SidebarWidgets = ({ features, streak }: Props) => {
  return (
    <>
      <PerksCard>
        <PerksTitle>Qulayliklar</PerksTitle>
        <PerksList>
          {features.length > 0 ? (
            features.map((feature: string, index: number) => (
              <p
                key={index}
                style={{ color: "#fff", fontSize: "13px", marginBottom: "8px" }}
              >
                ✨ {feature}
              </p>
            ))
          ) : (
            <p style={{ color: "#777", fontSize: "12px" }}>Ma'lumot yo'q</p>
          )}
        </PerksList>
      </PerksCard>

      <MotivationCard>
        {streak > 0 ? (
          <>
            🔥 {streak} kunlik STREAK!
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
    </>
  );
};

export default SidebarWidgets;
