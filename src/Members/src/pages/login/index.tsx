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

// Tokenni decode qiluvchi funksiya (Login faylida ham bo'lishi kerak)
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
    return null;
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setLoading(true);

    try {
      const isEmail = form.email.includes("@");
      const payload: any = { password: form.password };
      if (isEmail) payload.email = form.email;
      else payload.phoneNumber = form.email;

      const response = await fetch(
        "https://nt-gym-api.it-mahalla.uz/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const token = data.token || data.accessToken;

        // 1. Tokenni saqlash
        localStorage.setItem("token", token);

        // 2. ID ni Tokendan olish va saqlash (MUHIM QISM)
        const decoded = decodeJwt(token);
        // Token ichida ID odatda 'sub', 'id' yoki 'user_id' bo'ladi
        const userId = decoded?.id || decoded?.sub || decoded?.user?.id;

        if (userId) {
          localStorage.setItem("userId", userId);
          console.log("User ID localStorage ga saqlandi:", userId);
        } else {
          console.error("Token ichida ID topilmadi!");
        }

        // 3. Refresh tokenni cookie ga yozish
        if (data.refreshToken) {
          document.cookie = `refreshToken=${data.refreshToken}; path=/; Secure; SameSite=Strict`;
        }

        // 4. Rolga qarab yo'naltirish
        const userRole = (data?.user?.role || data?.role || "").toLowerCase();
        if (userRole.includes("admin")) navigate("/admin/dashboard");
        else if (userRole.includes("manager")) navigate("/manager/dashboard");
        else navigate("/users");
      } else {
        alert(data.message || "Login xatoligi");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server xatosi");
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
          name="email"
          placeholder="Email or Phone"
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Checking..." : "LOGIN"}
        </Button>
        <BottomLinks>
          <span>Forgot password?</span>
          <a href="#" onClick={() => navigate("/register")}>
            Sign up now
          </a>
        </BottomLinks>
      </LoginCard>
    </Wrapper>
  );
};

export default Login;
