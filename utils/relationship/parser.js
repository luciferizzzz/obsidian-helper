function parseWikiLinks(content) {
    const regex = /\[\[([^\]]+)\]\]/g;
    const links = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        let rest = match[1].trim();
        if (!rest) continue;

        let alias = null;
        let heading = null;

        // [[Page|Alias]]
        if (rest.includes("|")) {
            const parts = rest.split("|");
            rest = parts[0];
            alias = parts.slice(1).join("|").trim() || null;
        }

        // [[Page#Heading]] or [[Page#^block]]
        if (rest.includes("#")) {
            const parts = rest.split("#");
            rest = parts[0];
            heading = parts.slice(1).join("#").trim() || null;
        }

        // [[Folder/Page]] -> Page
        const target = rest.split("/").pop().trim();

        // Skip attachments
        if (/\.(png|jpg|jpeg|gif|svg|webp|pdf|mp3|mp4|mov|wav|ogg)$/i.test(target)) {
            continue;
        }

        links.push({
            target,
            alias,
            heading,
            raw: match[1],
        });
    }

    return links;
}

function normalizeTarget(target) {
    return String(target)
        .split("#")[0]
        .split("|")[0]
        .split("/")
        .pop()
        .trim()
        .toLowerCase();
}

function normalizeLink(link) {
    const parsed = typeof link === "string"
        ? parseWikiLinks(link)[0]
        : link;

    if (!parsed) return "";

    return normalizeTarget(parsed.target);
}

function parseHeadings(content) {
    const headings = [];
    const regex = /^(#{1,6})\s+(.+?)\s*$/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
        headings.push({
            level: match[1].length,
            text: match[2].trim(),
        });
    }

    return headings;
}

function getSectionContent(content, heading) {
    const lines = content.split(/\r?\n/);
    const target = String(heading).trim().toLowerCase();
    const section = [];
    let inSection = false;

    for (const line of lines) {
        const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);
        if (match) {
            if (inSection) break;
            if (match[2].trim().toLowerCase() === target) {
                inSection = true;
                continue;
            }
        }
        if (inSection) section.push(line);
    }

    return section.join("\n");
}

module.exports = {
    parseWikiLinks,
    normalizeTarget,
    normalizeLink,
    parseHeadings,
    getSectionContent,
};
