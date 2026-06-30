import { useEffect, useState } from "react";
import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaTimesCircle
} from "react-icons/fa";

import DashboardCard from "../components/DashboardCard";
import { getAllLicenses } from "../services/licenseService";
import "../styles/Dashboard.css";

function Dashboard() {

    const admin = JSON.parse(localStorage.getItem("admin"));

    const [licenses, setLicenses] = useState([]);

    useEffect(() => {
        fetchLicenses();
    }, []);

    const fetchLicenses = async () => {

        try {

            const response = await getAllLicenses();

            setLicenses(response.data);

        } catch (error) {

            console.error("Error fetching licenses:", error);

        }

    };

    const totalLicenses = licenses.length;

    const activeLicenses = licenses.filter(
        (license) => license.status === "Active"
    ).length;

    const expiringLicenses = licenses.filter(
        (license) => license.status === "Expiring Soon"
    ).length;

    const expiredLicenses = licenses.filter(
        (license) => license.status === "Expired"
    ).length;

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>
                    Good Afternoon, {admin?.username}
                </h1>

                <p>
                    Monitor your software licenses, renewals and upcoming expirations.
                </p>

            </div>

            <div className="dashboard-cards">

                <DashboardCard
                    title="Total Licenses"
                    value={totalLicenses}
                    subtitle="Total software licenses"
                    icon={<FaClipboardList />}
                />

                <DashboardCard
                    title="Active Licenses"
                    value={activeLicenses}
                    subtitle="Currently active"
                    icon={<FaCheckCircle />}
                />

                <DashboardCard
                    title="Expiring Soon"
                    value={expiringLicenses}
                    subtitle="Next 30 days"
                    icon={<FaClock />}
                />

                <DashboardCard
                    title="Expired"
                    value={expiredLicenses}
                    subtitle="Needs renewal"
                    icon={<FaTimesCircle />}
                />

            </div>

        </div>

    );

}

export default Dashboard;