import { useEffect, useState } from "react";
import {
  Container,
  Header,
  Title,
  ClearButton,
  List,
  NotificationCard,
  IconWrapper,
  Content,
  MessageTitle,
  MessageBody,
  Time,
} from "./Notificate.styled";
import { useNavigate } from "react-router-dom";

// --- YORDAMCHI: Token decode ---
const decodeJwt = (token: string) => {
  try {
    return JSON.parse(
      decodeURIComponent(
        window
          .atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      )
    );
  } catch (e) {
    return null;
  }
};

// Notification interface
interface NotificationItem {
  id: number;
  type: "success" | "warning" | "danger" | "info";
  title: string;
  message: string;
  date: Date;
  icon: string;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const decoded = decodeJwt(token);
      const userId = decoded?.id || decoded?.sub || decoded?.user?.id;

      try {
        // Ma'lumotlarni olish
        const [paymentsRes, attendanceRes] = await Promise.all([
          fetch(`https://nt-gym-api.it-mahalla.uz/api/payments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`https://nt-gym-api.it-mahalla.uz/api/attendances`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const payments = paymentsRes.ok ? await paymentsRes.json() : [];
        const attendance = attendanceRes.ok ? await attendanceRes.json() : [];

        // --- NOTIFICATIONLARNI GENERATSIYA QILISH ---
        let generated: NotificationItem[] = [];

        // 1. TO'LOVLAR (Success)
        if (Array.isArray(payments)) {
          payments.forEach((p: any, index) => {
            generated.push({
              id: 1000 + index,
              type: "success",
              title: "To'lov qabul qilindi",
              message: `Sizning ${p.amount} UZS miqdoridagi to'lovingiz muvaffaqiyatli amalga oshirildi.`,
              date: new Date(p.createdAt),
              icon: "💰",
            });
          });
        }

        // 2. DAVOMAT (Success & Streak)
        if (Array.isArray(attendance)) {
          // Oxirgi 10 ta kelganini olamiz
          attendance.slice(0, 10).forEach((a: any, index) => {
            generated.push({
              id: 2000 + index,
              type: "success",
              title: "Mashg'ulot yakunlandi",
              message:
                "Bugungi mashg'ulotni a'lo darajada o'tkazdingiz! Muskullar o'sishda davom etmoqda.",
              date: new Date(a.createdAt),
              icon: "💪",
            });
          });

          // Streak Logic (Taxminiy)
          if (attendance.length >= 3) {
            generated.push({
              id: 3000,
              type: "warning",
              title: "🔥 3 Kunlik Streak!",
              message:
                "Qoyil! Siz ketma-ket 3 kun mashg'ulot qildingiz. To'xtab qolmang!",
              date: new Date(), // Hozirgi vaqt
              icon: "🔥",
            });
          }
        }

        // 3. KELMAGAN KUNLAR (Danger) - Mock
        // Haqiqiy loyihada buni backend hisoblab berishi kerak, hozircha qo'lda qo'shamiz
        generated.push({
          id: 4001,
          type: "danger",
          title: "Sizni sog'indik!",
          message:
            "Oxirgi 3 kundan beri ko'rinmadingiz. Qaytish vaqti kelmadimi?",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 kun oldin
          icon: "⚠️",
        });

        // 4. PROFIL VA PAROL (Info) - Mock
        generated.push({
          id: 5001,
          type: "info",
          title: "Profil yangilandi",
          message:
            "Sizning shaxsiy ma'lumotlaringiz muvaffaqiyatli o'zgartirildi.",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 hafta oldin
          icon: "👤",
        });

        generated.push({
          id: 5002,
          type: "info",
          title: "Parol o'zgartirildi",
          message:
            "Xavfsizlik maqsadida parolingiz yangilandi. Agar buni siz qilmagan bo'lsangiz, admin bilan bog'laning.",
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 kun oldin
          icon: "🔒",
        });

        // SANASI BO'YICHA TARTIBLASH (Eng yangisi tepada)
        generated.sort((a, b) => b.date.getTime() - a.date.getTime());

        setNotifications(generated);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  if (loading) return <Container>Yuklanmoqda...</Container>;

  return (
    <Container>
      <Header>
        <Title>Bildirishnomalar ({notifications.length})</Title>
        <ClearButton onClick={() => setNotifications([])}>Tozalash</ClearButton>
      </Header>

      <List>
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationCard key={item.id} type={item.type}>
              <IconWrapper type={item.type}>{item.icon}</IconWrapper>
              <Content>
                <MessageTitle>{item.title}</MessageTitle>
                <MessageBody>{item.message}</MessageBody>
                <Time>{item.date.toLocaleString()}</Time>
              </Content>
            </NotificationCard>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#6b7a8f" }}>
            Yangi bildirishnomalar yo'q
          </p>
        )}
      </List>
    </Container>
  );
};

export default Notifications;
