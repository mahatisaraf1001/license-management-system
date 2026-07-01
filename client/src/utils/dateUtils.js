export const formatDate = (dateString) => {

    if (!dateString) return "";

    const [year, month, day] = dateString
        .split("T")[0]
        .split("-");

    return `${day}/${month}/${year}`;

};

export const formatInputDate = (dateString) => {

    if (!dateString) return "";

    return dateString.split("T")[0];

};

export const addDuration = (

    purchaseDate,

    duration,

    unit

) => {

    if (!purchaseDate || !duration)
        return "";

    const [y, m, d] = purchaseDate
        .split("-")
        .map(Number);

    const date = new Date(

        y,

        m - 1,

        d,

        12,

        0,

        0

    );

    switch (unit) {

        case "Days":

            date.setDate(

                date.getDate() + Number(duration)

            );

            break;

        case "Months":

            date.setMonth(

                date.getMonth() + Number(duration)

            );

            break;

        default:

            date.setFullYear(

                date.getFullYear() + Number(duration)

            );

    }

    const year = date.getFullYear();

    const month = String(

        date.getMonth() + 1

    ).padStart(2, "0");

    const day = String(

        date.getDate()

    ).padStart(2, "0");

    return `${year}-${month}-${day}`;

};

export const compareDate = (

    first,

    second

) => {

    return (

        new Date(`${first}T12:00:00`).getTime() -

        new Date(`${second}T12:00:00`).getTime()

    );

};

export const generateLicenseId = (id) => {

    return `LMS-${String(id).padStart(5, "0")}`;

};