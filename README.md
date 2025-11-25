# Budget Tracker Frontend

A modern, responsive budget tracking application built with React, TypeScript, and Tailwind CSS. Track your income and expenses, organize transactions by categories, and visualize your financial data with interactive charts.

![Budget Tracker](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.14-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.1-purple)

## ✨ Features

### 📊 Dashboard

-   Overview of financial statistics (total income, expenses, balance, transaction count)
-   Monthly trend chart showing income vs expenses over time
-   Category breakdown pie chart
-   Date range filtering for custom period analysis

### 💰 Transaction Management

-   Create, edit, and delete transactions
-   Pagination support for large transaction lists
-   Filter transactions by date, amount, type, and category
-   Detailed transaction view with notes
-   Real-time validation with error feedback

### 🏷️ Category Management

-   Predefined system categories (cannot be modified)
-   Custom user categories with full CRUD operations
-   Category types: Income, Expense, or Both
-   Organized display grouped by category type
-   Visual distinction between predefined and custom categories

### 📈 Statistics & Analytics

-   Overall financial statistics
-   Category-wise breakdown
-   Monthly trends and patterns
-   Visual data representation with interactive charts

### 🎨 User Experience

-   **Responsive Design**: Mobile-first approach with hamburger menu
-   **Toast Notifications**: Success/error feedback for all operations
-   **Empty States**: Helpful messages when no data exists
-   **Loading States**: Smooth loading indicators during data fetches
-   **Form Validation**: Real-time validation with Zod schemas
-   **Keyboard Shortcuts**: ESC to close modals
-   **Autofocus**: Automatic focus on form fields
-   **Smooth Transitions**: Polished animations and hover effects

## 🚀 Getting Started

### Prerequisites

-   **Node.js**: v18 or higher
-   **npm**: v9 or higher
-   **Backend API**: The backend server must be running (default: `http://localhost:5001`)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd BudgetTrackerFrontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables**

    Create a `.env` file in the root directory:

    ```env
    VITE_API_BASE_URL=http://localhost:5001/api
    ```

4. **Start the development server**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Technology Stack

### Core

-   **React 18.3.1** - UI library
-   **TypeScript 5.6.2** - Type safety
-   **Vite 6.0.1** - Build tool and dev server

### State Management & Data Fetching

-   **TanStack React Query 5.59.0** - Server state management
-   **Axios 1.7.7** - HTTP client

### Forms & Validation

-   **React Hook Form 7.53.0** - Form management
-   **Zod 3.23.8** - Schema validation
-   **@hookform/resolvers 3.9.1** - Form validation integration

### Styling

-   **Tailwind CSS 3.4.14** - Utility-first CSS framework
-   **Custom CSS** - Smooth transitions and animations

### Routing

-   **React Router DOM 6.27.0** - Client-side routing

### UI Components & Utilities

-   **recharts 2.x** - Data visualization
-   **date-fns 4.1.0** - Date formatting and manipulation
-   **react-toastify** - Toast notifications

## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   ├── api.ts             # Axios instance and interceptors
│   ├── transactionService.ts
│   ├── categoryService.ts
│   └── statisticsService.ts
│
├── components/            # Reusable UI components
│   ├── Layout.tsx         # App shell with navigation
│   ├── TransactionList.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionModal.tsx
│   ├── CategoryList.tsx
│   ├── CategoryForm.tsx
│   ├── CategoryModal.tsx
│   ├── EmptyState.tsx     # Empty state component
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   ├── ConfirmDialog.tsx
│   ├── StatCard.tsx
│   └── Charts/
│       ├── MonthlyTrendChart.tsx
│       └── CategoryBreakdownChart.tsx
│
├── hooks/                 # Custom React hooks
│   ├── useTransactions.ts # Transaction CRUD operations
│   ├── useCategories.ts   # Category CRUD operations
│   └── useStatistics.ts   # Statistics queries
│
├── pages/                 # Page components
│   ├── DashboardPage.tsx  # Main dashboard
│   ├── Transactions.tsx   # Transaction management
│   ├── CategoriesPage.tsx # Category management
│   └── Statistics.tsx     # Statistics page
│
├── types/                 # TypeScript types and schemas
│   ├── types.ts          # Core type definitions
│   ├── validation.ts     # Zod validation schemas
│   ├── helpers.ts        # Type helper functions
│   └── index.ts          # Type exports
│
├── utils/                 # Utility functions
│   ├── formatters.ts     # Currency, date, color formatters
│   ├── validators.ts     # Validation helpers
│   ├── date.ts           # Date utilities
│   └── format.ts         # Format utilities
│
├── App.tsx               # Root component with routing
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind config
```

## 🔌 API Integration

The application communicates with a backend API. Ensure the backend is running before starting the frontend.

### API Base URL

Default: `http://localhost:5001/api`

Configure via environment variable:

```env
VITE_API_BASE_URL=your_api_url
```

### API Endpoints Used

#### Transactions

-   `GET /transactions?pageNumber={n}&pageSize={s}` - Get paginated transactions
-   `GET /transactions/{id}` - Get single transaction
-   `POST /transactions` - Create transaction
-   `PUT /transactions/{id}` - Update transaction
-   `DELETE /transactions/{id}` - Delete transaction

#### Categories

-   `GET /categories` - Get all categories
-   `GET /categories/{id}` - Get single category
-   `POST /categories` - Create category
-   `PUT /categories/{id}` - Update category
-   `DELETE /categories/{id}` - Delete category

#### Statistics

-   `GET /statistics/overall?startDate={date}&endDate={date}` - Overall statistics
-   `GET /statistics/by-category?startDate={date}&endDate={date}` - Category breakdown
-   `GET /statistics/monthly?startDate={date}&endDate={date}` - Monthly trends

## 🎯 Key Features in Detail

### Toast Notifications

-   Success messages for create/update/delete operations
-   Error messages with detailed feedback
-   Auto-dismiss after 3 seconds
-   Positioned at top-right corner

### Form Validation

-   Real-time validation using Zod schemas
-   Field-level error messages
-   Cannot create transactions with future dates
-   Amount validation (positive numbers, max 999,999,999.99)
-   Description length limits (1-200 characters)
-   Notes optional with max 500 characters

### Empty States

-   Friendly messages when no data exists
-   Icon illustrations for visual appeal
-   Optional action buttons to create first item
-   Used in transaction and category lists

### Responsive Design

-   Mobile-first approach
-   Breakpoints: sm (640px), md (768px), lg (1024px)
-   Hamburger menu for mobile navigation
-   Touch-friendly button sizes (minimum 44px)
-   Stacked layouts on mobile, side-by-side on desktop

### Loading States

-   Spinner indicators during data fetches
-   Disabled buttons during form submissions
-   Loading text feedback ("Saving...", "Loading...")

## 🧪 Testing the Application

### Complete User Flow

1. **Setup Backend**

    - Ensure backend API is running on `http://localhost:5001`
    - Verify API endpoints are accessible

2. **Create Categories**

    - Navigate to Categories page
    - Click "New Category" button
    - Create categories for both income and expenses
    - Examples: Salary (Income), Groceries (Expense), Utilities (Expense)

3. **Create Transactions**

    - Navigate to Transactions page
    - Click "New Transaction" button
    - Fill in transaction details:
        - Date: Select transaction date
        - Description: Enter description
        - Amount: Enter amount
        - Type: Select Income or Expense
        - Category: Choose from available categories
        - Notes: Optional additional information
    - Submit the form
    - Verify success toast notification

4. **View Statistics**

    - Navigate to Dashboard
    - View overview cards (Income, Expenses, Balance, Transaction Count)
    - Check monthly trend chart
    - Review category breakdown pie chart
    - Apply date filters to analyze specific periods

5. **Edit/Delete**
    - Edit existing transactions or categories
    - Delete items with confirmation dialogs
    - Verify changes reflect immediately
    - Check toast notifications

## 📝 Environment Variables

| Variable            | Description          | Default                     |
| ------------------- | -------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5001/api` |

## 🎨 Customization

### Styling

-   Tailwind CSS classes can be modified in components
-   Global styles in `src/index.css`
-   Custom utilities defined in `@layer utilities`
-   Theme colors can be configured in `tailwind.config.js`

### API Configuration

-   Modify API base URL in `.env` file
-   Adjust timeout and retry settings in `src/api/api.ts`
-   Add custom interceptors for authentication if needed

## 🐛 Troubleshooting

### Backend Connection Issues

-   Verify backend is running on correct port
-   Check `VITE_API_BASE_URL` environment variable
-   Review browser console for CORS errors
-   Ensure backend allows requests from frontend origin

### Build Issues

-   Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
-   Clear Vite cache: `rm -rf node_modules/.vite`
-   Verify Node.js version: `node --version` (should be v18+)

### TypeScript Errors

-   Run type check: `npm run type-check` (if script exists)
-   Check for missing dependencies
-   Verify all imports are correct

## 🚢 Deployment

### Vercel / Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` directory
3. Set environment variable `VITE_API_BASE_URL` to production API URL

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
EXPOSE 3000
```

Build and run:

```bash
docker build -t budget-tracker-frontend .
docker run -p 3000:3000 -e VITE_API_BASE_URL=your_api_url budget-tracker-frontend
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

-   React team for the amazing library
-   Tailwind CSS for the utility-first CSS framework
-   TanStack team for React Query
-   All open-source contributors

## 📞 Support

For issues and questions:

-   Open an issue on GitHub
-   Check existing documentation
-   Review API integration guide

---

**Built with ❤️ using React + TypeScript + Vite**
