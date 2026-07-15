const fs = require("fs");

const { getVaultPath } = require("../utils/vault");
const { scanMarkdownFiles } = require("../utils/scanner");
const { buildNoteIndex } = require("../utils/noteIndex");
const { extractWikiLinks} = require("../utils/wikilinks");

function checkDeadlinks() {
    const vault = getVaultPath();

    const files = scanMarkdownFiles(vault);
    const notes = buildNoteIndex(files);

    const broken = [];
    let totalLinks = 0;

    for (const file of files) {
        const content = fs.readFileSync(file, "utf8");
        const links = extractWikiLinks(content);

        totalLinks += links.length;

        for (const link of links) {
            if (!notes.has(link)) {
                broken.push({
                    file,
                    link,
                });
            }
        }

    }

    return {
        vault,
        files,
        totalLinks,
        broken,
    };

}

module.exports = checkDeadlinks;