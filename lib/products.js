import fs from "node:fs";
import path from "node:path";

const PRODUCT_LIMIT = 200;

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function parseProductText(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let category = "outros";
  let reference = "";
  let consumptionImage = "";
  let hourlyCost = "";
  let price = "";
  let active = true;
  const description = [];

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.startsWith("categoria:")) {
      category = line.substring(10).trim().toLowerCase();
    } else if (
      lower.startsWith("referencia:") ||
      lower.startsWith("referência:") ||
      lower.startsWith("ref:")
    ) {
      reference = line.substring(line.indexOf(":") + 1).trim();
    } else if (lower.startsWith("preço:") || lower.startsWith("preco:")) {
      price = line.substring(line.indexOf(":") + 1).trim();
    } else if (lower.startsWith("ativo:")) {
      const value = line.substring(line.indexOf(":") + 1).trim().toLowerCase();
      active = !["nao", "não", "no", "false", "0"].includes(value);
    } else if (lower.startsWith("consumo:")) {
      consumptionImage = line.substring(8).trim();
    } else if (lower.startsWith("gastohora:")) {
      hourlyCost = line.substring(10).trim();
    } else {
      description.push(line);
    }
  }

  return {
    active,
    category,
    reference,
    price,
    consumptionImage,
    hourlyCost,
    description,
  };
}

export function formatPriceBR(value) {
  if (!value) return "";

  let normalized = String(value).trim();
  normalized = normalized.replace(/\s/g, "");
  normalized = normalized.replace(/r\$/gi, "");
  normalized = normalized.replace(/\./g, "").replace(",", ".");

  const number = Number(normalized);
  if (!Number.isFinite(number)) return "";

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPixPriceBR(value) {
  if (!value) return "";

  const number = Number(String(value).replace(/\./g, "").replace(",", "."));
  if (!Number.isFinite(number)) return "";

  return (number * 0.9).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getProducts() {
  const root = process.cwd();
  const products = [];

  for (let index = 1; index <= PRODUCT_LIMIT; index += 1) {
    const imageName = `produto${index}.jpg`;
    const textName = `produto${index}.txt`;
    const imagePath = path.join(root, imageName);
    const textPath = path.join(root, textName);

    if (!fileExists(imagePath) || !fileExists(textPath)) continue;

    const parsed = parseProductText(fs.readFileSync(textPath, "utf8"));
    if (!parsed.active) continue;

    products.push({
      id: index,
      image: `/${imageName}`,
      alt: `Produto ${index}`,
      category: parsed.category,
      reference: parsed.reference || `REF ${String(index).padStart(3, "0")}`,
      description: parsed.description,
      price: formatPriceBR(parsed.price),
      pixPrice: formatPixPriceBR(parsed.price),
      consumptionImage: parsed.consumptionImage
        ? `/${parsed.consumptionImage}`
        : "",
      hourlyCost: parsed.hourlyCost,
    });
  }

  return products;
}

export function getStoreAddress() {
  try {
    return fs.readFileSync(path.join(process.cwd(), "config/endereco.txt"), "utf8").trim();
  } catch {
    return "Endereço não disponível";
  }
}
