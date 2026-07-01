import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LicenseForm from "../components/LicenseForm";

import {
    getLicenseById,
    updateLicense
} from "../services/licenseService";

function EditLicense() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [license, setLicense] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchLicense();

    }, []);

    const fetchLicense = async () => {

        try {

            const response = await getLicenseById(id);

            const data = response.data;

            setLicense({

                ...data,

                purchase_date: data.purchase_date
                    ? data.purchase_date.split("T")[0]
                    : "",

                renewal_date: data.renewal_date
                    ? data.renewal_date.split("T")[0]
                    : "",

                duration_unit: data.duration_unit || "Years"

            });

        }

        catch (error) {

            console.error(error);

            alert("Failed to load license.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleSubmit = async (formData) => {

        try {

            await updateLicense(id, formData);

            alert("License updated successfully.");

            navigate("/licenses");

        }

        catch (error) {

            console.error(error);

            alert("Failed to update license.");

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <h2
                style={{
                    marginBottom: "25px"
                }}
            >
                Edit License
            </h2>

            <LicenseForm

                mode="edit"

                initialData={license}

                onSubmit={handleSubmit}

            />

        </div>

    );

}

export default EditLicense;