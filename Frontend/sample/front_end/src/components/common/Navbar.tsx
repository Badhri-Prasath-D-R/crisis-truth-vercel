import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Shield,
  Menu,
  X,
  ChevronDown,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Sun,
  Moon,
} from "lucide-react";

type NavLinkType = {
  name: string;
  path: string;
  icon: any;
  badge?: number;
};

const EnhancedNavbar = () => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications] = useState(3);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeDropdown = () => setActiveDropdown(null);
    if (activeDropdown) {
      document.addEventListener("click", closeDropdown);
      return () => document.removeEventListener("click", closeDropdown);
    }
  }, [activeDropdown]);

  const navLinks: NavLinkType[] = [
    { name: "Dashboard", path: "/", icon: BarChart3 },
    { name: "Fake News", path: "/fake-news", icon: AlertTriangle, badge: 12 },
    { name: "Real News", path: "/real-news", icon: CheckCircle2 },
    { name: "Chatbot", path: "/chatbot", icon: MessageSquare },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(148,163,184,0.2)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
                <Shield size={22} color="white" />
              </div>
              <div>
                <h1 className="text-white font-extrabold text-lg">
                  CrisisTruth AI
                </h1>
                <p className="text-slate-400 text-[10px] uppercase">
                  News Verification
                </p>
              </div>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition
                      ${
                        isActive
                          ? "bg-blue-500/20 text-white border border-blue-500/40"
                          : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={16} />
                    {link.name}
                    {link.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button className="relative">
                <Bell size={18} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>

              <button
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-slate-900 z-50 p-4 lg:hidden">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg mb-2 font-medium
                  ${
                    isActive
                      ? "bg-blue-500/20 text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`
                }
              >
                <Icon size={18} />
                {link.name}
              </NavLink>
            );
          })}
        </div>
      )}

      {/* SPACER */}
      <div className="h-16"></div>
    </>
  );
};

export default EnhancedNavbar;
