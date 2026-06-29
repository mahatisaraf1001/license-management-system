import { useState } from "react";
import "../styles/CreateAdmin.css";
import { FaClipboardList, FaEye, FaEyeSlash } from "react-icons/fa";
import { registerAdmin } from "../services/authService";

function CreateAdmin() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setMessage("All fields are required.");
            setMessageType("danger");
            return;
        }

        if (!formData.email.includes("@")) {
            setMessage("Enter a valid email.");
            setMessageType("danger");
            return;
        }

        if (formData.password.length < 8) {
            setMessage("Password must be at least 8 characters.");
            setMessageType("danger");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType("danger");
            return;
        }

        try {

            setLoading(true);

            const response = await registerAdmin({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            setMessage(response.message);
            setMessageType("success");

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

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

        <div className="create-admin-container">

            <div className="create-admin-card">

                <div className="text-center mb-4">

                    <FaClipboardList
                        size={50}
                        color="#2563eb"
                    />

                    <h2 className="title mt-3">
                        License Management System
                    </h2>

                    <h4 className="subtitle">
                        Create Administrator
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
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                        />

                    </div>

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
                        />

                    </div>

                    <div className="mb-3">

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
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {
                                    showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }

                            </button>

                        </div>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Confirm Password
                        </label>

                        <div className="input-group">

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {
                                    showConfirmPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }

                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-create"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Creating..."
                                : "Create Administrator"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateAdmin;