# Budget Tracker Frontend

A modern Budget Tracker application built with React, TypeScript, and Vite.

## Features

-   📊 Dashboard with overview of transactions, categories, and statistics
-   💰 Transaction recording (income and expenses)
-   🏷️ Category organization
-   📈 Statistics and reports with budget tracking
-   🎨 Modern UI with Tailwind CSS
-   🔄 State management with React Query
-   ✅ Form validation with React Hook Form and Zod
-   📅 Date handling with date-fns

## Tech Stack

-   **Framework**: React 18
-   **Language**: TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Routing**: React Router DOM
-   **State Management**: TanStack React Query
-   **Forms**: React Hook Form
-   **Validation**: Zod
-   **HTTP Client**: Axios
-   **Date Utilities**: date-fns

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── api/              # API service layer
│   ├── api.ts
│   ├── budgetService.ts
│   ├── transactionService.ts
│   └── categoryService.ts
├── components/       # Reusable UI components
│   └── Navbar.tsx
├── pages/            # Page components
│   ├── Dashboard.tsx
│   ├── Transactions.tsx
│   ├── Categories.tsx
│   └── Statistics.tsx
├── hooks/            # Custom React hooks
│   ├── useBudgets.ts
│   ├── useTransactions.ts
│   └── useCategories.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   ├── format.ts
│   └── date.ts
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## API Integration

The application expects a backend API running at the URL specified in `VITE_API_BASE_URL`. The API should support the following endpoints:

-   `GET /api/budgets` - Get all budgets
-   `POST /api/budgets` - Create a budget
-   `PUT /api/budgets/:id` - Update a budget
-   `DELETE /api/budgets/:id` - Delete a budget
-   `GET /api/transactions` - Get all transactions
-   `POST /api/transactions` - Create a transaction
-   `PUT /api/transactions/:id` - Update a transaction
-   `DELETE /api/transactions/:id` - Delete a transaction
-   `GET /api/categories` - Get all categories
-   `POST /api/categories` - Create a category
-   `PUT /api/categories/:id` - Update a category
-   `DELETE /api/categories/:id` - Delete a category

## License

MIT
