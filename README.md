# Babysitter Finder ![Status badge](https://img.shields.io/badge/status-in%20progress-yellow)

Babysitter Finder (Hi Sitter) is a platform that connects families with trusted babysitters.

## Tech Stack

- **Next.js 16.1.1** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Zustand** - State management
- **Leaflet** - Maps
- **Axios** - HTTP client

## Requirements

- Node.js 18+ (recommended)
- npm 9+

## Installation

1. Clone this project
```bash
git clone https://github.com/babysitter-finder/frontend.git
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
# Edit .env.local with your API URL
```

4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Public pages (login, register)
│   └── (protected)/        # Auth-required pages
├── components/             # React components
│   ├── ui/                 # Base components
│   ├── forms/              # Form components
│   └── organisms/          # Complex components
├── stores/                 # Zustand state stores
├── lib/                    # Utilities and API
└── types/                  # TypeScript types
```

## Backend

- **[API Babysitter Finder](https://github.com/babysitter-finder/backend)**

## Contributors

- **[Abdiel Ortega](https://github.com/abdielDev)** - Frontend Developer
- **[Angel Estrada](https://github.com/ricardoares1989)** - Interface Designer

## License

MIT License

## Design

- [Figma Design](https://www.figma.com/file/SJbT26D4huBkATw97d8heG/finder)
- [Notion Documentation](https://www.notion.so/Kanban-f4ed2788eaf8473a912444755a0d1d02)

## Acknowledgments

- Coach Ana Belisa Martinez
- [Platzi](https://platzi.com/) Staff
