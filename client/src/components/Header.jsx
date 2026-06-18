import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Shield, User, LogOut, Home, LogIn, UserPlus } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-glass">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "16px 24px",
          width: "100%",
        }}
      >
        {/* Branding Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
              fontWeight: "800",
              color: "white",
              fontSize: "18px",
              fontFamily: "var(--font-heading)",
            }}
          >
            A
          </div>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "19px",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              background: "linear-gradient(to right, #ffffff, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Aura
          </span>
        </Link>

        {/* Navigation Elements */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: "500",
              padding: "8px 14px",
              borderRadius: "var(--radius-sm)",
              color: isActive("/") ? "var(--text-primary)" : "var(--text-secondary)",
              background: isActive("/") ? "rgba(255, 255, 255, 0.05)" : "transparent",
              border: isActive("/") ? "1px solid var(--border-color)" : "1px solid transparent",
            }}
          >
            <Home size={15} />
            <span>Home</span>
          </Link>

          {!userInfo ? (
            <>
              <Link
                to="/login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-sm)",
                  color: isActive("/login") ? "var(--text-primary)" : "var(--text-secondary)",
                  background: isActive("/login") ? "rgba(255, 255, 255, 0.05)" : "transparent",
                  border: isActive("/login") ? "1px solid var(--border-color)" : "1px solid transparent",
                }}
              >
                <LogIn size={15} />
                <span>Login</span>
              </Link>

              <Link
                to="/register"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
                  border: "none",
                }}
              >
                <UserPlus size={15} />
                <span>Get Started</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-sm)",
                  color: isActive("/profile") ? "var(--text-primary)" : "var(--text-secondary)",
                  background: isActive("/profile") ? "rgba(255, 255, 255, 0.05)" : "transparent",
                  border: isActive("/profile") ? "1px solid var(--border-color)" : "1px solid transparent",
                }}
              >
                <User size={15} />
                <span>Profile</span>
              </Link>

              {userInfo.role === "admin" && (
                <Link
                  to="/admin/users"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "8px 14px",
                    borderRadius: "var(--radius-sm)",
                    color: isActive("/admin/users") ? "#34d399" : "var(--text-secondary)",
                    background: isActive("/admin/users") ? "rgba(16, 185, 129, 0.1)" : "transparent",
                    border: isActive("/admin/users") ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid transparent",
                  }}
                >
                  <Shield size={15} />
                  <span>Admin</span>
                </Link>
              )}

              <button
                onClick={logoutHandler}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  fontWeight: "600",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(244, 63, 94, 0.1)",
                  border: "1px solid rgba(244, 63, 94, 0.15)",
                  color: "#f43f5e",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(244, 63, 94, 0.15)";
                  e.currentTarget.style.borderColor = "#f43f5e";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(244, 63, 94, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(244, 63, 94, 0.15)";
                }}
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;