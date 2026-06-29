const bcrypt = require("bcrypt");
const AuthModel = require("../models/authModel");

exports.register = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        AuthModel.findByEmail(email, async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists."
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            AuthModel.createAdmin(
                username,
                email,
                hashedPassword,
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    return res.status(201).json({
                        success: true,
                        message: "Administrator created successfully."
                    });

                }
            );

        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};