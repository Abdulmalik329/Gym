import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Toaster import qilindi
import * as S from "./Profile.styled";

const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  } catch (error) {
    return null;
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    height: "",
    weight: "",
    bio: "",
    imageUrl: "", // Rasm nomi uchun
  });

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const decodedToken = decodeJwt(token);
    const userId =
      decodedToken?.id || decodedToken?.sub || decodedToken?.user?.id;

    try {
      const response = await fetch(
        `https://nt-gym-api.it-mahalla.uz/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      const resData = await response.json();
      const data = Array.isArray(resData) ? resData[0] : resData;

      const mappedUser = {
        ...data,
        firstName: data.first_name || data.firstName || "Ism yo'q",
        lastName: data.last_name || data.lastName || "",
        avatar: data.image_url
          ? `https://nt-gym-api.it-mahalla.uz/uploads/${data.image_url}`
          : "https://th.bing.com/th/id/R.ca1aa447d07684a6edc3067c6cf35b41?rik=vDTxmCKREnh4sQ&pid=ImgRaw&r=0",
      };

      setUser(mappedUser);
      setForm({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        phone: data.phone || "",
        height: data.height ? String(data.height) : "",
        weight: data.weight ? String(data.weight) : "",
        bio: data.bio || "",
        imageUrl: data.image_url || "",
      });
    } catch (err) {
      toast.error("Ma'lumotlarni yuklashda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Profile.tsx ichidagi handleLogout funksiyasi
  const handleLogout = () => {
    toast(
      (t) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ fontWeight: "500", color: "#162f45" }}>
            Haqiqatan ham hisobingizdan chiqmoqchimisiz?
          </span>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Yo'q
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                localStorage.removeItem("token");
                toast.success("Hisobdan chiqildi!");
                navigate("/login");
              }}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#ff4d4d",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Ha, chiqish
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          padding: "16px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        },
      },
    );
  };

const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Fayl hajmini tekshirish (masalan max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    toast.error("Rasm hajmi juda katta! Maksimal 2MB");
    return;
  }

  const formData = new FormData();

  formData.append("image", file);

  const toastId = toast.loading("Rasm yuklanmoqda...");
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("https://nt-gym-api.it-mahalla.uz/api/upload", {
      method: "POST",
      headers: {

        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Yuklashda xatolik");
    }

    const data = await res.json();

    const uploadedFileName = data.filename || data.file || data.url;

    setForm((prev) => ({ ...prev, imageUrl: uploadedFileName }));
    toast.success("Rasm muvaffaqiyatli yuklandi!", { id: toastId });
  } catch (err: any) {
    toast.error(err.message || "Rasmni yuklashda xatolik!", { id: toastId });
  }
};

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const payload = {
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        height: Number(form.height),
        weight: Number(form.weight),
        bio: form.bio,
        image_url: form.imageUrl, // Yuklangan rasm nomi
      };

      const res = await fetch(
        `https://nt-gym-api.it-mahalla.uz/api/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        toast.success("Profil yangilandi!");
        setIsModalOpen(false);
        fetchUserProfile();
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Saqlashda xatolik yuz berdi!");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <S.Wrapper>
        <S.Content>Yuklanmoqda...</S.Content>
      </S.Wrapper>
    );

  return (
    <S.Wrapper>
      <S.Header>
        <S.AvatarContainer>
          <img src={user?.avatar} alt="avatar" />
        </S.AvatarContainer>
      </S.Header>

      <S.Content>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          {user?.firstName} {user?.lastName}
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#8fa6bc",
            marginBottom: "30px",
          }}
        >
          {user?.bio || "No bio set"}
        </p>

        <S.Grid>
          <S.Item>
            <span>Email</span>
            <p>{user?.email}</p>
          </S.Item>
          <S.Item>
            <span>Phone</span>
            <p>{user?.phone}</p>
          </S.Item>
          <S.Item>
            <span>Height</span>
            <p>{user?.height} cm</p>
          </S.Item>
          <S.Item>
            <span>Weight</span>
            <p>{user?.weight} kg</p>
          </S.Item>
        </S.Grid>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <S.Button onClick={() => setIsModalOpen(true)}>Edit Profile</S.Button>
          <S.Button
            outline
            onClick={() => navigate("/users/profile/change-password")}
          >
            Change Password
          </S.Button>
          <S.Button danger onClick={handleLogout}>
            Logout
          </S.Button>
        </div>
      </S.Content>

      {/* --- EDIT MODAL --- */}
      {isModalOpen && (
        <S.ModalOverlay onClick={() => setIsModalOpen(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "25px" }}>Edit Profile Info</h2>

            <S.PhotoSection>
              {/* Formadagi vaqtinchalik rasmni ko'rsatish */}
              <img
                src={
                  form.imageUrl
                    ? `https://nt-gym-api.it-mahalla.uz/uploads/${form.imageUrl}`
                    : user?.avatar
                }
                alt="edit-avatar"
              />
              <label htmlFor="file-input">Change Photo</label>
              <input
                id="file-input"
                type="file"
                hidden
                onChange={handlePhotoChange}
              />
            </S.PhotoSection>

            <S.Grid>
              <S.InputGroup>
                <label>First Name</label>
                <input
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </S.InputGroup>
              <S.InputGroup>
                <label>Last Name</label>
                <input
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </S.InputGroup>
              <S.InputGroup>
                <label>Height (cm)</label>
                <input
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                />
              </S.InputGroup>
              <S.InputGroup>
                <label>Weight (kg)</label>
                <input
                  type="number"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                />
              </S.InputGroup>
            </S.Grid>

            <S.InputGroup style={{ marginTop: "15px" }}>
              <label>Bio</label>
              <input
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </S.InputGroup>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                marginTop: "30px",
              }}
            >
              <S.Button outline onClick={() => setIsModalOpen(false)}>
                Cancel
              </S.Button>
              <S.Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </S.Button>
            </div>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Wrapper>
  );
};;

export default Profile;
