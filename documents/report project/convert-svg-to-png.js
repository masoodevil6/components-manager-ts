/**
 * SVG → PNG Converter
 *
 * استفاده:
 *   node convert-svg-to-png.js            ← تبدیل همه SVGهای پوشه
 *   node convert-svg-to-png.js file.svg   ← تبدیل یک فایل خاص
 *
 * اولین بار خودش sharp را نصب می‌کند.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const dir = __dirname;

// --- نصب sharp اگر نصب نیست ---
const nodeModulesPath = path.join(dir, "node_modules", "sharp");
try {
    if (!fs.existsSync(nodeModulesPath)) {
        console.log("📦 نصب sharp...");
        execSync(`npm install sharp --prefix "${dir}"`, { stdio: "inherit" });
        console.log("✅ sharp نصب شد\n");
    }
} catch (e) {
    console.error("❌ نصب sharp ناموفق:", e.message);
    process.exit(1);
}

const sharp = require(path.join(dir, "node_modules", "sharp"));

// --- لیست فایل‌ها ---
const files = process.argv[2]
    ? [process.argv[2]]
    : fs.readdirSync(dir).filter(f => f.endsWith(".svg"));

if (files.length === 0) {
    console.log("❌ هیچ فایل SVG پیدا نشد");
    process.exit(1);
}

// --- تبدیل ---
(async () => {
    for (const file of files) {
        const src  = path.join(dir, file);
        const dest = path.join(dir, file.replace(/\.svg$/, ".png"));

        try {
            await sharp(src, { density: 300 })
                .png()
                .toFile(dest);

            console.log(`✅ ${file} → ${path.basename(dest)}`);
        } catch (err) {
            console.error(`❌ ${file}: ${err.message}`);
        }
    }
})();
