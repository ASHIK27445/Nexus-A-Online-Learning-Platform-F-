import { use, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import { ChevronDown, LogOut, Menu, ShoppingCart, X } from "lucide-react";
import { AuthContext } from "../../Auth/AuthContext";

const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#c8ff00] focus-visible:outline-offset-[3px]";
const WRAP = "max-w-[1240px] mx-auto px-5";

const FONTS = [
  {
    id: "bytespace-poppins",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
  },
  {
    id: "bytespace-satoshi",
    href: "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap",
  },
];

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/allCourses", label: "Courses" },
];

const DASHBOARD_LINKS = [
  { to: "/myCourses", label: "My Courses" },
  { to: "/dashboard/addCourse", label: "Add Course" },
  { to: "/myEnrollCourse", label: "My Enroll Courses" },
];

const navLinkClass = ({ isActive }) =>
  `font-medium transition-opacity ${FV} ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`;

const Logo = () => (
    <Link to="/" aria-label="Nexus home" className={FV}>
      <svg viewBox="0 -10 32 42" aria-hidden="true" className="w-7 block">
        {/* crown */}
        <path
          d="M3 -1L2 -8L5.5 -5L8 -9L10.5 -5L14 -8L13 -1Z"
          fill="#c8ff00"
          stroke="#c8ff00"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M4 3h8v9l13 5-13 5v7H4z"
          fill="#c8ff00"
          stroke="#c8ff00"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
);

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const dashboardRef = useRef(null);

  useEffect(() => {
    FONTS.forEach(({ id, href }) => {
      if (document.getElementById(id)) return;

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.append(link);
    });
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (dashboardRef.current && !dashboardRef.current.contains(e.target)) {
        setDashboardOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setDashboardOpen(false);
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        closeMenus();
        toast("Logout successful");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0033e0] text-white font-[Poppins,system-ui,-apple-system,'Segoe_UI',sans-serif]">
      <div className={WRAP}>
        <nav
          aria-label="Main"
          className="grid grid-cols-[1fr_auto_1fr] max-[860px]:grid-cols-[1fr_auto] items-center h-20 max-[860px]:h-18"
        >
          <Logo />

          <div className="flex gap-6 max-[860px]:hidden">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/"} className={navLinkClass}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex gap-5.5 items-center justify-end text-[15px] max-[860px]:hidden">
            {user ? (
              <>
                <div className="relative" ref={dashboardRef}>
                  <button
                    type="button"
                    aria-expanded={dashboardOpen}
                    onClick={() => setDashboardOpen((open) => !open)}
                    className={`flex items-center gap-1 border-0 bg-transparent text-white opacity-90 hover:opacity-100 cursor-pointer ${FV}`}
                  >
                    Dashboard
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${dashboardOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {dashboardOpen && (
                    <div className="absolute right-0 top-full mt-4 w-56 bg-white text-[#14163b] rounded-2xl border border-[#dfe1f5] shadow-[0_10px_30px_-12px_rgba(0,0,0,.35)] py-2 overflow-hidden">
                      {DASHBOARD_LINKS.map(({ to, label }) => (
                        <NavLink
                          key={to}
                          to={to}
                          onClick={closeMenus}
                          className={({ isActive }) =>
                            `block px-5 py-3 text-sm hover:bg-[#f1f2f4] ${
                              isActive ? "text-[#0033e0] font-medium" : ""
                            }`
                          }
                        >
                          {label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`inline-flex items-center gap-2 border-0 rounded-full px-5 py-2.5 font-semibold cursor-pointer bg-[#c8ff00] text-[#14163b] ${FV}`}
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`opacity-90 hover:opacity-100 ${FV}`}>
                  Sign In
                </Link>
                <Link to="/register" className={`opacity-90 hover:opacity-100 ${FV}`}>
                  Join Us
                </Link>
              </>
            )}
            <button
              type="button"
              aria-label="Cart"
              className={`border-0 bg-transparent text-white opacity-90 hover:opacity-100 cursor-pointer ${FV}`}
            >
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className={`hidden max-[860px]:grid place-items-center w-10 h-10 border-0 rounded-full bg-white/10 text-white cursor-pointer ${FV}`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="hidden max-[860px]:grid gap-1 pb-5 border-t border-white/20">
            {[...NAV_LINKS, ...(user ? DASHBOARD_LINKS : [])].map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/"} onClick={closeMenus} className={navLinkClass}>
                <span className="block py-3">{label}</span>
              </NavLink>
            ))}
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className={`mt-2 border-0 rounded-full px-5 py-3 font-semibold cursor-pointer bg-[#c8ff00] text-[#14163b] ${FV}`}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={closeMenus} className={`py-3 ${FV}`}>
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenus}
                  className={`mt-2 text-center rounded-full px-5 py-3 font-semibold bg-[#c8ff00] text-[#14163b] ${FV}`}
                >
                  Join Us
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;