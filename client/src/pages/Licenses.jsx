import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Licenses.css";

function Licenses() {

    const navigate = useNavigate();

    return (

        <div className="licenses-page">

            <div className="licenses-header">

                <div>

                    <h2>Licenses</h2>

                    <p>
                        Manage all software licenses from one place.
                    </p>

                </div>

                <button
                    className="add-license-btn"
                    onClick={() => navigate("/add-license")}
                >
                    <FaPlus />

                    Add License
                </button>

            </div>

            <div className="search-bar">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Search by software, vendor or PO Number..."
                />

            </div>

            <div className="licenses-table">

                <table>

                    <thead>

                        <tr>

                            <th>Software</th>
                            <th>Vendor</th>
                            <th>Qty</th>
                            <th>Renewal Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td
                                colSpan="7"
                                className="empty-state"
                            >
                                No licenses available.
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Licenses;