const fs = require("fs");
const path = require("path");

function createFile(filePath, content = "") {
  const dir = path.dirname(filePath);

  // Kalau folder belum ada, buat otomatis
  fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(filePath)) {
    throw new Error("File sudah ada.");
  }

  fs.writeFileSync(filePath, content);
}

module.exports = {
  createFile,
};