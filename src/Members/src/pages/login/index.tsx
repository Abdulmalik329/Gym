import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../../assets/videos/gym-bg.mp4";

import {
  Wrapper,
  BgVideo,
  Overlay,
  LoginCard,
  Title,
  Subtitle,
  Input,
  Button,
  BottomLinks,
} from "./Login.styled";

/* JWT decode */
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Barcha maydonlarni to‘ldiring");
      return;
    }

    setLoading(true);

    try {
      const payload: any = { password: form.password };
      if (form.email.includes("@")) payload.email = form.email;
      else payload.phoneNumber = form.email;

      const res = await fetch(
        "https://nt-gym-api.it-mahalla.uz/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login xatoligi");
        return;
      }

      const token = data.token || data.accessToken;
      localStorage.setItem("token", token);

      const decoded = decodeJwt(token);
      const userId = decoded?.id || decoded?.sub;
      if (userId) localStorage.setItem("userId", userId);

      if (data.refreshToken) {
        document.cookie = `refreshToken=${data.refreshToken}; path=/; Secure; SameSite=Strict`;
      }

      const role = (data?.user?.role || "").toLowerCase();
      if (role.includes("admin")) navigate("/admin/dashboard");
      else if (role.includes("manager")) navigate("/manager/dashboard");
      else navigate("/users");
    } catch (err) {
      alert("Server xatosi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <BgVideo autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </BgVideo>

      <Overlay />

      {/* LOGIN */}
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
          <span></span>
          <a onClick={() => navigate("/forgot")}>Forgot password?</a>
        </BottomLinks>
      </LoginCard>
    </Wrapper>
  );
};

export default Login;
