USE license_management;

-- ==========================================
-- Admin Table
-- ==========================================

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Licenses Table
-- ==========================================

CREATE TABLE licenses (
    id INT AUTO_INCREMENT PRIMARY KEY,

    software_name VARCHAR(255) NOT NULL,

    vendor_name VARCHAR(255) NOT NULL,

    quantity INT NOT NULL,

    purchase_date DATE,

    renewal_date DATE NOT NULL,

    amount DECIMAL(12,2),

    po_number VARCHAR(100),

    notification_email VARCHAR(255),

    attachment VARCHAR(255),

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Notification Logs
-- ==========================================

CREATE TABLE notification_logs (

    id INT AUTO_INCREMENT PRIMARY KEY,

    license_id INT NOT NULL,

    recipient_email VARCHAR(255) NOT NULL,

    reminder_days INT NOT NULL,

    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    status ENUM('Sent','Failed') DEFAULT 'Sent',

    FOREIGN KEY (license_id)
        REFERENCES licenses(id)
        ON DELETE CASCADE
);