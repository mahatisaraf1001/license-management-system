const db = require("../config/db");

const License = {

    create: (licenseData, callback) => {

        const sql = `
            INSERT INTO licenses
            (
                sr_no,
                description,
                vendor_name,
                quantity,
                duration,
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
                licenseData.sr_no,
                licenseData.description,
                licenseData.vendor_name,
                licenseData.quantity,
                licenseData.duration,
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
            "SELECT * FROM licenses ORDER BY renewal_date ASC",
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
                sr_no=?,
                description=?,
                vendor_name=?,
                quantity=?,
                duration=?,
                purchase_date=?,
                renewal_date=?,
                amount=?,
                po_number=?,
                notes=?,
                status=?
            WHERE id=?
        `;

        db.query(
            sql,
            [
                licenseData.sr_no,
                licenseData.description,
                licenseData.vendor_name,
                licenseData.quantity,
                licenseData.duration,
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
            "DELETE FROM licenses WHERE id=?",
            [id],
            callback
        );

    }

};

module.exports = License;