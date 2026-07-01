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

    sr_no INT NOT NULL,

    description VARCHAR(255) NOT NULL,

    vendor_name VARCHAR(255) NOT NULL,

    quantity INT NOT NULL,

    duration INT NOT NULL,

    duration_unit ENUM(
        'Days',
        'Months',
        'Years'
    ) NOT NULL DEFAULT 'Years',

    purchase_date DATE NOT NULL,

    renewal_date DATE NOT NULL,

    amount DECIMAL(15,2) NOT NULL,

    po_number VARCHAR(100) NOT NULL,

    notes TEXT,

    status ENUM(
        'Active',
        'Expiring Soon',
        'Expired'
    ) DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

);

-- ==========================================
-- License Documents
-- ==========================================

CREATE TABLE license_documents (

    id INT AUTO_INCREMENT PRIMARY KEY,

    license_id INT NOT NULL,

    document_name VARCHAR(255) NOT NULL,

    document_type VARCHAR(100),

    file_path VARCHAR(500) NOT NULL,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_license_document
        FOREIGN KEY (license_id)
        REFERENCES licenses(id)
        ON DELETE CASCADE

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

    status ENUM('Sent','Failed')
        DEFAULT 'Sent',

    CONSTRAINT fk_notification_license
        FOREIGN KEY (license_id)
        REFERENCES licenses(id)
        ON DELETE CASCADE

);