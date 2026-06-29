import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginAdmin } from "../services/authService";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        if (!formData.email || !formData.password) {
            setMessage("Please enter both email and password.");
            setMessageType("danger");
            return;
        }

        try {

            setLoading(true);

            const response = await loginAdmin(formData);

            localStorage.setItem("token", response.token);
            localStorage.setItem("admin", JSON.stringify(response.admin));

            setMessage(response.message);
            setMessageType("success");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (error) {

            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Unable to connect to server.");
            }

            setMessageType("danger");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="text-center mb-4">

                    <FaClipboardList
                        size={50}
                        color="#2563eb"
                    />

                    <h2 className="title mt-3">
                        License Management System
                    </h2>

                    <h4 className="subtitle">
                        Administrator Login
                    </h4>

                </div>

                {message && (
                    <div className={`alert alert-${messageType}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Password
                        </label>

                        <div className="input-group">

                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-login"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;