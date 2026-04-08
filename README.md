# Global Exam Calendar

An open-source, community-driven platform to index every exam in the world with their important dates. Built with React 19, Vite 6, and modern web standards.

## Features

- **Calendar View** — Monthly grid with color-coded event pills
- **List View** — Events grouped by date with detailed exam cards
- **Timeline View** — Vertical animated timeline
- **Advanced Filtering** — By country, category, event type, frequency, and date range
- **Real-time Search** — Search by exam name, abbreviation, or tags
- **My Planner** — Bookmark exams and persist selections in localStorage
- **ICS Export** — Export filtered events to Apple/Google Calendar
- **Fully Responsive** — Works on desktop, tablet, and mobile
- **Exam Detail Modal** — View all dates, eligibility, official links, and more

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 6](https://vite.dev) | Build tool & dev server |
| [Lucide React](https://lucide.dev) | Icon library |
| Vanilla CSS | Styling with CSS custom properties |
| React Context | State management |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/yourusername/global-exam-calendar.git
cd global-exam-calendar
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── calendar/         # Calendar grid view
│   ├── common/           # Modal, badges, shared UI
│   ├── layout/           # Header, Sidebar
│   ├── list/             # List view
│   └── timeline/         # Timeline view
├── constants/            # Color maps, labels, enums
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── pages/                # Page-level components
├── utils/                # Pure utility functions
├── App.jsx               # Root component
├── main.jsx              # Entry point
└── index.css             # Design system & tokens
public/
└── data/
    └── exams.json        # Exam data (open format)
```

## Contributing

We welcome contributions! To add an exam:

1. Fork the repository
2. Edit `public/data/exams.json`
3. Follow the existing JSON schema
4. Submit a pull request

### Exam Data Schema

```json
{
  "id": "unique-exam-id",
  "name": "Full Exam Name",
  "short_name": "ABBREV",
  "country": "Country Name",
  "country_code": "CC",
  "region": "Region",
  "category": "entrance|competitive|language|professional|academic",
  "conducting_body": "Organization Name",
  "frequency": "annual|biannual|monthly|quarterly",
  "official_url": "https://example.com",
  "tags": ["tag1", "tag2"],
  "eligibility": "Eligibility requirements",
  "dates": [
    {
      "type": "registration_start|registration_end|admit_card|exam_date|result|counselling",
      "date": "YYYY-MM-DD",
      "label": "Human-readable label",
      "tentative": false
    }
  ]
}
```

## License

MIT License. See [LICENSE](LICENSE) for details.
