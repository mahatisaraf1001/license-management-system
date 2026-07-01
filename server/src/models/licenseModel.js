const db = require("../config/db");

const License = {

    create: (licenseData, callback) => {

        const sql = `
            INSERT INTO licenses
            (
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
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                licenseData.description,
                licenseData.vendor_name,
                licenseData.quantity,
                licenseData.duration,
                licenseData.duration_unit,
                licenseData.purchase_date,
                licenseData.renewal_date,
                licenseData.amount,
                licenseData.po_number,
                licenseData.notes,
                licenseData.status
            ],
            callback
        );

    },

    getAll: (callback) => {

        db.query(
            "SELECT * FROM licenses ORDER BY id ASC",
            callback
        );

    },

    getById: (id, callback) => {

        db.query(
            "SELECT * FROM licenses WHERE id = ?",
            [id],
            callback
        );

    },

    update: (id, licenseData, callback) => {

        const sql = `
            UPDATE licenses
            SET
                description = ?,
                vendor_name = ?,
                quantity = ?,
                duration = ?,
                duration_unit = ?,
                purchase_date = ?,
                renewal_date = ?,
                amount = ?,
                po_number = ?,
                notes = ?,
                status = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                licenseData.description,
                licenseData.vendor_name,
                licenseData.quantity,
                licenseData.duration,
                licenseData.duration_unit,
                licenseData.purchase_date,
                licenseData.renewal_date,
                licenseData.amount,
                licenseData.po_number,
                licenseData.notes,
                licenseData.status,
                id
            ],
            callback
        );

    },

    delete: (id, callback) => {

        db.query(
            "DELETE FROM licenses WHERE id = ?",
            [id],
            callback
        );

    }

};

module.exports = License;