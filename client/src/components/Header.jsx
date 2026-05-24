import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slices/authSlice";

function Header() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { userInfo } = useSelector(
        (state) => state.auth
    );

    const logoutHandler = () => {
        dispatch(logout());

        navigate("/login");
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                borderBottom: "1px solid gray",
            }}
        >
            <div>
                <Link to="/">Home</Link>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                }}
            >
                {!userInfo ? (
                    <>
                        <Link to="/login">Login</Link>

                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile">Profile</Link>

                        {userInfo.role === "admin" && (
                            <Link to="/admin/users">
                                Admin
                            </Link>
                        )}

                        <button onClick={logoutHandler}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;