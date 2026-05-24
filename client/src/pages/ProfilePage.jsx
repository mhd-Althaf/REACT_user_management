import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import API from "../api/axios";

import toast from "react-hot-toast";

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

      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>

      {user.profileImage && (
        <img
          src={`http://localhost:5000/${user.profileImage}`}
          alt="profile"
          width="150"
        />
      )}

      <h3>{user.name}</h3>

      <h3>{user.email}</h3>

      <h3>{user.role}</h3>

      <br />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadHandler}>
        Upload Image
      </button>
    </div>
  );
}

export default ProfilePage;