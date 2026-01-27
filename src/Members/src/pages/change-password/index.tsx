import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // 1. Toastni import qiling
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

const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
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
    confirmPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      toast.error("Foydalanuvchi aniqlanmadi!");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    // Validatsiya
    if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Yangi parollar mos kelmadi!");
      return;
    }

    if (data.newPassword.length < 6) {
      toast.error("Parol kamida 6 ta belgidan iborat bo'lsin!");
      return;
    }

    // 2. Loading holatini toasterda ko'rsatish
    const toastId = toast.loading("Parol yangilanmoqda...");
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
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
          }),
        },
      );

      if (response.ok) {
        toast.success("Parol muvaffaqiyatli o'zgartirildi!", { id: toastId });
        navigate("/users/profile");
      } else {
        const errData = await response.json();
        toast.error(errData.message || "Eski parol noto'g'ri!", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Server bilan aloqa uzildi!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Change Password</Title>
        <Subtitle>Keep your account secure</Subtitle>

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
                    ? "#ff4d4d"
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
