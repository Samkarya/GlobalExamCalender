import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXAMS_DIR = path.join(__dirname, '../src/data/exams');
const ARCHIVE_DIR = path.join(__dirname, '../archive/data');

if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}

const now = new Date();
const currentYear = now.getFullYear();
const minYear = currentYear - 1;

/**
 * Recursively find all json files
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.json')) {
            arrayOfFiles.push(fullPath);
        }
    });
    return arrayOfFiles;
}

function runHousekeeping() {
    console.log(`🧹 Starting Housekeeping (Window: ${minYear} to Future)...`);
    const files = getAllFiles(EXAMS_DIR);
    let movedCount = 0;
    let trimmedCount = 0;

    files.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(content);

            if (!data.dates || data.dates.length === 0) return;

            // Check if ANY date is within or after our window
            const hasActiveDates = data.dates.some(d => {
                const year = new Date(d.date).getFullYear();
                return year >= minYear;
            });

            if (!hasActiveDates) {
                // MOVE FULL FILE TO ARCHIVE
                const relativePath = path.relative(EXAMS_DIR, filePath);
                const destPath = path.join(ARCHIVE_DIR, relativePath);
                const destDir = path.dirname(destPath);

                if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

                fs.renameSync(filePath, destPath);
                console.log(`📦 Archived: ${relativePath} (No active dates)`);
                movedCount++;
            } else {
                // TRIM OLD DATES FROM ACTIVE FILE
                const initialCount = data.dates.length;
                data.dates = data.dates.filter(d => {
                    const year = new Date(d.date).getFullYear();
                    return year >= minYear;
                });

                if (data.dates.length < initialCount) {
                    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                    console.log(`✂️ Trimmed ${initialCount - data.dates.length} old dates from ${path.basename(filePath)}`);
                    trimmedCount++;
                }
            }
        } catch (err) {
            console.error(`❌ Error processing ${filePath}:`, err.message);
        }
    });

    console.log(`\n✨ Housekeeping Complete!`);
    console.log(`- Archived ${movedCount} legacy files.`);
    console.log(`- Trimmed old data from ${trimmedCount} active files.`);
}

runHousekeeping();
