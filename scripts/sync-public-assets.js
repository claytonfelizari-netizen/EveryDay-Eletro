import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const publicConfigDir = path.join(publicDir, "config");

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(publicConfigDir, { recursive: true });

const fixedAssets = ["logo.png", "banner-eletronicos.png", "fundo2.png"];
const productImagePattern = /^produto\d+\.jpg$/i;

for (const fileName of fs.readdirSync(root)) {
  if (!fixedAssets.includes(fileName) && !productImagePattern.test(fileName)) {
    continue;
  }

  fs.copyFileSync(path.join(root, fileName), path.join(publicDir, fileName));
}

const addressFile = path.join(root, "config/endereco.txt");
if (fs.existsSync(addressFile)) {
  fs.copyFileSync(addressFile, path.join(publicConfigDir, "endereco.txt"));
}
