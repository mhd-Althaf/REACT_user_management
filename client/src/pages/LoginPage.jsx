import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  KeyRound,
  ArrowRight,
  ShieldAlert,
  Eye,
  EyeOff,
} from "lucide-react";
import { isValidEmail, isValidPassword } from "../utils/validation";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    if (!password.trim()) {
      return toast.error("Password is required");
    }

    if (!isValidEmail(email)) {
      return toast.error("Enter a valid email");
    }

    if (!isValidPassword(password)) {
      return toast.error("Password must be at least 6 characters long");
    }

    try {
      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      dispatch(
        setCredentials({
          ...data.user,
          token: data.token,
        }),
      );

      toast.success(data.message);
      navigate("/profile");
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
              "linear-gradient(to right, var(--primary), var(--accent-purple))",
          }}
        />

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Enter your credentials to access your workspace.
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
            <span>Sign In</span>
            <ArrowRight size={16} />
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
            Don't have an account?{" "}
          </span>
          <Link
            to="/register"
            style={{ color: "var(--primary)", fontWeight: "600" }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
