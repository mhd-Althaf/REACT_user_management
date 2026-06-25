import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, KeyRound, UserPlus, Eye, EyeOff } from "lucide-react";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { useSelector } from "react-redux";

function RegisterPage() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Name is required");
    }

    if (name.trim().length < 3) {
      return toast.error("Name must be at least 3 characters");
    }

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    if (!isValidEmail(email)) {
      return toast.error("Enter a valid email");
    }

    if (!password.trim()) {
      return toast.error("Password is required");
    }

    if (!isValidPassword(password)) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const { data } = await API.post("/users/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 80px)",
        padding: "40px 24px",
      }}
    >
      <div
        className="form-container"
        style={{ margin: 0, position: "relative" }}
      >
        {/* Glow accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(to right, var(--accent-purple), var(--accent-cyan))",
          }}
        />

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}
          >
            Create Account
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Sign up to build your custom secure profile today.
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}
            >
              <User size={14} />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-premium"
            />
          </div>

          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}
            >
              <Mail size={14} />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-premium"
            />
          </div>

          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}
            >
              <KeyRound size={14} />
              <span>Password</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-premium"
                style={{ paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.7,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-premium"
            style={{ marginTop: "10px" }}
          >
            <UserPlus size={16} />
            <span>Create Account</span>
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
            borderTop: "1px solid var(--border-color)",
            paddingTop: "20px",
            fontSize: "14px",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            style={{ color: "var(--accent-cyan)", fontWeight: "600" }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
