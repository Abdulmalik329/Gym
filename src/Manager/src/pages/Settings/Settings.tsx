import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  Page,
  Title,
  Subtitle,
  Card,
  CardHeader,
  CardTitle,
  Divider,
  Row,
  Field,
  Label,
  Input,
  Button,
  SecondaryButton,
  Hint,
  ErrorText,
  SuccessText,
  CodeRow,
  CodeInput,
  AvatarRow,
  AvatarImg,
  AvatarFallback,
} from "./Settings.styled";

/* ===================== TYPES ===================== */
type MeResponse = {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string | null;
  image_url: string | null;
  gymId: number | null;
};

/* ===================== API CONFIG ===================== */
const BASE_URL = "https://nt-gym-api.it-mahalla.uz";

const API = {
  ME: "/api/users/me",
  UPDATE_USER: (id: number) => `/api/users/${id}`,
  PASS_SEND_OTP: "/api/auth/password/send-otp",
  PASS_VERIFY_OTP: "/api/auth/password/verify-otp",
};

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ===================== HELPERS ===================== */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const normalizeErrorMessage = (e: any, fallback: string) => {
  const raw =
    e?.response?.data?.message || e?.response?.data?.error || e?.message || "";
  const msg = String(raw).trim();
  if (
    msg.startsWith("Cannot POST") ||
    msg.startsWith("Cannot GET") ||
    msg.includes("<!DOCTYPE html>") ||
    msg.includes("<html")
  ) {
    return "";
  }
  return msg || fallback;
};

/* ===================== COMPONENT ===================== */
const Settings = () => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<MeResponse>({
    id: 0,
    role: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: null,
    image_url: null,
    gymId: null,
  });

  const [newPhone, setNewPhone] = useState("");
  const [phoneSaving, setPhoneSaving] = useState(false);

  const [passStep, setPassStep] = useState<1 | 2>(1);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpValue = useMemo(() => otp.join(""), [otp]);
  const [passBusy, setPassBusy] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toast = (type: "error" | "success" | "", msg: string) => {
    setError("");
    setSuccess("");
    if (type === "error") setError(msg);
    if (type === "success") setSuccess(msg);
  };

  const fullName = useMemo(() => {
    const fn = user.firstName?.trim() || "";
    const ln = user.lastName?.trim() || "";
    return `${fn} ${ln}`.trim() || "User";
  }, [user.firstName, user.lastName]);

  const initials = useMemo(() => {
    const a = user.firstName?.[0] || "";
    const b = user.lastName?.[0] || "";
    return (a + b).toUpperCase() || "U";
  }, [user.firstName, user.lastName]);

  const loadMe = async () => {
    setLoading(true);
    try {
      const r = await api.get<MeResponse>(API.ME);
      const data = r.data;

      setUser({
        id: data.id,
        role: data.role,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
        email: data.email || "",
        birthDate: data.birthDate ?? null,
        image_url: data.image_url ?? null,
        gymId: data.gymId ?? null,
      });

      setNewPhone(data.phone || "");
    } catch (e: any) {
      const nice = normalizeErrorMessage(
        e,
        "Unable to load account details. Please try again.",
      );
      toast("error", nice);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  const savePhone = async () => {
    toast("", "");
    const cleaned = newPhone.trim();

    if (!cleaned) return toast("error", "Please enter a phone number.");
    if (!user.id) return toast("error", "User ID not found.");

    setPhoneSaving(true);
    try {
      const r = await api.patch(API.UPDATE_USER(user.id), { phone: cleaned });
      const updatedPhone = r.data?.phone ?? r.data?.data?.phone ?? cleaned;
      setUser((p) => ({ ...p, phone: updatedPhone }));
      toast("success", "Phone number updated successfully.");
    } catch (e: any) {
      const nice = normalizeErrorMessage(
        e,
        "We couldn't update your phone number. Please try again.",
      );
      toast("error", nice);
    } finally {
      setPhoneSaving(false);
    }
  };

  const sendPasswordOtp = async () => {
    toast("", "");

    if (!user.email || !isEmail(user.email))
      return toast("error", "Account email is invalid.");
    if (!currentPassword)
      return toast("error", "Please enter your current password.");
    if (!newPassword || newPassword.length < 6)
      return toast("error", "New password must be at least 6 characters.");

    setPassBusy(true);
    try {
      await api.post(API.PASS_SEND_OTP, {
        email: user.email,
        currentPassword,
        newPassword,
      });

      setPassStep(2);
      setOtp(["", "", "", "", "", ""]);
      toast("success", "Verification code sent to your email.");
    } catch (e: any) {
      const nice = normalizeErrorMessage(
        e,
        "Password verification service is not available right now.",
      );
      toast("error", nice);
    } finally {
      setPassBusy(false);
    }
  };

  const verifyPasswordOtpAndChange = async () => {
    toast("", "");

    if (otpValue.length !== 6)
      return toast("error", "Please enter the 6-digit verification code.");
    if (!newPassword || newPassword.length < 6)
      return toast("error", "New password must be at least 6 characters.");

    setPassBusy(true);
    try {
      await api.post(API.PASS_VERIFY_OTP, {
        email: user.email,
        code: otpValue,
        newPassword,
      });

      setPassStep(1);
      setCurrentPassword("");
      setNewPassword("");
      setOtp(["", "", "", "", "", ""]);
      toast("success", "Password updated successfully.");
    } catch (e: any) {
      const nice = normalizeErrorMessage(
        e,
        "We couldn't verify the code. Please try again.",
      );
      toast("error", nice);
    } finally {
      setPassBusy(false);
    }
  };

  // O'ZGARTIRILDI: Event tipini berish xatolikni bartaraf etadi
  const onOtpChange = (i: number, val: string) => {
    const v = val.slice(-1);
    const copy = [...otp];
    copy[i] = v;
    setOtp(copy);

    const next = document.getElementById(
      `otp-${i + 1}`,
    ) as HTMLInputElement | null;
    if (v && next) next.focus();
  };

  if (loading) {
    return (
      <Page>
        <Title>Account Settings</Title>
        <Subtitle>Loading your profile...</Subtitle>
      </Page>
    );
  }

  return (
    <Page>
      <Title>Account Settings</Title>
      <Subtitle>Manage your personal information and security</Subtitle>

      {error && <ErrorText>⚠ {error}</ErrorText>}
      {success && <SuccessText>✓ {success}</SuccessText>}

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>

        <AvatarRow>
          {user.image_url ? (
            <AvatarImg src={user.image_url} alt={fullName} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}

          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>
              {fullName}
            </div>
            <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>
              Role:{" "}
              <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                {user.role}
              </span>
            </div>
            {user.gymId && (
              <div style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>
                Gym ID: #{user.gymId}
              </div>
            )}
          </div>
        </AvatarRow>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
        </CardHeader>

        <Field>
          <Label>Email</Label>
          <Input value={user.email} disabled />
          <Hint>Email is your login identifier and can’t be changed.</Hint>
        </Field>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phone Number</CardTitle>
        </CardHeader>

        <Row>
          <Field>
            <Label>Phone</Label>
            <Input
              value={newPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPhone(e.target.value)
              }
              placeholder="+998901234567"
            />
            <Hint>This number will be used for account notifications.</Hint>
          </Field>

          <Button onClick={savePhone} disabled={phoneSaving}>
            {phoneSaving ? "Saving..." : "Save Changes"}
          </Button>
        </Row>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>

        {passStep === 1 && (
          <>
            <Field>
              <Label>Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="••••••••"
              />
            </Field>

            <Divider />

            <Field>
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Minimum 6 characters"
              />
              <Hint>
                A verification code will be sent to <b>{user.email}</b> to
                confirm this change.
              </Hint>
            </Field>

            <Divider />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={sendPasswordOtp} disabled={passBusy}>
                {passBusy ? "Sending..." : "Update Password"}
              </Button>
            </div>
          </>
        )}

        {passStep === 2 && (
          <>
            <Label style={{ textAlign: "center", display: "block" }}>
              Enter Verification Code
            </Label>
            <Hint style={{ textAlign: "center", marginBottom: 20 }}>
              We sent a 6-digit code to {user.email}
            </Hint>

            <CodeRow>
              {otp.map((x, i) => (
                <CodeInput
                  key={i}
                  id={`otp-${i}`}
                  value={x}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onOtpChange(i, e.target.value)
                  }
                />
              ))}
            </CodeRow>

            <Divider />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <SecondaryButton
                onClick={() => {
                  setPassStep(1);
                  setOtp(["", "", "", "", "", ""]);
                }}
                disabled={passBusy}
              >
                Back
              </SecondaryButton>

              <Button onClick={verifyPasswordOtpAndChange} disabled={passBusy}>
                {passBusy ? "Verifying..." : "Confirm & Change"}
              </Button>
            </div>
          </>
        )}
      </Card>
    </Page>
  );
};

export default Settings;
