import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateAdmin from "./pages/CreateAdmin";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                <Route
                    path="/create-admin"
                    element={<CreateAdmin />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;