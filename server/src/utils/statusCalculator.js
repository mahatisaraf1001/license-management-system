function calculateStatus(renewalDate) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const renewal = new Date(renewalDate);

    renewal.setHours(0, 0, 0, 0);

    const difference = Math.ceil(
        (renewal - today) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) {
        return "Expired";
    }

    if (difference <= 30) {
        return "Expiring Soon";
    }

    return "Active";
}

module.exports = calculateStatus;