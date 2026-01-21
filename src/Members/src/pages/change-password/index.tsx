import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Card,
  Title,
  Subtitle,
  Field,
  Label,
  InputWrapper,
  Input,
  Toggle,
  Button,
} from "./ChangePassword.styled";

// --- Tokenni decode qilish funksiyasi ---
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

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "", // Yangi qo'shilgan maydon
  });

  // Ko'zchalar (Show/Hide) uchun state
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 1. Sahifa yuklanganda ID ni tokendan olish
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const decoded = decodeJwt(token);
    const id = decoded?.id || decoded?.sub || decoded?.user?.id;

    if (id) {
      setUserId(id);
    } else {
      alert("Foydalanuvchi aniqlanmadi. Qayta kiring.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    // Validatsiya
    if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    // 2. Parollarni solishtirish
    if (data.newPassword !== data.confirmPassword) {
      alert("Yangi parollar mos kelmadi! Iltimos tekshirib qaytadan kiriting.");
      return;
    }

    if (data.newPassword.length < 6) {
      // Masalan, minimal uzunlik
      alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // 3. Backendga so'rov yuborish
      const response = await fetch(
        `https://nt-gym-api.it-mahalla.uz/api/users/${userId}/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            // confirmPassword backendga yuborilmaydi, u faqat tekshirish uchun edi
          }),
        }
      );

      if (response.ok) {
        alert("Parol muvaffaqiyatli o'zgartirildi!");
        navigate("/users/profile");
      } else {
        const errData = await response.json();
        alert(
          errData.message ||
            "Eski parol noto'g'ri kiritildi yoki xatolik yuz berdi."
        );
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Server bilan aloqa yo'q.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Change Password</Title>
        <Subtitle>Keep your account secure</Subtitle>

        {/* ESKI PAROL */}
        <Field>
          <Label>Old password</Label>
          <InputWrapper>
            <Input
              name="oldPassword"
              type={showOld ? "text" : "password"}
              placeholder="Enter old password"
              value={data.oldPassword}
              onChange={handleChange}
            />
            <Toggle onClick={() => setShowOld(!showOld)}>
              {showOld ? "Hide" : "Show"}
            </Toggle>
          </InputWrapper>
        </Field>

        {/* YANGI PAROL */}
        <Field>
          <Label>New password</Label>
          <InputWrapper>
            <Input
              name="newPassword"
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={data.newPassword}
              onChange={handleChange}
            />
            <Toggle onClick={() => setShowNew(!showNew)}>
              {showNew ? "Hide" : "Show"}
            </Toggle>
          </InputWrapper>
        </Field>

        {/* YANGI PAROLNI TASDIQLASH */}
        <Field>
          <Label>Confirm new password</Label>
          <InputWrapper>
            <Input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat new password"
              value={data.confirmPassword}
              onChange={handleChange}
              style={{
                borderColor:
                  data.confirmPassword &&
                  data.newPassword !== data.confirmPassword
                    ? "red"
                    : "",
              }}
            />
            <Toggle onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? "Hide" : "Show"}
            </Toggle>
          </InputWrapper>
        </Field>

        <Button onClick={submit} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </Card>
    </Wrapper>
  );
};

export default ChangePassword;
