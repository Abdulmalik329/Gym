import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  PasswordWrapper,
  ToggleIcon,
} from "./Login.styled";
import toast from "react-hot-toast";

const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [mode, setMode] = useState<"login" | "forgot" | "reset">("login");

  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 1. LOGIN MANTIQI
  const handleLogin = async () => {
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
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login xatoligi");

      // Token va IDni saqlash
      const token = data.token || data.accessToken;
      localStorage.setItem("token", token);

      const decoded = decodeJwt(token);
      if (decoded?.id || decoded?.sub) {
        localStorage.setItem("userId", decoded.id || decoded.sub);
      }

      // --- ROLLAR BO'YICHA YO'NALTIRISH ---
      // Backenddan odatda role string ko'rinishida keladi: "SUPER_ADMIN", "GYM_MANAGER" va h.k.
      const userRole = (data?.user?.role || data?.role || "").toUpperCase();

      if (userRole === "SUPER_ADMIN") {
        navigate("/admin/dashboard");
      } else if (userRole === "GYM_MANAGER") {
        navigate("/manager/dashboard"); // Meneger uchun dashboard
      } else if (userRole === "MEMBER") {
        navigate("/users"); // Oddiy foydalanuvchi
      } else {
        navigate("/users");
      }

      toast.success("Xush kelibsiz!"); 
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  // 2. FORGOT PASSWORD (OTP YUBORISH)
  const handleForgot = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://nt-gym-api.it-mahalla.uz/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email }),
        },
      );
      if (!res.ok) throw new Error("Email topilmadi yoki xato");
      alert("OTP kodi yuborildi!");
      setMode("reset");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. RESET PASSWORD (YANGILASH)
  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://nt-gym-api.it-mahalla.uz/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            otp: form.otp,
            newPassword: form.newPassword,
          }),
        },
      );
      if (!res.ok) throw new Error("OTP xato yoki muddati o'tgan");
      alert("Parol yangilandi! Endi login qilishingiz mumkin.");
      setMode("login");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") handleLogin();
    else if (mode === "forgot") handleForgot();
    else handleReset();
  };
  return (
    <Wrapper>
      <BgVideo autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </BgVideo>
      <Overlay />

      <LoginCard as="form" onSubmit={handleSubmit}>
        <Title>
          {mode === "login" && "Welcome Back"}
          {mode === "forgot" && "Reset Password"}
          {mode === "reset" && "New Password"}
        </Title>
        <Subtitle>
          {mode === "login" && "Please login to your account"}
          {mode === "forgot" && "Enter email to receive OTP"}
          {mode === "reset" && "Enter OTP and your new password"}
        </Subtitle>

        {/* EMAIL INPUT (Login va Forgot rejimlarida kerak) */}
        {(mode === "login" || mode === "forgot") && (
          <Input
            name="email"
            placeholder="Email or Phone"
            value={form.email}
            onChange={handleChange}
            required
          />
        )}

        {/* PASSWORD INPUT (Faqat Login rejimida) */}
        {mode === "login" && (
          <PasswordWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              style={{ paddingRight: "40px", marginBottom: 0 }}
              required
            />
            <ToggleIcon
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </ToggleIcon>
          </PasswordWrapper>
        )}

        {/* RESET INPUTS (Faqat Reset rejimida) */}
        {mode === "reset" && (
          <>
            <Input
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
              required
            />
          </>
        )}

        <Button type="submit" disabled={loading}>
          {loading
            ? "Checking..."
            : mode === "login"
              ? "LOGIN"
              : mode === "forgot"
                ? "SEND OTP"
                : "RESET"}
        </Button>

        <BottomLinks>
          {mode === "login" ? (
            <>
              <span></span>
              <a
                onClick={() => setMode("forgot")}
                style={{ cursor: "pointer" }}
              >
                Forgot password?
              </a>
            </>
          ) : (
            <a onClick={() => setMode("login")} style={{ cursor: "pointer" }}>
              ← Back to Login
            </a>
          )}
        </BottomLinks>
      </LoginCard>
    </Wrapper>
  );
};;

export default Login;