import { useLocation } from "react-router-dom";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import {
    LayoutDashboard,
    Dumbbell,
    Users,
    Settings,
    BarChart3,
    ShieldCheck
} from 'lucide-react';

function LeftCol() {
    const location = useLocation();
    const {
        goDashboard,
        goGymManagment,
        goUser,
        goMembershipPlans,
        goFinancialReports
    } = useAppNavigate();

    const isActive = (path: string): boolean => {
        if (path === '/admin/dashboard' && location.pathname === '/admin/') return true;
        return location.pathname === path;
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, action: goDashboard, path: '/admin/dashboard' },
        { name: 'Gyms', icon: Dumbbell, action: goGymManagment, path: '/admin/gym' },
        { name: 'Users', icon: Users, action: goUser, path: '/admin/user' },
        { name: 'Membership Plans', icon: Settings, action: goMembershipPlans, path: '/admin/membership-plans' },
        { name: 'Financial Reports', icon: BarChart3, action: goFinancialReports, path: '/admin/financial-reports' },
    ];

    return (
        <aside className="w-[20%] h-screen bg-slate-950 border-r border-slate-900 flex flex-col transition-all duration-300">
            {/* LOGO SECTION */}
            <div className="p-8 flex items-center gap-4">
                <div className="bg-emerald-600 p-2.5 rounded-xl shadow-lg shadow-emerald-600/20">
                    <ShieldCheck size={28} className="text-white" />
                </div>
                <div>
                    <h3 className="text-white font-black text-xl tracking-tight leading-none">GymBros</h3>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Super Admin</p>
                </div>
            </div>

            {/* NAVIGATION AREA */}
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

                            {/* Aktiv indikator (o'ng tarafdagi chiziqcha) */}
                            {active && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* FOOTER / USER SECTION */}
            <div className="p-6 border-t border-slate-900">
                <div className="bg-slate-900/50 p-4 rounded-[1.5rem] border border-slate-800/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg">
                        S
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">Super Admin</p>
                        <p className="text-[10px] text-slate-500 font-medium">admin@fitgym.uz</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default LeftCol;