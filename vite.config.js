import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { readFileSync, writeFileSync, mkdirSync } from "fs";

// Define redirects: slug -> target URL
const redirects = {
  slate: "https://medium.com/@zkislakrobinson/developing-slate-f751be5fa3db",
};

// Generate redirect HTML files from template
const generateRedirects = () => ({
  name: "generate-redirects",
  closeBundle() {
    const template = readFileSync("src/redirect.html", "utf-8");

    for (const [slug, url] of Object.entries(redirects)) {
      const html = template.replaceAll("{{REDIRECT_URL}}", url);

      // Output both slug.html and slug/index.html for flexible URL handling
      writeFileSync(`dist/${slug}.html`, html);
      mkdirSync(`dist/${slug}`, { recursive: true });
      writeFileSync(`dist/${slug}/index.html`, html);
    }
  },
});

export default defineConfig({
  root: "src",
  publicDir: "static",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [viteSingleFile(), generateRedirects()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    open: true,
  },
});
