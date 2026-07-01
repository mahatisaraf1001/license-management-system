import { useEffect, useRef, useState } from "react";
import "../styles/LicenseForm.css";

function LicenseForm({
    mode = "add",
    onSubmit,
    initialData = {}
}) {

    const [loading, setLoading] = useState(false);

    const submittingRef = useRef(false);

    const [formData, setFormData] = useState({

        description: initialData.description || "",

        vendor_name: initialData.vendor_name || "",

        quantity: initialData.quantity || "",

        duration: initialData.duration || "",

        duration_unit: initialData.duration_unit || "Years",

        purchase_date: initialData.purchase_date
            ? initialData.purchase_date.split("T")[0]
            : "",

        renewal_date: initialData.renewal_date
            ? initialData.renewal_date.split("T")[0]
            : "",

        amount: initialData.amount || "",

        po_number: initialData.po_number || "",

        notes: initialData.notes || ""

    });

    useEffect(() => {

        if (!formData.purchase_date || !formData.duration) return;

        const purchase = new Date(
            `${formData.purchase_date}T12:00:00`
        );

        const renewal = new Date(purchase);

        switch (formData.duration_unit) {

            case "Days":
                renewal.setDate(
                    renewal.getDate() + Number(formData.duration)
                );
                break;

            case "Months":
                renewal.setMonth(
                    renewal.getMonth() + Number(formData.duration)
                );
                break;

            default:
                renewal.setFullYear(
                    renewal.getFullYear() + Number(formData.duration)
                );

        }

        const year = renewal.getFullYear();

        const month = String(
            renewal.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            renewal.getDate()
        ).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;

        setFormData(prev => ({

            ...prev,

            renewal_date: formattedDate

        }));

    }, [
        formData.purchase_date,
        formData.duration,
        formData.duration_unit
    ]);

    const handleChange = (e) => {

        setFormData(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (submittingRef.current) return;

        submittingRef.current = true;

        setLoading(true);

        try {

            console.log(formData);

            await onSubmit(formData);

        }

        finally {

            submittingRef.current = false;

            setLoading(false);

        }

    };

    return (

        <form
            className="license-form"
            onSubmit={handleSubmit}
        >

            <div className="form-grid">

                <div>

                    <label>Description *</label>

                    <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div>

                    <label>Vendor Name *</label>

                    <input
                        name="vendor_name"
                        value={formData.vendor_name}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div>

                    <label>Quantity *</label>

                    <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />

                </div>
            
                <div>

                    <label>Amount *</label>

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div>

                    <label>Duration *</label>

                    <input
                        type="number"
                        min="1"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div>

                    <label>Duration Unit *</label>

                    <select
                        name="duration_unit"
                        value={formData.duration_unit}
                        onChange={handleChange}
                    >

                        <option value="Days">Days</option>

                        <option value="Months">Months</option>

                        <option value="Years">Years</option>

                    </select>

                </div>

                <div>

                    <label>Purchase Date *</label>

                    <input
                        type="date"
                        name="purchase_date"
                        value={formData.purchase_date}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div>

                    <label>Renewal Date</label>

                    <input
                        type="date"
                        value={formData.renewal_date}
                        readOnly
                    />

                </div>



                <div>

                    <label>PO Number *</label>

                    <input
                        name="po_number"
                        value={formData.po_number}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="notes-field">

                <label>Notes</label>

                <textarea
                    rows={4}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

            </div>

            <button
                className="save-btn"
                type="submit"
                disabled={loading}
            >

                {
                    loading
                        ? "Saving..."
                        : mode === "edit"
                            ? "Update License"
                            : "Save License"
                }

            </button>

        </form>

    );

}

export default LicenseForm;