import {
  AttendanceCard,
  AttendanceHeader,
  Label,
  StreakBadge,
  WeekGrid,
} from "./AttendanceChart.styled";

// API dan keladigan ma'lumot formati
interface AttendanceRecord {
  checkInAt: string;
}

interface Props {
  records?: AttendanceRecord[];
  totalVisits?: number;
}

const AttendanceChart = ({ records = [], totalVisits = 0 }: Props) => {
  // 1. Joriy haftani aniqlash (Dushanba - Yakshanba)
  const getCurrentWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sun) - 6 (Sat)
    const dayIndex = currentDay === 0 ? 7 : currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayIndex - 1));
    monday.setHours(0, 0, 0, 0);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const currentWeek = getCurrentWeekDays();
  const todayDateString = new Date().toDateString();

  // Yordamchi funksiya: Sanani YYYY-MM-DD formatga o'tkazish (Lokal vaqt bo'yicha)
  const formatDateToLocalISO = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 2. O'zgartirilgan tekshirish funksiyasi
  const isPresent = (dateToCheck: Date) => {
    // Kalendardagi ushbu katakchaning sanasi (masalan: "2026-01-28")
    const dateCheckStr = formatDateToLocalISO(dateToCheck);

    return records.some((record) => {
      // API dan kelgan sanani "T" harfigacha qirqib olamiz.
      // "2026-01-28T23:59:59.999Z" -> "2026-01-28" bo'lib qoladi.
      // Bu usul vaqt mintaqasi o'zgarishini oldini oladi.
      const recordDateStr = record.checkInAt.split("T")[0];

      return recordDateStr === dateCheckStr;
    });
  };

  // Bugun kelganligini tekshirish
  const isTodayPresent = isPresent(new Date());

  const weekDayLabels = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

  return (
    <AttendanceCard>
      <AttendanceHeader>
        <div>
          <Label>Haftalik Davomat</Label>
          <div style={{ fontSize: "12px", color: "#8b98a8", marginTop: "4px" }}>
            Jami {totalVisits} marta tashrif
          </div>
        </div>
        <StreakBadge>
          Bugun: {isTodayPresent ? "Keldi ✅" : "Yo'q ❌"}
        </StreakBadge>
      </AttendanceHeader>

      <WeekGrid
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        {currentWeek.map((date, index) => {
          const active = isPresent(date);
          const isToday = date.toDateString() === todayDateString;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Kun sanasi va aylanasi */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: active ? "#2b8feb" : "#1a2634",
                  border: isToday
                    ? "2px solid #fff"
                    : active
                      ? "none"
                      : "1px solid #2a3b4c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: active ? "#fff" : "#6b7a8f",
                  fontWeight: "bold",
                  fontSize: "14px",
                  boxShadow: active
                    ? "0 4px 10px rgba(43, 143, 235, 0.4)"
                    : "none",
                  cursor: "default",
                }}
                title={date.toLocaleDateString()}
              >
                {weekDayLabels[index]}
              </div>

              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: active ? "#2b8feb" : "transparent",
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
