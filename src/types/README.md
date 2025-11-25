# TypeScript Types Reference

This folder contains all TypeScript type definitions, validation schemas, and helper functions for the Budget Tracker application.

## Files

### `types.ts`

Core type definitions matching the backend API DTOs:

**Enums:**

-   `TransactionType` - Income (0) or Expense (1)
-   `CategoryType` - Income (0), Expense (1), or Both (2)

**Transaction Types:**

-   `TransactionDto` - Full transaction object from API
-   `CreateTransactionDto` - For creating new transactions
-   `UpdateTransactionDto` - For updating existing transactions

**Category Types:**

-   `CategoryDto` - Full category object from API
-   `CreateCategoryDto` - For creating new categories
-   `UpdateCategoryDto` - For updating existing categories

**Statistics Types:**

-   `StatisticsDto` - Overall statistics
-   `CategoryStatisticsDto` - Per-category statistics
-   `MonthlyStatisticsDto` - Monthly breakdown

**Utility Types:**

-   `PaginatedResponse<T>` - Generic paginated API response
-   `ApiError` - Error response structure

### `validation.ts`

Zod validation schemas for form validation:

**Schemas:**

-   `createTransactionSchema` - Validates new transaction forms
-   `updateTransactionSchema` - Validates transaction edit forms
-   `createCategorySchema` - Validates new category forms
-   `updateCategorySchema` - Validates category edit forms

**Form Types:**

-   `CreateTransactionFormData` - Inferred from createTransactionSchema
-   `UpdateTransactionFormData` - Inferred from updateTransactionSchema
-   `CreateCategoryFormData` - Inferred from createCategorySchema
-   `UpdateCategoryFormData` - Inferred from updateCategorySchema

### `helpers.ts`

Helper functions and type guards:

**Type Guards:**

-   `isApiError(error)` - Check if error is an ApiError

**Transaction Helpers:**

-   `getTransactionTypeLabel(type)` - Get display label
-   `getTransactionTypeColor(type)` - Get Tailwind text color class
-   `getTransactionTypeBadgeColor(type)` - Get Tailwind badge color classes
-   `formatAmountWithSign(amount, type)` - Format amount with +/- sign

**Category Helpers:**

-   `getCategoryTypeLabel(type)` - Get display label
-   `getCategoryTypeColor(type)` - Get Tailwind text color class
-   `getCategoryTypeBadgeColor(type)` - Get Tailwind badge color classes

### `index.ts`

Re-exports all types for convenient imports.

## Usage Examples

### Using Types in Components

```typescript
import { TransactionDto, TransactionType, CategoryDto } from "@/types";

function TransactionList({ transactions }: { transactions: TransactionDto[] }) {
    // TypeScript knows the exact shape of transactions
}
```

### Using Validation Schemas with React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransactionSchema, CreateTransactionFormData, TransactionType } from "@/types";

function TransactionForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTransactionFormData>({
        resolver: zodResolver(createTransactionSchema),
        defaultValues: {
            type: TransactionType.Expense,
            amount: 0,
            description: "",
            date: new Date().toISOString().split("T")[0],
        },
    });

    const onSubmit = (data: CreateTransactionFormData) => {
        // Data is validated and typed
        console.log(data);
    };

    return <form onSubmit={handleSubmit(onSubmit)}>{/* form fields */}</form>;
}
```

### Using Helper Functions

```typescript
import { TransactionType, getTransactionTypeLabel, getTransactionTypeBadgeColor, formatAmountWithSign } from "@/types";

function TransactionItem({ transaction }) {
    const label = getTransactionTypeLabel(transaction.type);
    const badgeColor = getTransactionTypeBadgeColor(transaction.type);
    const amount = formatAmountWithSign(transaction.amount, transaction.type);

    return (
        <div>
            <span className={badgeColor}>{label}</span>
            <span>{amount}</span>
        </div>
    );
}
```

### Using with API Responses

```typescript
import { PaginatedResponse, TransactionDto } from "@/types";

async function getTransactions(page: number): Promise<PaginatedResponse<TransactionDto>> {
    const response = await api.get(`/transactions?page=${page}`);
    return response.data;
}

// Usage
const result = await getTransactions(1);
console.log(result.data); // TransactionDto[]
console.log(result.totalPages);
console.log(result.hasNext);
```

### Error Handling

```typescript
import { isApiError } from "@/types";

try {
    await createTransaction(data);
} catch (error) {
    if (isApiError(error)) {
        console.error(error.message);
        console.error(error.errors);
    }
}
```

## Enum Values

### TransactionType

-   `TransactionType.Income` = 0
-   `TransactionType.Expense` = 1

### CategoryType

-   `CategoryType.Income` = 0
-   `CategoryType.Expense` = 1
-   `CategoryType.Both` = 2

## Validation Rules

### Transactions

-   **description**: 1-200 characters, required
-   **amount**: Positive number, max 999,999,999.99
-   **date**: Required string (ISO format)
-   **type**: Must be valid TransactionType enum value
-   **categoryId**: Positive integer, required
-   **notes**: Optional, max 500 characters

### Categories

-   **name**: 1-50 characters, alphanumeric + spaces/hyphens/underscores only
-   **type**: Must be valid CategoryType enum value
