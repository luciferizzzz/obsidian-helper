function parseTemplate(template, data) {
    let result = template;

    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, "g");
        result = result.replace(regex, data[key]);
    }

    return result;
}

module.exports = {
    parseTemplate,
};