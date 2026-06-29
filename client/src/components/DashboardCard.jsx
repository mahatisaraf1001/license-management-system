import "../styles/DashboardCard.css";

function DashboardCard({ title, value, subtitle, icon }) {

    return (

        <div className="dashboard-card">

            <div className="card-top">

                <div>

                    <p className="card-title">{title}</p>

                    <h2>{value}</h2>

                    <span>{subtitle}</span>

                </div>

                <div className="card-icon">

                    {icon}

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;