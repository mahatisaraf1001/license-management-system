import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaTimesCircle
} from "react-icons/fa";

import DashboardCard from "../components/DashboardCard";
import "../styles/Dashboard.css";

function Dashboard() {

    const admin = JSON.parse(localStorage.getItem("admin"));

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
                    value="0"
                    subtitle="No licenses added"
                    icon={<FaClipboardList />}
                />

                <DashboardCard
                    title="Active Licenses"
                    value="0"
                    subtitle="Currently active"
                    icon={<FaCheckCircle />}
                />

                <DashboardCard
                    title="Expiring Soon"
                    value="0"
                    subtitle="Next 30 days"
                    icon={<FaClock />}
                />

                <DashboardCard
                    title="Expired"
                    value="0"
                    subtitle="Needs renewal"
                    icon={<FaTimesCircle />}
                />

            </div>

        </div>

    );

}

export default Dashboard;