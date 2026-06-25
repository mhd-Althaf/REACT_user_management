import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios";
import toast from "react-hot-toast";
import { User, Mail, ShieldCheck, UploadCloud, FileCheck, CheckCircle } from "lucide-react";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);

  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await API.get(
        "/users/profile",
        config
      );

      setUser(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const uploadHandler = async () => {
    if (!image) {
      toast.error("Please select an image file first");
      return;
    }

    if (!image.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profileImage", image);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await API.put(
        "/users/profile-image",
        formData,
        config
      );

      toast.success(data.message);
      setImage(null); // Clear selected image
      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const nameInitial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div
      style={{
        padding: "40px 24px 80px 24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="profile-container" style={{ margin: 0, width: "100%", maxWidth: "560px", position: "relative" }}>
        {/* Glow Accent Border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(to right, var(--primary), var(--accent-purple))",
          }}
        />

        {/* Heading */}
        <div style={{ marginBottom: "30px", borderBottom: "1px solid var(--border-color)", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "6px" }}>Account Settings</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Manage your personal profile information and visual identity.
          </p>
        </div>

        {/* Visual Header Profile Card block */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-color)",
            padding: "20px",
            borderRadius: "var(--radius-md)",
            marginBottom: "30px",
          }}
        >
          {/* Avatar display */}
          <div className="avatar-wrapper">
            {user.profileImage ? (
              <img
                src={`http://localhost:5000/${user.profileImage}`}
                alt="profile"
                width="80"
                height="80"
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid var(--primary)",
                  boxShadow: "var(--shadow-sm)",
                  display: "block",
                }}
              />
            ) : (
              <div className="avatar-fallback" style={{ width: "80px", height: "80px", fontSize: "28px" }}>
                {nameInitial}
              </div>
            )}
            <span className="avatar-status" style={{ width: "16px", height: "16px", border: "3px solid #111827" }}></span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700" }}>{user.name || "Loading..."}</h2>
            <span className={`badge ${user.role === "admin" ? "badge-admin" : "badge-user"}`} style={{ alignSelf: "flex-start" }}>
              {user.role || "User"}
            </span>
          </div>
        </div>

        {/* Personal Details list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "35px" }}>
          <h3 style={{ fontSize: "14px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Personal Details
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              background: "rgba(255, 255, 255, 0.01)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <User size={16} style={{ color: "var(--text-secondary)" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Full Name</span>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>{user.name || "Loading..."}</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              background: "rgba(255, 255, 255, 0.01)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Mail size={16} style={{ color: "var(--text-secondary)" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Email Address</span>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>{user.email || "Loading..."}</span>
            </div>
          </div>
        </div>

        {/* Avatar Upload block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h3 style={{ fontSize: "14px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Identity Image Update
          </h3>

          <div className="file-upload-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && !file.type.startsWith("image/")) {
                  toast.error("Only image files are allowed!");
                  e.target.value = "";
                  setImage(null);
                } else {
                  setImage(file);
                }
              }}
            />
            {!image ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <UploadCloud size={28} style={{ color: "var(--primary)", opacity: 0.8 }} />
                <span style={{ fontSize: "14px", fontWeight: "600" }}>Choose dynamic image</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Drag and drop or browse local files</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <FileCheck size={28} style={{ color: "var(--success)" }} />
                <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--success)" }}>File selected</span>
                <span style={{ fontSize: "12px", color: "var(--text-primary)", fontWeight: "500" }}>
                  {image.name} ({Math.round(image.size / 1024)} KB)
                </span>
              </div>
            )}
          </div>

          <button onClick={uploadHandler} className="btn-premium" style={{ width: "100%" }}>
            <CheckCircle size={16} />
            <span>Upload Image</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;