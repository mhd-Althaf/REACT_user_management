import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Shield, Lock, Cpu, LayoutDashboard, UserCheck, Sparkles, ArrowRight } from "lucide-react";
// import { useDispatch } from "react-redux";
// import {
//   increment,
//   decrement,
//   reset,
// } from "../redux/counterSlice";


function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const count = useSelector(
  //   (state) => state.counter.count
  // );

  return (
    <div
      className="animate-fade-in"
      style={{
        position: "relative",
        padding: "80px 24px 120px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Visual Ambient Glows */}
      <div className="hero-glow-blob" />

      {/* Top Banner Tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          borderRadius: "30px",
          background: "rgba(99, 102, 241, 0.1)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          color: "#a5b4fc",
          fontSize: "13px",
          fontWeight: "600",
          marginBottom: "24px",
          fontFamily: "var(--font-heading)",
        }}
      >
        <Sparkles size={14} style={{ color: "#818cf8" }} />
        <span>Version 2.0 Premium Upgrade Active</span>
      </div>

      {/* <div style={{
        marginTop: "30px",
        textAlign:"center",
      }}>
        <h2>Redux Counter</h2>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment())}> + </button>
        <button onClick={() => dispatch(decrement())}> - </button>
        <button onClick={() => dispatch(reset())}> Reset </button>
      </div>
       */}

      {/* Main Title Heading */}
      <h1
        style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          textAlign: "center",
          fontWeight: "800",
          lineHeight: "1.1",
          maxWidth: "800px",
          marginBottom: "24px",
          background: "linear-gradient(to bottom right, #ffffff 30%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Enterprise Identity & User Control Center
      </h1>

      {/* Description Subtitle */}
      <p
        style={{
          fontSize: "clamp(16px, 2.5vw, 19px)",
          color: "var(--text-secondary)",
          textAlign: "center",
          maxWidth: "650px",
          lineHeight: "1.6",
          marginBottom: "40px",
        }}
      >
        A premium SaaS portal engineered with custom secure authentication, role-based authorization, high-performance profile image vaults, and granular administration dashboards.
      </p>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          width: "100%",
          maxWidth: "400px",
          justifyContent: "center",
          marginBottom: "80px",
        }}
      >
        {!userInfo ? (
          <>
            <Link to="/register" style={{ flex: 1 }}>
              <button className="btn-premium">
                <span>Get Started</span>
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/login" style={{ flex: 1 }}>
              <button className="btn-secondary">Sign In</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" style={{ flex: 1 }}>
              <button className="btn-premium">
                <LayoutDashboard size={16} />
                <span>Go to Workspace</span>
              </button>
            </Link>
            {userInfo.role === "admin" && (
              <Link to="/admin/users" style={{ flex: 1 }}>
                <button
                  className="btn-secondary"
                  style={{
                    borderColor: "rgba(16, 185, 129, 0.4)",
                    color: "#34d399",
                  }}
                >
                  <Shield size={16} />
                  <span>Admin Panel</span>
                </button>
              </Link>
            )}
          </>
        )}
      </div>

      {/* Floating Simulated Dashboard Mockup */}
      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "1000px",
          padding: "24px",
          background: "rgba(13, 17, 30, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
          transform: "perspective(1000px) rotateX(4deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Mock Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            paddingBottom: "16px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }}></span>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }}></span>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }}></span>
          </div>
          <div
            style={{
              padding: "4px 20px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.03)",
              fontSize: "12px",
              color: "var(--text-muted)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            admin.aura.workspace/users
          </div>
          <div style={{ width: "30px" }}></div>
        </div>

        {/* Mock Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
          {/* Mock Sidebar info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ height: "40px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }} />
            <div style={{ height: "40px", background: "rgba(99, 102, 241, 0.08)", borderRadius: "8px", borderLeft: "3px solid var(--primary)" }} />
            <div style={{ height: "40px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }} />
            <div style={{ height: "40px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }} />
          </div>
          {/* Mock data list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ width: "40%", height: "20px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
              <div style={{ width: "15%", height: "20px", background: "rgba(16, 185, 129, 0.15)", borderRadius: "4px" }} />
            </div>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                <div style={{ width: "60%", height: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
                <div style={{ width: "40%", height: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                <div style={{ width: "50%", height: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
                <div style={{ width: "30%", height: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section cards */}
      <div className="grid-features">
        <div className="glass-card">
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "rgba(99, 102, 241, 0.1)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Lock size={20} />
          </div>
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Secure Core Auth</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }}>
            Engineered with token-based session persistence, encrypted credential validation, and full route guards.
          </p>
        </div>

        <div className="glass-card">
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "rgba(139, 92, 246, 0.1)",
              color: "var(--accent-purple)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Cpu size={20} />
          </div>
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Redux Toolkit Sync</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }}>
            State values synced immediately using standardized slices, providing lag-free components and instant UI updates.
          </p>
        </div>

        <div className="glass-card">
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "rgba(6, 182, 212, 0.1)",
              color: "var(--accent-cyan)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Shield size={20} />
          </div>
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Enterprise Panels</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }}>
            Comprehensive controls for administrators allowing instant role shifting, dynamic list search, and full user pruning.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;