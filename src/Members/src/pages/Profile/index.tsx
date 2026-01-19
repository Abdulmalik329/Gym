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

// API dan keladigan ma'lumot turlari uchun interfeys
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
      // 1. Tokenni tekshirish
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // 2. Backendga so'rov (Home dagi kabi)
        const response = await fetch(
          "https://nt-gym-api.it-mahalla.uz/api/users",
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

        const data = await response.json();

        // 3. API ma'lumotlarini statega moslash (Mapping)
        // Backendda ba'zi fieldlar bo'lmasligi mumkin (null), shuning uchun default qiymatlar beramiz.
        const mappedUser: User = {
          firstName: data.firstName || "Foydalanuvchi",
          lastName: data.lastName || "",
          email: data.email || "Kiritilmagan",
          phone: data.phoneNumber || "Kiritilmagan",
          // Agar backend height/weight bermasa, 0 yoki null deb olamiz
          height: data.height || null,
          weight: data.weight || null,
          location: data.region || "Toshkent", // Backendda region bo'lsa
          bio: data.bio || "Ma'lumot yo'q",
          isActive: data.isActive ?? true, // Agar backend true/false qaytarsa
          createdAt: data.createdAt,
          gymId: data.gymId || null,
          // Avatar backendda bo'lmasa, random rasm qo'yamiz
          avatar: data.photoUrl
            ? `https://nt-gym-api.it-mahalla.uz/api/files/${data.photoUrl}` // Agar rasm ID yoki path bo'lsa
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
          {/* Qo'shimcha: Tizimdan chiqish tugmasi kerak bo'lsa */}
          <Button
            style={{
              backgroundColor: "#ff4d4d",
              borderColor: "#ff4d4d",
              marginTop: "10px",
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
