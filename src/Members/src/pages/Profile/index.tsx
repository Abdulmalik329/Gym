import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Header,
  Avatar,
  Content,
  Name,
  Bio,
  Grid,
  Item,
  Actions,
  Button,
} from "./Profile.styled";

// --- YORDAMCHI FUNKSIYA: Tokenni decode qilish ---
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Tokenni o'qishda xatolik:", error);
    return null;
  }
};

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  height: number | null;
  weight: number | null;
  location: string;
  bio: string;
  isActive: boolean;
  createdAt: string;
  gymId: number | null;
  avatar: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const decodedToken = decodeJwt(token);
      const userId =
        decodedToken?.id || decodedToken?.sub || decodedToken?.user?.id;

      if (!userId) {
        setError("Foydalanuvchi IDsi topilmadi. Qayta login qiling.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://nt-gym-api.it-mahalla.uz/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Xatolik: ${response.status}`);
        }

        const resData = await response.json();

        // KONSOLDA TEKSHIRISH UCHUN (F12 ni bosib Console ga qarang)
        console.log("Backenddan kelgan user ma'lumoti:", resData);

        const data = Array.isArray(resData) ? resData[0] : resData;

        // --- O'ZGARISH SHU YERDA ---
        // Ikkala variantni ham tekshiramiz: first_name YOKI firstName
        const mappedUser: User = {
          firstName: data.first_name || data.firstName || "Ism yo'q",
          lastName: data.last_name || data.lastName || "",
          email: data.email || "Kiritilmagan",
          phone: data.phone || data.phoneNumber || "Kiritilmagan",

          height: data.height || null,
          weight: data.weight || null,
          location: data.address || data.location || "Toshkent",
          bio: data.bio || "Ma'lumot yo'q",
          isActive: data.isActive ?? true,
          createdAt: data.createdAt,
          gymId: data.gym_id || data.gymId || null,

          avatar: data.photoUrl
            ? `https://nt-gym-api.it-mahalla.uz/api/files/${data.photoUrl}`
            : "https://randomuser.me/api/portraits/men/32.jpg",
        };

        setUser(mappedUser);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Profil ma'lumotlarini yuklashda xatolik.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading)
    return (
      <Wrapper>
        <Content>Yuklanmoqda...</Content>
      </Wrapper>
    );
  if (error)
    return (
      <Wrapper>
        <Content>{error}</Content>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          style={{ marginTop: 10 }}
        >
          Qayta kirish
        </Button>
      </Wrapper>
    );
  if (!user) return null;

  return (
    <Wrapper>
      <Header>
        <Avatar>
          <img src={user.avatar} alt="avatar" />
        </Avatar>
      </Header>

      <Content>
        <Name>
          {user.firstName} {user.lastName}
        </Name>

        <Bio>{user.bio}</Bio>

        <Grid>
          <Item>
            <span>Email</span>
            <p>{user.email}</p>
          </Item>

          <Item>
            <span>Phone</span>
            <p>{user.phone}</p>
          </Item>

          <Item>
            <span>Location</span>
            <p>{user.location}</p>
          </Item>

          <Item>
            <span>Height</span>
            <p>{user.height ? `${user.height} cm` : "Not set"}</p>
          </Item>

          <Item>
            <span>Weight</span>
            <p>{user.weight ? `${user.weight} kg` : "Not set"}</p>
          </Item>

          <Item>
            <span>Status</span>
            <p>{user.isActive ? "Active" : "Inactive"}</p>
          </Item>
        </Grid>

        <Actions>
          <Button onClick={() => navigate("/users/profile/edit")}>
            Edit Profile
          </Button>
          <Button
            outline
            onClick={() => navigate("/users/profile/change-password")}
          >
            Change Password
          </Button>

          <Button
            style={{
              backgroundColor: "#ff4d4d",
              borderColor: "#ff4d4d",
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Actions>
      </Content>
    </Wrapper>
  );
};

export default Profile;
