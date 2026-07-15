function extractWikiLinks(content) {
    const regex = /\[\[([^\]]+)\]\]/g;

    const links = [];

    let match;

    while ((match = regex.exec(content)) !== null) {
        let link = match[1];

        // [[Page|Alias]]
        link = link.split("|")[0];

        // [[Folder/Page]]
        link = link.split("/").pop();

        link = link.trim();

        // Skip attachment
        if (/\.(png|jpg|jpeg|gif|svg|webp|pdf)$/i.test(link)) {
            continue;
        }

        links.push(link);
    }

    return links;
}

module.exports = {
    extractWikiLinks,
};