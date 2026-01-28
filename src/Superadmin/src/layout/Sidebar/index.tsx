import { useEffect, useState } from "react"; // 1. Hooklarni import qilamiz
import { useLocation } from "react-router-dom";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import {
    LayoutDashboard,
    Dumbbell,
    Users,
    Settings,
    BarChart3,
    ShieldCheck,
    Loader2 // Yuklanish indikatori uchun
} from 'lucide-react';

// User ma'lumotlari uchun interfeys
interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    image_url: string | null;
}

function LeftCol() {
    const { goAdminProfile } = useAppNavigate();
    const location = useLocation();
    const {
        goDashboard,
        goGymManagment,
        goUser,
        goMembershipPlans,
        goFinancialReports
    } = useAppNavigate();

    // 2. State yaratamiz
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    // 3. API-dan ma'lumot olish funksiyasi
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token"); // Tokenni olish
                const response = await fetch("https://nt-gym-api.it-mahalla.uz/api/users/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error("User ma'lumotlarini olishda xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const isActive = (path: string): boolean => {
        if (path === '/admin/dashboard' && location.pathname === '/admin/') return true;
        return location.pathname === path;
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, action: goDashboard, path: '/admin/dashboard' },
        { name: 'Gyms', icon: Dumbbell, action: goGymManagment, path: '/admin/gym' },
        { name: 'Managers', icon: Users, action: goUser, path: '/admin/user' },
        { name: 'Membership Plans', icon: Settings, action: goMembershipPlans, path: '/admin/membership-plans' },
        { name: 'Financial Reports', icon: BarChart3, action: goFinancialReports, path: '/admin/financial-reports' },
    ];

    return (
        <aside className="w-[20%] h-screen bg-slate-950 border-r border-slate-900 flex flex-col transition-all duration-300">
            <div className="p-8 flex items-center gap-4">
                <div className="bg-emerald-600 p-2.5 rounded-xl shadow-lg shadow-emerald-600/20">
                    <ShieldCheck size={28} className="text-white" />
                </div>
                <div>
                    <h3 className="text-white font-black text-xl tracking-tight leading-none">GymBros</h3>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">
                        {user?.role || "Admin"}
                    </p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.name}
                            onClick={item.action}
                            className={`
                                w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group
                                ${active
                                    ? 'bg-emerald-600/10 text-emerald-500 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]'
                                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}
                            `}
                        >
                            <div className={`
                                transition-transform duration-200 group-hover:scale-110
                                ${active ? 'text-emerald-500' : 'text-slate-500 group-hover:text-slate-300'}
                            `}>
                                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                            </div>

                            <span className={`text-sm font-bold tracking-wide ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                                {item.name}
                            </span>

                            {active && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-slate-900 cursor-pointer" onClick={goAdminProfile}>
                <div className="bg-slate-900/50 p-4 border border-slate-800/50 flex items-center gap-3 hover:bg-slate-900 transition-colors rounded-xl">
                    <div className="w-10 h-10 rounded-full   from-emerald-600 to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            user?.image_url ? (
                                <img src={user.image_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                user?.firstName?.charAt(0) || "S"
                            )
                        )}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">
                            {loading ? "Yuklanmoqda..." : `${user?.firstName} ${user?.lastName}`}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium truncate">
                            {loading ? "..." : user?.email}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default LeftCol;