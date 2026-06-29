const db = require("../config/db");

const AuthModel = {

    createAdmin: (username, email, password, callback) => {

        const sql = `
            INSERT INTO admins (username, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [username, email, password], callback);

    },

    findByEmail: (email, callback) => {

        const sql = `
            SELECT * FROM admins
            WHERE email = ?
        `;

        db.query(sql, [email], callback);

    }

};

module.exports = AuthModel;