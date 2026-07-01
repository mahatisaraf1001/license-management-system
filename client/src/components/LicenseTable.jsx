import { FaEdit, FaTrash } from "react-icons/fa";
import "./../styles/LicenseTable.css";
import {
    formatDate,
    generateLicenseId
} from "../utils/dateUtils";

function LicenseTable({

    licenses,

    onEdit,

    onDelete

}) {

    if (licenses.length === 0) {

        return (

            <div className="empty-table">

                No licenses available.

            </div>

        );

    }

    return (

        <div className="licenses-table">

            <table>

                <thead>

                    <tr>

                        <th>Sr No</th>

                        <th>License ID</th>

                        <th>Description</th>

                        <th>Vendor</th>

                        <th>Qty</th>

                        <th>Renewal Date</th>

                        <th>PO Number</th>

                        <th>Amount</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        licenses.map((license, index) => (

                            <tr key={license.id}>

                                <td>{index + 1}</td>
                                
                                <td>
                                        
                                        {generateLicenseId(license.id)}

                                </td>

                                <td>

                                    {license.description}

                                </td>

                                <td>

                                    {license.vendor_name}

                                </td>

                                <td>

                                    {license.quantity}

                                </td>

                                <td>

                                    {formatDate(
                                        license.renewal_date
                                    )}

                                </td>

                                <td>

                                    {license.po_number}

                                </td>

                                <td>

                                    ₹ {Number(
                                        license.amount
                                    ).toLocaleString()}

                                </td>

                                <td>

                                    <span
                                        className={`status ${license.status
                                            .replace(/\s/g, "")
                                            .toLowerCase()}`}
                                    >

                                        {license.status}

                                    </span>

                                </td>

                                <td>

                                    <button
                                        className="action-btn edit"
                                        onClick={() =>
                                            onEdit(license.id)
                                        }
                                    >

                                        <FaEdit />

                                    </button>

                                    <button
                                        className="action-btn delete"
                                        onClick={() =>
                                            onDelete(license.id)
                                        }
                                    >

                                        <FaTrash />

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default LicenseTable;