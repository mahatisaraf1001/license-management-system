import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateAdmin from "./pages/CreateAdmin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Licenses from "./pages/Licenses";
import AddLicense from "./pages/AddLicense";
import ImportExcel from "./pages/ImportExcel";
import ManualLicense from "./pages/ManualLicense";
import EditLicense from "./pages/EditLicense";

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
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/licenses"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Licenses />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-license"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <AddLicense />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/import-excel"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <ImportExcel />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-license/manual"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <ManualLicense />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/licenses/edit/:id"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <EditLicense />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;