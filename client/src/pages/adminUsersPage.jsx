import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  Users,
  ShieldAlert,
  UserCheck,
  Search,
  UserCog,
  Trash2,
  Shield,
  Settings,
  Plus,
  Edit,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  isValidEmail,
  isValidPassword,
  isValidName,
} from "../utils/validation";

function AdminUsersPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals visibility state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Create User form state
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createRole, setCreateRole] = useState("user");
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  // Edit User form state
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("user");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await API.get("/users", config);

      setUsers(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#374151",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#ffffff",
      borderRadius: 16,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await API.delete(`/users/${id}`, config);

      Swal.fire({
        title: "Deleted!",
        text: "User deleted successfully.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#ffffff",
      });
      fetchUsers();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
        background: "#0f172a",
        color: "#ffffff",
      });
    }
  };

  const roleHandler = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await API.put(`/users/${id}/role`, {}, config);

      toast.success("Role updated");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();

    if (!createName.trim()) {
      return toast.error("Name is required");
    }

    if (!isValidName(createName)) {
      return toast.error("Name must be at least 3 characters");
    }

    if (!createEmail.trim()) {
      return toast.error("Email is required");
    }

    if (!isValidEmail(createEmail)) {
      return toast.error("Enter a valid email");
    }

    if (!createPassword.trim()) {
      return toast.error("Password is required");
    }

    if (!isValidPassword(createPassword)) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await API.post(
        "/users",
        {
          name: createName,
          email: createEmail,
          password: createPassword,
          role: createRole,
        },
        config,
      );

      toast.success("User created successfully");
      setIsCreateOpen(false);
      setCreateName("");
      setCreateEmail("");
      setCreatePassword("");
      setCreateRole("user");
      setShowCreatePassword(false);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create user");
    }
  };

  const openEditModal = (user) => {
    setEditId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setIsEditOpen(true);
  };

  const editHandler = async (e) => {
    e.preventDefault();

    if (!editName.trim()) {
      return toast.error("Name is required");
    }

    if (!isValidName(editName)) {
      return toast.error("Name must be at least 3 characters");
    }

    if (!editEmail.trim()) {
      return toast.error("Email is required");
    }

    if (!isValidEmail(editEmail)) {
      return toast.error("Enter a valid email");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await API.put(
        `/users/${editId}`,
        {
          name: editName,
          email: editEmail,
          role: editRole,
        },
        config,
      );

      toast.success("User updated successfully");
      setIsEditOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  // Reset page to 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Derived dashboard metrics
  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.role === "admin").length;
  const regularUsers = totalUsers - adminUsers;

  // Premium UI feature: Real-time search filter
  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.role.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;

  // Safe adjust for page number if currentPage exceeds totalPages (e.g. after deletion)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredUsers, totalPages, currentPage]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div
      style={{
        padding: "40px 24px 80px 24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="admin-container"
        style={{ margin: 0, width: "100%", position: "relative" }}
      >
        {/* Glow Accent Border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(to right, var(--success), var(--accent-cyan))",
          }}
        />

        {/* Dashboard Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "30px",
            borderBottom: "1px solid var(--border-color)",
            paddingBottom: "20px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Shield size={22} style={{ color: "var(--success)" }} />
              <h1 style={{ fontSize: "24px", fontWeight: "800" }}>
                Admin Dashboard
              </h1>
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              Monitor workspace credentials, shift system roles, and manage
              authorization levels.
            </p>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="btn-premium"
            style={{
              width: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
            }}
          >
            <Plus size={16} />
            <span>Create User</span>
          </button>
        </div>

        {/* Analytics metrics boards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div
              className="metric-icon-wrapper"
              style={{
                background: "rgba(99, 102, 241, 0.1)",
                color: "var(--primary)",
              }}
            >
              <Users size={20} />
            </div>
            <div className="metric-details">
              <h4>Total Members</h4>
              <p>{totalUsers}</p>
            </div>
          </div>

          <div className="metric-card">
            <div
              className="metric-icon-wrapper"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                color: "var(--success)",
              }}
            >
              <UserCheck size={20} />
            </div>
            <div className="metric-details">
              <h4>Administrators</h4>
              <p>{adminUsers}</p>
            </div>
          </div>

          <div className="metric-card">
            <div
              className="metric-icon-wrapper"
              style={{
                background: "rgba(6, 182, 212, 0.1)",
                color: "var(--accent-cyan)",
              }}
            >
              <ShieldAlert size={20} />
            </div>
            <div className="metric-details">
              <h4>Standard Staff</h4>
              <p>{regularUsers}</p>
            </div>
          </div>
        </div>

        {/* Interactive Search Utilities */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 16px",
            maxWidth: "380px",
            marginBottom: "20px",
          }}
        >
          <Search
            size={16}
            style={{ color: "var(--text-muted)", marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-primary)",
              outline: "none",
              fontSize: "14px",
              padding: 0,
              margin: 0,
              width: "100%",
            }}
          />
        </div>

        {/* Responsive Table grid */}
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Identity Image</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Privileges</th>
                <th style={{ textAlign: "right" }}>Account Management</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => {
                  const initial = user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "?";
                  return (
                    <tr key={user._id}>
                      <td>
                        <div className="avatar-wrapper">
                          {user.profileImage ? (
                            <img
                              src={`http://localhost:5000/${user.profileImage}`}
                              alt="profile"
                              width="46"
                              height="46"
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                                border: "1px solid var(--border-color)",
                              }}
                            />
                          ) : (
                            <div
                              className="avatar-fallback"
                              style={{
                                width: "46px",
                                height: "46px",
                                fontSize: "16px",
                              }}
                            >
                              {initial}
                            </div>
                          )}
                          <span
                            className="avatar-status"
                            style={{ border: "2px solid #111827" }}
                          ></span>
                        </div>
                      </td>

                      <td style={{ fontWeight: "600" }}>{user.name}</td>
                      <td style={{ color: "var(--text-secondary)" }}>
                        {user.email}
                      </td>
                      <td>
                        <span
                          className={`badge ${user.role === "admin" ? "badge-admin" : "badge-user"}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "flex-end",
                          }}
                        >
                          {user._id !== userInfo.id ? (
                            <>
                              <button
                                onClick={() => openEditModal(user)}
                                className="btn-secondary"
                                style={{
                                  padding: "6px 12px",
                                  fontSize: "12px",
                                  width: "auto",
                                  borderColor: "rgba(6, 182, 212, 0.3)",
                                }}
                              >
                                <Edit
                                  size={13}
                                  style={{ color: "var(--accent-cyan)" }}
                                />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => roleHandler(user._id)}
                                className="btn-secondary"
                                style={{
                                  padding: "6px 12px",
                                  fontSize: "12px",
                                  width: "auto",
                                  borderColor: "rgba(99, 102, 241, 0.3)",
                                }}
                              >
                                <UserCog
                                  size={13}
                                  style={{ color: "var(--primary)" }}
                                />
                                <span>Change Role</span>
                              </button>

                              <button
                                onClick={() => deleteHandler(user._id)}
                                className="btn-danger"
                                style={{
                                  padding: "6px 12px",
                                  fontSize: "12px",
                                }}
                              >
                                <Trash2 size={13} />
                                <span>Delete</span>
                              </button>
                            </>
                          ) : (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "var(--text-muted)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "6px 12px",
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "var(--radius-sm)",
                              }}
                            >
                              <Settings size={12} />
                              <span>Your Account</span>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "var(--text-muted)",
                    }}
                  >
                    No users matching search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Clean Frontend Pagination Controls */}
        {filteredUsers.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              padding: "12px 20px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Showing {indexOfFirstUser + 1} to{" "}
              {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn-secondary"
                style={{
                  padding: "6px 12px",
                  fontSize: "13px",
                  width: "auto",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                Previous
              </button>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                }}
              >
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="btn-secondary"
                style={{
                  padding: "6px 12px",
                  fontSize: "13px",
                  width: "auto",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Create User Modal */}
        {isCreateOpen && (
          <div className="modal-overlay" onClick={() => setIsCreateOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Plus size={20} style={{ color: "var(--primary)" }} />
                  <h3 style={{ fontSize: "18px", fontWeight: "700" }}>
                    Create New User
                  </h3>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={() => setIsCreateOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={createHandler}>
                <div className="form-group-modal">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="input-premium"
                    placeholder="Enter full name"
                    value={createName}
                    onChange={(e) => setCreateName(e.target.value)}
                  />
                </div>

                <div className="form-group-modal">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="input-premium"
                    placeholder="Enter email address"
                    value={createEmail}
                    onChange={(e) => setCreateEmail(e.target.value)}
                  />
                </div>

                <div className="form-group-modal">
                  <label>Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showCreatePassword ? "text" : "password"}
                      className="input-premium"
                      placeholder="Enter password"
                      value={createPassword}
                      onChange={(e) => setCreatePassword(e.target.value)}
                      style={{ paddingRight: "40px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCreatePassword(!showCreatePassword)}
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
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = 0.7)
                      }
                    >
                      {showCreatePassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-group-modal">
                  <label>Role</label>
                  <select
                    className="select-premium"
                    value={createRole}
                    onChange={(e) => setCreateRole(e.target.value)}
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div
                  style={{ display: "flex", gap: "12px", marginTop: "24px" }}
                >
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsCreateOpen(false)}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-premium"
                    style={{ flex: 1 }}
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {isEditOpen && (
          <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Edit size={20} style={{ color: "var(--accent-cyan)" }} />
                  <h3 style={{ fontSize: "18px", fontWeight: "700" }}>
                    Edit User Details
                  </h3>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={() => setIsEditOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={editHandler}>
                <div className="form-group-modal">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="input-premium"
                    placeholder="Enter full name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>

                <div className="form-group-modal">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="input-premium"
                    placeholder="Enter email address"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </div>

                <div className="form-group-modal">
                  <label>Role</label>
                  <select
                    className="select-premium"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div
                  style={{ display: "flex", gap: "12px", marginTop: "24px" }}
                >
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsEditOpen(false)}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-premium"
                    style={{ flex: 1 }}
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsersPage;
