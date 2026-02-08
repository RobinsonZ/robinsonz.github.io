import { readFileSync, writeFileSync } from "fs";

const licensesJson = JSON.parse(readFileSync("dist/licenses.json", "utf-8"));

const output = Object.entries(licensesJson)
  .map(([name, info]) => {
    const parts = [name];
    if (info.repository) parts.push(info.repository);
    if (info.licenseText) parts.push(info.licenseText);
    else if (info.licenses) parts.push(`License: ${info.licenses}`);
    return parts.join("\n");
  })
  .join("\n\n");

writeFileSync("dist/licenses.txt", output);
