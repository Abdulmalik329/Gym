import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Header,
  AvatarWrapper,
  Camera,
  Form,
  Column,
  Field,
  Label,
  Input,
  SaveButton,
} from "./EditProfile.styled";

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
    return null;
  }
};

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    height: "",
    weight: "",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Default rasm
  });

  // 1. Sahifa yuklanganda eski ma'lumotlarni olib kelish
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Token ichidan ID ni olish
      const decoded = decodeJwt(token);
      const id = decoded?.id || decoded?.sub || decoded?.user?.id;

      if (!id) {
        alert("ID topilmadi");
        navigate("/login");
        return;
      }
      setUserId(id);

      try {
        const response = await fetch(
          `https://nt-gym-api.it-mahalla.uz/api/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resData = await response.json();
        // Array kelsa birinchisini olamiz
        const data = Array.isArray(resData) ? resData[0] : resData;

        // Backend ma'lumotlarini Formaga joylash
        setForm({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          height: data.height ? String(data.height) : "",
          weight: data.weight ? String(data.weight) : "",
          avatar: data.photoUrl
            ? `https://nt-gym-api.it-mahalla.uz/api/files/${data.photoUrl}`
            : "https://randomuser.me/api/portraits/men/32.jpg",
        });
      } catch (error) {
        console.error("Yuklashda xato:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. Ma'lumotlarni saqlash (PATCH request)
  const submit = async () => {
    if (!userId) return;

    setSaving(true);
    const token = localStorage.getItem("token");

    try {
      // Backend snake_case kutadi (first_name), bizda esa camelCase (firstName)
      // Raqamlarni stringdan numberga o'tkazamiz
      const payload = {
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        height: Number(form.height),
        weight: Number(form.weight),
        // Emailni yubormaymiz yoki o'zgartirmaymiz
      };

      console.log("Yuborilayotgan data:", payload);

      const response = await fetch(
        `https://nt-gym-api.it-mahalla.uz/api/users/${userId}`,
        {
          method: "PATCH", // O'zgartirish uchun PATCH yoki PUT ishlatiladi
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Profil muvaffaqiyatli yangilandi!");
        navigate("/users/profile"); // Profilga qaytish
      } else {
        const errData = await response.json();
        alert(`Xatolik: ${errData.message || "Saqlashda muammo bo'ldi"}`);
      }
    } catch (error) {
      console.error("Saqlashda xato:", error);
      alert("Server bilan aloqa yo'q");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Wrapper>Yuklanmoqda...</Wrapper>;

  return (
    <Wrapper>
      <Header>
        <AvatarWrapper>
          <img src={form.avatar} alt="avatar" />
          <Camera>📷</Camera>
        </AvatarWrapper>
      </Header>

      <Form>
        <Column>
          <Field>
            <Label>First name</Label>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              placeholder="Ismingiz"
            />
          </Field>

          <Field>
            <Label>Last name</Label>
            <Input
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              placeholder="Familiyangiz"
            />
          </Field>

          <Field>
            <Label>Height (cm)</Label>
            <Input
              name="height"
              type="number"
              value={form.height}
              onChange={onChange}
              placeholder="180"
            />
          </Field>
        </Column>

        <Column>
          <Field>
            <Label>Email (O'zgartirib bo'lmaydi)</Label>
            {/* EMAILNI BLOCKLASH QISMI */}
            <Input
              name="email"
              value={form.email}
              readOnly // Faqat o'qish uchun
              disabled // Bosib bo'lmaydi
              style={{
                backgroundColor: "#e0e0e0",
                cursor: "not-allowed",
                opacity: 0.7,
              }} // Vizual ko'rinish
            />
          </Field>

          <Field>
            <Label>Phone</Label>
            <Input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="+998..."
            />
          </Field>

          <Field>
            <Label>Weight (kg)</Label>
            <Input
              name="weight"
              type="number"
              value={form.weight}
              onChange={onChange}
              placeholder="75"
            />
          </Field>
        </Column>
      </Form>

      <SaveButton onClick={submit} disabled={saving}>
        {saving ? "SAQLANMOQDA..." : "SAVE"}
      </SaveButton>
    </Wrapper>
  );
};

export default EditProfile;
