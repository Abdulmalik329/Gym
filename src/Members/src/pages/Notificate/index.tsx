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
  // Yangi qo'shilgan stillarni import qilamiz
  SkeletonPulse,
  SkeletonCard,
} from "./Notificate.styled";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// API dan keladigan Notification strukturasi
interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

// --- SKELETON COMPONENTS ---
const NotificationsSkeleton = () => {
  return (
    <Container>
      <Header>
        {/* Title o'rni */}
        <SkeletonPulse width="200px" height="32px" borderRadius="8px" />
        {/* Button o'rni */}
        <SkeletonPulse width="150px" height="35px" borderRadius="8px" />
      </Header>

      <List>
        {/* 5 ta soxta card yaratamiz */}
        {[1, 2, 3, 4, 5].map((item) => (
          <SkeletonCard key={item}>
            {/* Icon o'rni */}
            <SkeletonPulse
              width="40px"
              height="40px"
              borderRadius="50%"
              style={{ flexShrink: 0 }}
            />
            
            {/* Content o'rni */}
            <div style={{ flex: 1 }}>
              {/* Title qatori */}
              <SkeletonPulse
                width="40%"
                height="18px"
                marginBottom="10px"
                borderRadius="4px"
              />
              {/* Message qatori (uzunroq) */}
              <SkeletonPulse
                width="90%"
                height="14px"
                marginBottom="8px"
                borderRadius="4px"
              />
              {/* Message qatori (kaltaroq) */}
              <SkeletonPulse
                width="60%"
                height="14px"
                marginBottom="12px"
                borderRadius="4px"
              />
              {/* Time qatori */}
              <SkeletonPulse width="20%" height="12px" borderRadius="4px" />
            </div>
          </SkeletonCard>
        ))}
      </List>
    </Container>
  );
};

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Ma'lumotlarni yuklash funksiyasi
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const response = await fetch(
        `https://nt-gym-api.it-mahalla.uz/api/notifications/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Yuklashda xatolik");

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      toast.error("Bildirishnomalarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Barchasini o'qilgan deb belgilash
  const handleReadAll = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://nt-gym-api.it-mahalla.uz/api/notifications/read-all`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        toast.success("Barcha bildirishnomalar o'qildi");
        fetchNotifications();
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const handleReadSingle = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(
        `https://nt-gym-api.it-mahalla.uz/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "SYSTEM": return "⚙️";
      case "PAYMENT": return "💰";
      case "ATTENDANCE": return "💪";
      default: return "🔔";
    }
  };

  const getTypeStyle = (type: string): any => {
    if (type === "SYSTEM") return "info";
    if (type === "PAYMENT") return "success";
    return "warning";
  };

  // YANGILANGAN QISM: Skeleton Loading ishlatish
  if (loading) return <NotificationsSkeleton />;

  return (
    <Container>
      <Header>
        <Title>Bildirishnomalar ({notifications.length})</Title>
        <ClearButton onClick={handleReadAll}>
          Barchasini o'qilgan deb belgilash
        </ClearButton>
      </Header>

      <List>
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationCard
              key={item.id}
              type={getTypeStyle(item.type)}
              style={{ opacity: item.isRead ? 0.6 : 1, cursor: "pointer" }}
              onClick={() => !item.isRead && handleReadSingle(item.id)}
            >
              <IconWrapper type={getTypeStyle(item.type)}>
                {getIcon(item.type)}
              </IconWrapper>
              <Content>
                <MessageTitle>
                  {item.title} {!item.isRead && "🔵"}
                </MessageTitle>
                <MessageBody>{item.message}</MessageBody>
                <Time>{new Date(item.createdAt).toLocaleString("uz-UZ")}</Time>
              </Content>
            </NotificationCard>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#6b7a8f",
              marginTop: "20px",
            }}
          >
            Hozircha bildirishnomalar mavjud emas
          </p>
        )}
      </List>
    </Container>
  );
};

export default Notifications;