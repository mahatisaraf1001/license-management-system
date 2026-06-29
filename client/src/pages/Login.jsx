import { useState } from "react";
import { FaClipboardList, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(formData);

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
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-login"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;