import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  LoginCard,
  Title,
  Subtitle,
  Input,
  Button,
  BottomLinks,
} from "./Login.styled";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent
  ) => {
    // 1. Sahifa yangilanib ketishini oldini olish
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setLoading(true);

    try {
      // 2. Email yoki Telefon raqam ekanligini aniqlash
      const isEmail = form.email.includes("@");

      const payload: any = {
        password: form.password,
      };

      // Agar "@" belgisi bo'lsa email deb yuboramiz, bo'lmasa phoneNumber
      if (isEmail) {
        payload.email = form.email;
      } else {
        payload.phoneNumber = form.email;
      }

      console.log("Yuborilayotgan ma'lumot:", payload);

      const response = await fetch(
        "https://nt-gym-api.it-mahalla.uz/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Server javobi:", data);

      if (response.ok) {
        // 3. Tokenni olish va saqlash (token yoki accessToken)
        const token = data.token || data.accessToken;

        if (!token) {
          alert("Xatolik: Server token qaytarmadi!");
          setLoading(false);
          return;
        }

        localStorage.setItem("token", token);
        console.log("Token saqlandi.");

        // 4. Rolni aniqlash (kichik harfga o'tkazib)
        // Backenddan data.user.role yoki data.role kelishi mumkin
        const rawRole = data?.user?.role || data?.role || "";
        const userRole = rawRole.toLowerCase();

        console.log("Aniqlangan rol:", userRole);

        // 5. Yo'naltirish
        switch (userRole) {
          case "super_admin":
            navigate("/admin/dashboard");
            break;

          case "gym_manager":
          case "gymmanager":
            navigate("/manager/dashboard");
            break;

          case "member":
            navigate("/users"); // Memberlar uchun sahifa
            break;

          default:
            // Agar rol noma'lum bo'lsa ham, token borligi uchun users ga o'tkazamiz
            navigate("/users");
        }
      } else {
        alert(data.message || "Login yoki parol noto'g'ri!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server bilan aloqa yo'q!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <LoginCard as="form" onSubmit={handleLogin}>
        <Title>Welcome Back</Title>
        <Subtitle>Please login to your account</Subtitle>

        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "CHECKING..." : "LOGIN"}
        </Button>

        <BottomLinks>
          <span>Forgot password?</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Sign up now
          </a>
        </BottomLinks>
      </LoginCard>
    </Wrapper>
  );
};

export default Login;
