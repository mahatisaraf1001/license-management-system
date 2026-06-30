import { FaFileAlt, FaFileExcel } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/AddLicense.css";

function AddLicense() {

    const navigate = useNavigate();

    return (

        <div className="add-license-page">

            <div className="page-header">

                <h2>Add New License</h2>

                <p>
                    Choose how you would like to add software licenses.
                </p>

            </div>

            <div className="add-options">

                <div
                    className="option-card"
                    onClick={() => navigate("/add-license/manual")}
                >

                    <FaFileAlt className="option-icon" />

                    <h3>Add Single License</h3>

                    <p>
                        Add one software license manually.
                    </p>

                </div>

                <div
                    className="option-card"
                    onClick={() => navigate("/import-excel")}
                >

                    <FaFileExcel className="option-icon excel" />

                    <h3>Import Excel</h3>

                    <p>
                        Import multiple licenses from an Excel file.
                    </p>

                </div>

            </div>

        </div>

    );

}

export default AddLicense;