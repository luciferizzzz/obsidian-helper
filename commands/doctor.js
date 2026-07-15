const checkDeadLinks = require("../checks/deadlinks");

function doctor() {
    const dead = checkDeadLinks();

    console.log(" Vault Health Report\n");

    console.log(`Notes : ${dead.files.length}`);
    console.log(`Links : ${dead.totalLinks}`);
    console.log(`Broken Links : ${dead.broken.length}`);

    if (dead.broken.length === 0) {
        console.log("\n✅ Vault Healthy");
    } else {
        console.log("\n⚠ Ada masalah yang perlu diperbaiki.")
    }

}

module.exports = doctor