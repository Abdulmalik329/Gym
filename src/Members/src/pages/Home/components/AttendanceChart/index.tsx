import {
  AttendanceCard,
  AttendanceHeader,
  Label,
  StreakBadge,
  WeekGrid,
} from "./AttendanceChart.styled";

interface Props {
  attendance: {
    totalVisits: number;
    week: Record<string, boolean>;
  };
}

const AttendanceChart = ({ attendance }: Props) => {
  const weekDays = [
    { key: "M", label: "Du" },
    { key: "T", label: "Se" },
    { key: "W", label: "Ch" },
    { key: "Th", label: "Pa" },
    { key: "F", label: "Ju" },
    { key: "S", label: "Sh" },
    { key: "Su", label: "Ya" },
  ];

  return (
    <AttendanceCard>
      <AttendanceHeader>
        <div>
          <Label>Haftalik Davomat</Label>
          <div style={{ fontSize: "12px", color: "#8b98a8", marginTop: "4px" }}>
            Jami {attendance.totalVisits} marta tashrif
          </div>
        </div>
        <StreakBadge>
          Bugun: {attendance.week["T"] ? "Keldi" : "Yo'q"}
        </StreakBadge>
      </AttendanceHeader>

      <WeekGrid
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        {weekDays.map((day) => {
          const isActive = attendance.week[day.key];
          return (
            <div
              key={day.key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: isActive ? "#2b8feb" : "#1a2634",
                  border: isActive ? "none" : "1px solid #2a3b4c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive ? "#fff" : "#6b7a8f",
                  fontWeight: "bold",
                  fontSize: "14px",
                  boxShadow: isActive
                    ? "0 4px 10px rgba(43, 143, 235, 0.4)"
                    : "none",
                }}
              >
                {day.label}
              </div>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: isActive ? "#2b8feb" : "transparent",
                }}
              />
            </div>
          );
        })}
      </WeekGrid>
    </AttendanceCard>
  );
};

export default AttendanceChart;
