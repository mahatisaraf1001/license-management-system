const db = require("../config/db");

const AuthModel = {

    // Create a new admin
    createAdmin: (username, email, password, callback) => {

        const sql = `
            INSERT INTO admins (username, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [username, email, password], callback);

    },

    // Find admin by email
    findByEmail: (email, callback) => {

        const sql = `
            SELECT * FROM admins
            WHERE email = ?
        `;

        db.query(sql, [email], callback);

    }

};

module.exports = AuthModel;