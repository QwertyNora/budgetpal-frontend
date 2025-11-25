# Utility Functions

This directory contains reusable utility functions for the Budget Tracker application.

## Files

### `formatters.ts`

Comprehensive formatting utilities for consistent data display throughout the application.

**Functions:**

-   `formatCurrency(amount)` - Format numbers as USD currency with proper separators
-   `formatDate(dateString)` - Format ISO date strings to readable format (e.g., "Nov 25, 2025")
-   `formatDateTime(dateString)` - Format ISO date strings with time
-   `getMonthName(month)` - Convert month number (1-12) to full name
-   `getShortMonthName(month)` - Convert month number to abbreviated name
-   `getTransactionColor(type)` - Get Tailwind color class for transaction type
-   `getTransactionBadgeColor(type)` - Get badge colors for transaction type
-   `getTransactionTypeLabel(type)` - Get human-readable transaction type label
-   `getCategoryTypeColor(type)` - Get Tailwind color class for category type
-   `getCategoryTypeBadgeColor(type)` - Get badge colors for category type
-   `getCategoryTypeLabel(type)` - Get human-readable category type label
-   `formatAmountWithSign(amount, type)` - Format amount with +/- sign based on type
-   `calculatePercentage(value, total)` - Calculate percentage rounded to nearest integer
-   `formatPercentage(value, decimals)` - Format decimal as percentage string
-   `truncateText(text, maxLength)` - Truncate text with ellipsis
-   `formatNumber(num)` - Format number with thousands separator

### `validators.ts`

Zod validation schemas matching backend API validation rules exactly.

**Schemas:**

-   `transactionSchema` - Validation for transaction creation/update

    -   Date: required, cannot be in future
    -   Description: 1-200 characters
    -   Amount: positive, max 999,999,999.99
    -   Type: valid TransactionType enum
    -   CategoryId: positive integer
    -   Notes: optional, max 500 characters

-   `categorySchema` - Validation for category creation/update

    -   Name: 1-100 characters, alphanumeric + spaces/hyphens/underscores
    -   Type: valid CategoryType enum

-   `dateRangeSchema` - Validation for date range filters
    -   Start date must be before or equal to end date

**Helper Functions:**

-   `isValidDate(dateString)` - Check if string is valid date
-   `isDateInFuture(dateString)` - Check if date is in the future
-   `isValidAmount(amount)` - Check if amount is within valid range
-   `isValidLength(str, min, max)` - Check string length validity

### `date.ts`

Date manipulation utilities using date-fns library.

**Functions:**

-   `formatDate(date)` - Format date object or string
-   `formatDateTime(date)` - Format with time
-   `getCurrentMonthRange()` - Get start/end of current month
-   `isDateInRange(date, start, end)` - Check if date is within range

### `format.ts`

Legacy formatting utilities (kept for backward compatibility).

**Functions:**

-   `formatCurrency(amount)` - Format as USD currency
-   `calculatePercentage(spent, total)` - Calculate percentage

### `index.ts`

Central export file for all utilities. Import from this file for convenience:

```typescript
import { formatCurrency, formatDate, transactionSchema } from "@/utils";
```

## Usage Examples

### Formatting

```typescript
import { formatCurrency, formatDate, getTransactionColor } from "@/utils/formatters";

const amount = 1234.56;
console.log(formatCurrency(amount)); // "$1,234.56"

const date = "2025-11-25T10:00:00Z";
console.log(formatDate(date)); // "Nov 25, 2025"

const color = getTransactionColor(TransactionType.Income);
console.log(color); // "text-green-600"
```

### Validation

```typescript
import { transactionSchema } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
        date: "",
        description: "",
        amount: 0,
        type: TransactionType.Expense,
        categoryId: 0,
        notes: "",
    },
});
```

## Best Practices

1. **Import from index.ts** - Use the central export file for cleaner imports
2. **Type safety** - All functions have proper TypeScript types
3. **Error handling** - Formatters handle invalid input gracefully
4. **Consistency** - Use these utilities throughout the app for consistent formatting
5. **Backend alignment** - Validation schemas match backend rules exactly

## Notes

-   All currency formatting uses USD locale
-   Date formatting uses "en-US" locale conventions
-   Validation rules match the backend API exactly to prevent submission errors
-   Color utilities return Tailwind CSS classes
