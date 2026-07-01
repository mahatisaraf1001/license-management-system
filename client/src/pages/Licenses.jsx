import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import LicenseTable from "../components/LicenseTable";
import LicenseFilters from "../components/LicenseFilters";
import ConfirmModal from "../components/ConfirmModal";

import {
    getAllLicenses,
    deleteLicense
} from "../services/licenseService";

import "../styles/Licenses.css";

function Licenses() {

    const navigate = useNavigate();

    const [licenses, setLicenses] = useState([]);

    const [filters, setFilters] = useState({

        search: "",

        status: "",

        vendor: "",

        durationUnit: "",

        purchaseFrom: "",

        purchaseTo: "",

        renewalFrom: "",

        renewalTo: "",

        amountMin: "",

        amountMax: ""

    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedLicenseId, setSelectedLicenseId] = useState(null);

    useEffect(() => {

        fetchLicenses();

    }, []);

    const fetchLicenses = async () => {

        try {

            const response = await getAllLicenses();

            setLicenses(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleEdit = (id) => {

        navigate(`/licenses/edit/${id}`);

    };

    const handleDelete = (id) => {

        setSelectedLicenseId(id);

        setShowDeleteModal(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteLicense(selectedLicenseId);

            fetchLicenses();

        }

        catch (error) {

            console.error(error);

        }

        setShowDeleteModal(false);

        setSelectedLicenseId(null);

    };

    const filteredLicenses = useMemo(() => {

        return licenses.filter((license) => {

            const keyword = filters.search.toLowerCase();

            if (
                keyword &&
                !(
                    String(license.sr_no).includes(keyword) ||
                    license.description.toLowerCase().includes(keyword) ||
                    license.vendor_name.toLowerCase().includes(keyword) ||
                    license.po_number.toLowerCase().includes(keyword) ||
                    license.notes?.toLowerCase().includes(keyword) ||
                    license.status.toLowerCase().includes(keyword)
                )
            ) {
                return false;
            }

            if (
                filters.status &&
                license.status !== filters.status
            ) {
                return false;
            }

            if (
                filters.vendor &&
                license.vendor_name !== filters.vendor
            ) {
                return false;
            }

            if (
                filters.durationUnit &&
                license.duration_unit !== filters.durationUnit
            ) {
                return false;
            }

            const purchase = new Date(
                license.purchase_date
            ).getTime();

            const purchaseFrom = filters.purchaseFrom
                ? new Date(filters.purchaseFrom).getTime()
                : null;

            const purchaseTo = filters.purchaseTo
                ? new Date(filters.purchaseTo).getTime()
                : null;

            if (
                purchaseFrom !== null &&
                purchase < purchaseFrom
            ) {
                return false;
            }

            if (
                purchaseTo !== null &&
                purchase > purchaseTo
            ) {
                return false;
            }

            const renewal = new Date(
                license.renewal_date
            ).getTime();

            const renewalFrom = filters.renewalFrom
                ? new Date(filters.renewalFrom).getTime()
                : null;

            const renewalTo = filters.renewalTo
                ? new Date(filters.renewalTo).getTime()
                : null;

            if (
                renewalFrom !== null &&
                renewal < renewalFrom
            ) {
                return false;
            }

            if (
                renewalTo !== null &&
                renewal > renewalTo
            ) {
                return false;
            }

            if (
                filters.amountMin &&
                Number(license.amount) <
                Number(filters.amountMin)
            ) {
                return false;
            }

            if (
                filters.amountMax &&
                Number(license.amount) >
                Number(filters.amountMax)
            ) {
                return false;
            }
            
            
            return true;

        });

    }, [licenses, filters]);

    const exportCSV = () => {

        const headers = [

            "Sr No",
            "Description",
            "Vendor",
            "Quantity",
            "Duration",
            "Duration Unit",
            "Purchase Date",
            "Renewal Date",
            "Amount",
            "PO Number",
            "Status"

        ];

        const rows = filteredLicenses.map((license) => [

            license.sr_no,
            license.description,
            license.vendor_name,
            license.quantity,
            license.duration,
            license.duration_unit,
            license.purchase_date,
            license.renewal_date,
            license.amount,
            license.po_number,
            license.status

        ]);

        const csv = [

            headers.join(","),

            ...rows.map(row => row.join(","))

        ].join("\n");

        const blob = new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "licenses.csv";

        link.click();

        URL.revokeObjectURL(url);

    };
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

            <LicenseFilters

                licenses={licenses}

                filters={filters}

                setFilters={setFilters}

                onExport={exportCSV}

            />

            <LicenseTable

                licenses={filteredLicenses}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            <ConfirmModal

                isOpen={showDeleteModal}

                title="Delete License"

                message="Are you sure you want to delete this license? This action cannot be undone."

                onConfirm={confirmDelete}

                onCancel={() => {

                    setShowDeleteModal(false);

                    setSelectedLicenseId(null);

                }}

            />

        </div>

    );

}

export default Licenses;