const { scanAllTodos } = require("../checks/todos");
const { getVaultPath } = require("../utils/vault");
const { scanMarkdownFiles } = require("../utils/scanner");

function todo() {
    const todos = scanAllTodos();

    const vault = getVaultPath();
    const files = scanMarkdownFiles(vault);

    if (todos.length === 0) {
        console.log("\n✅ No todos found in vault.");
        return;
    }

    const pending = todos.filter((t) => !t.done);
    const completed = todos.filter((t) => t.done);

    console.log("\n📝 Todo Scanner\n");
    console.log(`Total     : ${todos.length}`);
    console.log(`Pending   : ${pending.length}`);
    console.log(`Completed : ${completed.length}`);
    console.log(`Notes     : ${files.length}`);

    if (pending.length > 0) {
        console.log("\nPending\n");

        pending.forEach((t) => {
            console.log(`  ${t.file}`);
            console.log(`    [ ] ${t.text}`);
            if (t.tags.length > 0) {
                console.log(`        ${t.tags.join(" ")}`);
            }
        });
    }

    if (completed.length > 0) {
        console.log("\nCompleted\n");

        completed.forEach((t) => {
            console.log(`  ${t.file}`);
            console.log(`    [x] ${t.text}`);
        });
    }
}

module.exports = todo;
