import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const examsDir = path.join(__dirname, '../src/data/exams');
const publicDir = path.join(__dirname, '../public');

// recursively find all json
function getAllFiles(dirPath, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else if (file.endsWith('.json')) {
            arrayOfFiles.push(path.join(dirPath, '/', file));
        }
    });
    return arrayOfFiles;
}

const files = getAllFiles(examsDir);

let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GlobalExamCalendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-PUBLISHED-TTL:PT12H',
    'X-WR-CALNAME:Global Exam Calendar',
    'X-WR-TIMEZONE:UTC'
].join('\r\n');

function escapeICS(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,');
}

files.forEach(file => {
    try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        data.dates?.forEach(event => {
            const dt = event.date.replace(/-/g, '');
            const summary = `${data.short_name} - ${event.label}`;
            const description = `Official URL: ${data.official_url}\\nView more details on Global Exam Calendar.`;

            icsContent += '\r\n' + [
                'BEGIN:VEVENT',
                `DTSTART;VALUE=DATE:${dt}`,
                `SUMMARY:${escapeICS(summary)}`,
                `DESCRIPTION:${escapeICS(description)}`,
                `UID:${data.id}-${event.type}-${dt}@globalexamcalendar`,
                'END:VEVENT'
            ].join('\r\n');
        });
    } catch (e) {
        console.error(`Error parsing ${file}:`, e);
    }
});

icsContent += '\r\nEND:VCALENDAR';

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'global.ics'), icsContent);
console.log(`[Success] Generated public/global.ics representing ${files.length} exams.`);
