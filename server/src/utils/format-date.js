const formatDate = (date) => {
    const now = new Date(date);
    let options = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    return now.toLocaleDateString("es-CL", options);
};

module.exports = formatDate;