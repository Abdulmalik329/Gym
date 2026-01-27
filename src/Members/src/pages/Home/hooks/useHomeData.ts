import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// JWT dekoder
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const useHomeData = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const decoded = decodeJwt(token);
      const userId = decoded?.id || decoded?.sub || decoded?.user?.id;

      if (!userId) {
        localStorage.clear();
        return navigate("/login");
      }

      try {
        // 1-QADAM: User ma'lumotlarini olish (gymId ni aniqlash uchun)
        const userRes = await fetch(
          `https://nt-gym-api.it-mahalla.uz/api/users/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (userRes.status === 401) {
          localStorage.clear();
          return navigate("/login");
        }

        const userDataRaw = userRes.ok ? await userRes.json() : null;
        const userData = Array.isArray(userDataRaw)
          ? userDataRaw[0]
          : userDataRaw;

        // Gym ID ni olish
        const gymId = userData?.gymId || userData?.gym_id || userData?.gym?.id;

        // Planlar URLini tayyorlash
        const plansUrl = gymId
          ? `https://nt-gym-api.it-mahalla.uz/api/membership-plans?gym_id=${gymId}`
          : `https://nt-gym-api.it-mahalla.uz/api/membership-plans`;

        // 2-QADAM: Asosiy ma'lumotlarni parallel yuklash
        const [reportRes, plansRes, paymentsRes, attendanceRes] =
          await Promise.all([
            // Dashboard statistikasi
            fetch(
              `https://nt-gym-api.it-mahalla.uz/api/reports/member?userId=${userId}`,
              { headers: { Authorization: `Bearer ${token}` } },
            ),
            // Tariflar
            fetch(plansUrl, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            // To'lovlar tarixi
            fetch(
              `https://nt-gym-api.it-mahalla.uz/api/payments?user_id=${userId}`,
              { headers: { Authorization: `Bearer ${token}` } },
            ),
            // Davomat tarixi (RO'YXAT)
            fetch(
              `https://nt-gym-api.it-mahalla.uz/api/attendances?userId=${userId}`,
              { headers: { Authorization: `Bearer ${token}` } },
            ),
          ]);

        if (reportRes.status === 401) {
          localStorage.clear();
          return navigate("/login");
        }

        const reportData = reportRes.ok ? await reportRes.json() : null;
        const plansData = plansRes.ok ? await plansRes.json() : [];
        const paymentsData = paymentsRes.ok ? await paymentsRes.json() : [];

        // Davomat ro'yxatini JSON ga o'tkazish
        const attendanceList = attendanceRes.ok
          ? await attendanceRes.json()
          : [];

        // Planlarni unique qilish (takrorlanmaslik uchun)
        const uniquePlans = Array.isArray(plansData)
          ? Array.from(
              new Map(plansData.map((item: any) => [item.id, item])).values(),
            )
          : [];

        // Userning planini va imkoniyatlarini (features) aniqlash
        const displayName = reportData?.user?.name || "Foydalanuvchi";
        let features: string[] = [];
        if (reportData?.perks && Array.isArray(reportData.perks)) {
          features = reportData.perks.map((p: any) => p.title);
        } else {
          const planName = reportData?.membership?.plan;
          const foundPlan = uniquePlans.find((p: any) => p.name === planName);
          if (foundPlan) {
            if (Array.isArray(foundPlan.features))
              features = foundPlan.features;
            else if (foundPlan.description) features = [foundPlan.description];
          }
        }

        // MA'LUMOTLARNI YIG'ISH
        setData({
          user: {
            name: displayName,
            bio: "Exciting working out",
            phone: reportData?.user?.email || "",
          },
          membership: {
            planName: reportData?.membership?.plan || "Reja yo'q",
            status: reportData?.membership?.status || "Nofaol",
            expiresAt: reportData?.membership?.expiresAt || "-",
            features: features,
          },
          attendance: {
            totalVisits: reportData?.attendance?.totalVisits || 0,
            streak: reportData?.attendance?.streak || 0,
            // API dan kelgan aniq ro'yxatni shu yerga beramiz
            records: Array.isArray(attendanceList) ? attendanceList : [],
          },
          stats: reportData?.stats || { workouts: 0, calories: 0, hours: 0 },
          payments: Array.isArray(paymentsData) ? paymentsData : [],
          plans: uniquePlans,
        });

        setLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [navigate]);

  return { data, loading };
};
