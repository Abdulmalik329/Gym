import styled from "styled-components";

const Card = styled.div`
  background: linear-gradient(180deg, #0f1318, #0b0e13);
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #1f2937;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;
const Toggle = styled.div`
  display: flex;
  gap: 4px;
  background: #111827;
  padding: 4px;
  border-radius: 999px;
`;
const Btn = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#2563eb" : "transparent")};
  color: #fff;
  border: none;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
`;
const ChartArea = styled.div`
  flex: 1;
  margin: 20px 0;
  border-radius: 12px;
  background: linear-gradient(180deg, #0b1220, #020617);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 10px 20px;
`;
const Times = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;
const Time = styled.span`
  font-size: 11px;
  color: #64748b;
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`;
const Legend = styled.div`
  display: flex;
  gap: 16px;
  color: #94a3b8;
`;
const Dot = styled.span<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: inline-block;
  margin-right: 6px;
`;
const Occupancy = styled.span`
  color: #22c55e;
`;

interface HeatmapProps {
  view: "daily" | "weekly";
  setView: (v: "daily" | "weekly") => void;
}

const Heatmap = ({ view, setView }: HeatmapProps) => (
  <Card>
    <Header>
      <Title>Attendance Heatmap</Title>
      <Toggle>
        <Btn active={view === "daily"} onClick={() => setView("daily")}>
          Daily
        </Btn>
        <Btn active={view === "weekly"} onClick={() => setView("weekly")}>
          Weekly
        </Btn>
      </Toggle>
    </Header>

    <ChartArea />

    <Times>
      {["6am", "9am", "12pm", "3pm", "6pm", "9pm", "12am"].map((t) => (
        <Time key={t}>{t}</Time>
      ))}
    </Times>

    <Footer>
      <Legend>
        <div>
          <Dot color="#3b82f6" /> Peak Usage
        </div>
        <div>
          <Dot color="#1f2937" /> Low Usage
        </div>
      </Legend>
      <span>
        Average occupancy <Occupancy>85%</Occupancy>
      </span>
    </Footer>
  </Card>
);

export default Heatmap;
