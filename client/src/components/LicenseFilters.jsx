import { FaSearch, FaFileCsv, FaUndo } from "react-icons/fa";
import "./../styles/LicenseFilters.css";

function LicenseFilters({

    licenses,

    filters,

    setFilters,

    onExport

}) {

    const vendors = [

        ...new Set(

            licenses
                .map((license) => license.vendor_name)
                .filter(Boolean)

        )

    ].sort();

    const statuses = [

        ...new Set(

            licenses
                .map((license) => license.status)
                .filter(Boolean)

        )

    ];

    const durationUnits = [

        ...new Set(

            licenses
                .map((license) => license.duration_unit)
                .filter(Boolean)

        )

    ];

    const handleChange = (e) => {

        setFilters({

            ...filters,

            [e.target.name]: e.target.value

        });

    };

    const resetFilters = () => {

        setFilters({

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

    };

    return (

        <div className="license-filters">

            <div className="filter-row">

                <div className="search-box">

                    <FaSearch className="search-icon"/>

                    <input

                        type="text"

                        name="search"

                        placeholder="Search..."

                        value={filters.search}

                        onChange={handleChange}

                    />

                </div>

            </div>

            <div className="filter-grid">

                <div>

                    <label>Status</label>

                    <select

                        name="status"

                        value={filters.status}

                        onChange={handleChange}

                    >

                        <option value="">

                            All

                        </option>

                        {

                            statuses.map(status=>(

                                <option

                                    key={status}

                                    value={status}

                                >

                                    {status}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div>

                    <label>Vendor</label>

                    <select

                        name="vendor"

                        value={filters.vendor}

                        onChange={handleChange}

                    >

                        <option value="">

                            All

                        </option>

                        {

                            vendors.map(vendor=>(

                                <option

                                    key={vendor}

                                    value={vendor}

                                >

                                    {vendor}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div>

                    <label>Duration Unit</label>

                    <select

                        name="durationUnit"

                        value={filters.durationUnit}

                        onChange={handleChange}

                    >

                        <option value="">

                            All

                        </option>

                        {

                            durationUnits.map(unit=>(

                                <option

                                    key={unit}

                                    value={unit}

                                >

                                    {unit}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div>

                    <label>Purchase From</label>

                    <input

                        type="date"

                        name="purchaseFrom"

                        value={filters.purchaseFrom}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>Purchase To</label>

                    <input

                        type="date"

                        name="purchaseTo"

                        value={filters.purchaseTo}

                        onChange={handleChange}

                    />

                </div>
                <div>

                    <label>Renewal From</label>

                    <input
                        type="date"
                        name="renewalFrom"
                        value={filters.renewalFrom}
                        onChange={handleChange}
                    />

                </div>

                <div>

                    <label>Renewal To</label>

                    <input
                        type="date"
                        name="renewalTo"
                        value={filters.renewalTo}
                        onChange={handleChange}
                    />

                </div>

                <div>

                    <label>Min Amount</label>

                    <input
                        type="number"
                        name="amountMin"
                        placeholder="0"
                        value={filters.amountMin}
                        onChange={handleChange}
                    />

                </div>

                <div>

                    <label>Max Amount</label>

                    <input
                        type="number"
                        name="amountMax"
                        placeholder="0"
                        value={filters.amountMax}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <div className="filter-actions">

                <button
                    className="reset-btn"
                    type="button"
                    onClick={resetFilters}
                >

                    <FaUndo />

                    Reset

                </button>

                <button
                    className="export-btn"
                    type="button"
                    onClick={onExport}
                >

                    <FaFileCsv />

                    Export CSV

                </button>

            </div>

        </div>

    );

}

export default LicenseFilters;