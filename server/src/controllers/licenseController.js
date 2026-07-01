const License = require("../models/licenseModel");
const calculateStatus = require("../utils/statusCalculator");

// ==========================================
// CREATE LICENSE
// ==========================================

exports.createLicense = (req, res) => {

    try {

        const {
            description,
            vendor_name,
            quantity,
            duration,
            duration_unit,
            purchase_date,
            renewal_date,
            amount,
            po_number,
            notes
        } = req.body;

        if (
            !description ||
            !vendor_name ||
            !quantity ||
            !duration ||
            !duration_unit ||
            !purchase_date ||
            !renewal_date ||
            !amount ||
            !po_number
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });

        }

        const status = calculateStatus(renewal_date);

        License.create(
            {
                description,
                vendor_name,
                quantity,
                duration,
                duration_unit,
                purchase_date,
                renewal_date,
                amount,
                po_number,
                notes,
                status
            },
            (err) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                return res.status(201).json({

                    success: true,

                    message: "License added successfully."

                });

            }
        );

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// GET ALL LICENSES
// ==========================================

exports.getAllLicenses = (req, res) => {

    License.getAll((err, results) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.status(200).json({

            success: true,

            data: results

        });

    });

};

// ==========================================
// GET LICENSE BY ID
// ==========================================

exports.getLicenseById = (req, res) => {

    const { id } = req.params;

    License.getById(id, (err, results) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                success: false,
                message: "License not found."
            });

        }

        return res.status(200).json({

            success: true,

            data: results[0]

        });

    });

};

// ==========================================
// UPDATE LICENSE
// ==========================================

exports.updateLicense = (req, res) => {

    const { id } = req.params;

    const licenseData = req.body;

    licenseData.status = calculateStatus(
        licenseData.renewal_date
    );

    License.update(id, licenseData, (err) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.status(200).json({

            success: true,

            message: "License updated successfully."

        });

    });

};

// ==========================================
// DELETE LICENSE
// ==========================================

exports.deleteLicense = (req, res) => {

    const { id } = req.params;

    License.delete(id, (err) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.status(200).json({

            success: true,

            message: "License deleted successfully."

        });

    });

};