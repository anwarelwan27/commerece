import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Gamepad2,
  LogIn,
  LogOut,
  Menu,
  Moon,
  ShoppingBag,
  SunMedium,
  UserPlus,
  X,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { combineClasses } from "../../utils/helpers";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Games", to: "/games" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { summary } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const renderNavLink = (to, label, onClick) => (
    <NavLink
      key={to}
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        combineClasses(
          "rounded-full px-4 py-2 text-sm font-medium transition duration-200",
          isActive
            ? "bg-sky-400/20 text-sky-200"
            : "text-[color:var(--text-secondary)] hover:bg-white/10 hover:text-[color:var(--text-primary)]"
        )
      }
    >
      {label}
    </NavLink>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell pt-4">
        <div className="surface-card flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <NavLink
            to="/"
            className="flex items-center gap-3 text-[color:var(--text-primary)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-300 shadow-glow">
              <Gamepad2 size={22} />
            </div>
            <div>
              <p className="font-display text-lg tracking-[0.2em]">CLICKMART</p>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                Digital Games Store
              </p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => renderNavLink(link.to, link.label))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="secondary-button !h-11 !w-11 !rounded-2xl !px-0 !py-0"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <SunMedium size={18} /> : <Moon size={18} />}
            </button>

            <NavLink
              to="/cart"
              className="secondary-button relative !h-11 !w-11 !rounded-2xl !px-0 !py-0"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {summary.itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1 text-[10px] font-bold text-white">
                  {summary.itemCount}
                </span>
              ) : null}
            </NavLink>

            {isAuthenticated ? (
              <>
                <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-left xl:block">
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                    Signed In
                  </p>
                  <p className="text-sm font-semibold text-[color:var(--text-primary)]">
                    {user?.name}
                  </p>
                </div>
                <button type="button" className="secondary-button" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="secondary-button">
                  <LogIn size={16} />
                  Login
                </NavLink>
                <NavLink to="/register" className="primary-button">
                  <UserPlus size={16} />
                  Register
                </NavLink>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
            className="secondary-button !h-11 !w-11 !rounded-2xl !px-0 !py-0 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="surface-card mt-3 space-y-4 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => renderNavLink(link.to, link.label, () => setIsMenuOpen(false)))}
            </nav>

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={toggleTheme} className="secondary-button">
                {isDarkMode ? <SunMedium size={16} /> : <Moon size={16} />}
                {isDarkMode ? "Light mode" : "Dark mode"}
              </button>
              <NavLink
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="secondary-button"
              >
                <ShoppingBag size={16} />
                Cart ({summary.itemCount})
              </NavLink>
            </div>

            {isAuthenticated ? (
              <div className="surface-muted space-y-3 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
                    Signed In
                  </p>
                  <p className="text-sm font-semibold text-[color:var(--text-primary)]">
                    {user?.name}
                  </p>
                </div>
                <button type="button" className="secondary-button w-full" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="secondary-button justify-center"
                >
                  <LogIn size={16} />
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="primary-button justify-center"
                >
                  <UserPlus size={16} />
                  Register
                </NavLink>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Navbar;
