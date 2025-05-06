# Coaching Management System (CMS)

A modern web application for managing coaching relationships between entrepreneurs and business coaches. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Multi-Role Support**
  - Manager: Oversee all coaching relationships and sessions
  - Coach: Manage sessions and track client progress
  - Entrepreneur: View sessions and track personal goals

- **Session Management**
  - Schedule and track coaching sessions
  - Real-time session status updates
  - Detailed session notes and history

- **Goal Tracking**
  - Set and monitor business goals
  - Track progress with visual indicators
  - Collaborative goal management

- **Payment Processing**
  - Generate and manage invoices
  - Multi-currency support (MAD, EUR, USD)
  - Payment status tracking

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- React Hook Form
- Zustand (State Management)
- Lucide React (Icons)
- React Hot Toast (Notifications)
- Date-fns (Date Utilities)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coaching-management-system.git
cd coaching-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Accounts

The system comes with pre-configured demo accounts for testing:

- **Manager**
  - Email: manager@example.com
  - Password: password123

- **Coach**
  - Email: coach@example.com
  - Password: password123

- **Entrepreneur**
  - Email: entrepreneur@example.com
  - Password: password123

## Project Structure

```
src/
├── components/        # Reusable UI components
├── config/           # Configuration files
├── hooks/            # Custom React hooks
├── layouts/          # Page layouts
├── pages/            # Page components
├── services/         # API and service functions
└── types/            # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

