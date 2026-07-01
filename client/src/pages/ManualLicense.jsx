import { useNavigate } from "react-router-dom";
import LicenseForm from "../components/LicenseForm";
import { createLicense } from "../services/licenseService";

function ManualLicense() {

    const navigate = useNavigate();

    const handleSubmit = async (formData) => {

        try {

            await createLicense(formData);

            alert("License added successfully.");

            navigate("/licenses");

        }

        catch (error) {

            console.error(error);

            alert("Failed to add license.");

        }

    };

    return (

        <div>

            <h2
                style={{
                    marginBottom: "25px"
                }}
            >
                Add Single License
            </h2>

            <LicenseForm
                mode="add"
                onSubmit={handleSubmit}
            />

        </div>

    );

}

export default ManualLicense;