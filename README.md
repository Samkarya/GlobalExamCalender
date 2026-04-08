# 🌍 Global Exam Calendar
### The world's first open-source, decentralized index of every exam date.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![PWA Ready](https://img.shields.io/badge/PWA-ready-blueviolet.svg)](https://web.dev/progressive-web-apps/)

**[View Live Application →](https://global-exam-calendar.vercel.app)** *(Link placeholder)*

---

## 🚀 The Vision

High-stakes exams are a universal human experience, yet their dates are scattered across thousands of fragmented, ad-driven government and institutional sites. **Global Exam Calendar** exists to solve this.

We are building a **single, unified, open-source source of truth** for every competitive, professional, and academic exam in the world. 
*   **Decentralized Data:** Every exam is a simple JSON file. No complex database queries.
*   **Privacy First:** No accounts, no tracking. Your planner is stored purely on your device.
*   **Calendar Sync:** A global `webcal` feed that keeps your personal calendar updated automatically.

---

## ✨ Features

- **Three Views:** Monthly **Calendar**, detailed **List**, and animated **Timeline**.
- **Global Sync:** Subscribe to the `global.ics` feed to see dates in Google/Apple Calendar.
- **My Planner:** "Star" exams to build a personalized study schedule (stored locally).
- **Search & Filter:** Find exams by country, category, or type in milliseconds.
- **PWA Support:** Install it on your phone/desktop and use it offline.

---

## 🤝 Contributing (No Coding Required!)

**If you know when an exam is happening, you are qualified to contribute.** You don't need to be a developer to help!

### 1. The Easy Way (Data Only)
Adding a new exam is as simple as creating a text file.
1.  Navigate to `src/data/exams/[country-code]/`.
2.  Create a new `.json` file (e.g., `sat-2026.json`).
3.  Copy and fill in this template:

```json
{
  "id": "exam-slug",
  "name": "Full Exam Name",
  "short_name": "ABBRV",
  "country": "Country",
  "country_code": "XX",
  "region": "Continent/Region",
  "category": "professional", 
  "conducting_body": "Organization Name",
  "frequency": "annual",
  "official_url": "https://official-site.org",
  "tags": ["tag1", "tag2"],
  "eligibility": "Basic requirements here",
  "dates": [
    {
      "type": "exam_date",
      "date": "2026-05-20",
      "label": "Main Examination",
      "tentative": false
    }
  ]
}
```

### 🤖 Contributor's AI Kit
Use the following **"Few-Shot Prompt"** with any AI to get a perfect result. 

**Copy & Paste this entire block:**
> "I am a contributor to the Global Exam Calendar. Please generate a JSON file for the exam: **[INSERT EXAM NAME & YEAR]**.
>
> ### 1. Rules for Fields:
> - **id**: Lowercase slug without year (e.g., 'sat-global').
> - **name**: Full official name of the exam.
> - **short_name**: Common abbreviation or acronym.
> - **country**: Full name of the country (or 'Global').
> - **country_code**: ISO 2-letter code (e.g., 'IN', 'US', 'GB'). Use 'GLOBAL' for multi-country exams.
> - **region**: Geographic region (e.g., 'Asia', 'Europe', 'North America').
> - **category**: Must be exactly one of: 'entrance', 'competitive', 'language', 'professional', 'academic'.
> - **conducting_body**: Organization Name.
> - **frequency**: e.g., 'annual', 'biannual'.
> - **official_url**: Main portal URL.
> - **tags**: (Array) 3-5 relevant keywords (e.g., ["mba", "business", "india"]).
> - **eligibility**: Brief criteria for taking the exam.
> - **dates**: Array of objects with { type, date (YYYY-MM-DD), label, tentative (bool) }. Use these types: 'registration_start', 'registration_end', 'admit_card' (hall ticket), 'exam_date', 'result', 'counselling' (admission process).
>
> ### 2. Reference Example:
> ```json
> {
>   "id": "cat-exam",
>   "name": "Common Admission Test",
>   "short_name": "CAT",
>   "country": "India",
>   "country_code": "IN",
>   "region": "Asia",
>   "category": "entrance",
>   "conducting_body": "IIMs",
>   "frequency": "annual",
>   "official_url": "https://iimcat.ac.in",
>   "tags": ["mba", "iim", "management"],
>   "eligibility": "Graduate degree with 50% marks",
>   "dates": [
>     { "type": "registration_start", "date": "2026-08-01", "label": "Registration Opens" },
>     { "type": "exam_date", "date": "2026-11-22", "label": "CAT Exam Day", "tentative": false },
>     { "type": "result", "date": "2027-01-10", "label": "Results Declared", "tentative": true }
>   ]
> }
> ```
> Now, please generate the JSON for: **[INSERT EXAM NAME]**"

### 2. The Dev Way (React/CSS)
If you want to improve the UI or logic:
1.  **Fork & Clone** the repo.
2.  Run `npm install` and `npm run dev`.
3.  Pick an issue or suggest a new feature!

---

## 🛠️ Tech Stack

- **Core:** React 19 (Hooks, Context) + Vite 6
- **Styling:** Premium Vanilla CSS (Glassmorphism, Dark Mode)
- **Icons:** Lucide React
- **Sync:** Node.js script for global ICS generation
- **PWA:** `vite-plugin-pwa` for offline-first architecture

---

## 📅 3-Year Rolling Window Policy

To maintain a lightning-fast application and a professional user experience, the platform enforces a **Sliding 3-Year Visibility Window**. 

- **Past Year:** For historical reference.
- **Current Year:** Active exam season.
- **Future Year:** For upcoming registrations and early planning.

### ⚡ Performance & Bundle Hygiene
Because this is a static SPA, we must keep the bundle size small. To achieve this, any data older than the "Past Year" window **should be moved** from `src/data/exams/` to a top-level `archive/` directory.

**Automated Cleanup:**
Run `npm run clean` to automatically:
1.  **Archive:** Move files with 100% legacy data to the archive folder.
2.  **Trim:** Remove old dates from active Master files while keeping the future dates intact.

This ensures legacy records are preserved in Git/Archive without slowing down the production site.

---

## 📈 Roadmap

- [ ] Individual exam subscription feeds (`/sync/[exam-id].ics`)
- [ ] Email/Push notification reminders for bookmarked exams
- [ ] Multi-language support (i18n)
- [ ] Community "Verification" badges for data files

---

## 📜 License

This project is licensed under the **MIT License**. We want this data to remain free and open to everyone, forever.

---

### Built with ❤️ for students worldwide.
*Found a bug? [Open an issue](https://github.com/yourusername/global-exam-calendar/issues). Want to chat?*

