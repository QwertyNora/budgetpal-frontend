# Transaction Service Documentation

## Overview

The `transactionService` provides a complete API client for managing transactions with proper error handling and TypeScript type safety.

## Features

-   ✅ Full CRUD operations (Create, Read, Update, Delete)
-   ✅ Pagination support
-   ✅ Type-safe with TypeScript
-   ✅ Structured error handling with `ApiError` format
-   ✅ Automatic error extraction from API responses
-   ✅ JSDoc documentation for all methods

## API Methods

### `getAll(pageNumber?, pageSize?)`

Fetch a paginated list of transactions.

**Parameters:**

-   `pageNumber` (optional): Page number, default: 1
-   `pageSize` (optional): Items per page, default: 20

**Returns:** `Promise<PaginatedResponse<TransactionDto>>`

**Example:**

```typescript
import { transactionService } from "@/api/transactionService";

// Get first page with default page size (20)
const transactions = await transactionService.getAll();

// Get specific page with custom page size
const transactions = await transactionService.getAll(2, 50);
```

### `getById(id)`

Fetch a single transaction by ID.

**Parameters:**

-   `id`: Transaction ID (number)

**Returns:** `Promise<TransactionDto>`

**Example:**

```typescript
const transaction = await transactionService.getById(123);
console.log(transaction.description);
```

### `create(data)`

Create a new transaction.

**Parameters:**

-   `data`: `CreateTransactionDto` object

**Returns:** `Promise<TransactionDto>`

**Example:**

```typescript
import { TransactionType } from "@/types";

const newTransaction = await transactionService.create({
    date: "2025-11-25",
    description: "Grocery shopping",
    amount: 75.5,
    type: TransactionType.Expense,
    categoryId: 5,
    notes: "Weekly groceries",
});
```

### `update(id, data)`

Update an existing transaction.

**Parameters:**

-   `id`: Transaction ID (number)
-   `data`: `UpdateTransactionDto` object

**Returns:** `Promise<TransactionDto>`

**Example:**

```typescript
const updated = await transactionService.update(123, {
    date: "2025-11-25",
    description: "Updated description",
    amount: 80.0,
    type: TransactionType.Expense,
    categoryId: 5,
    notes: "Updated notes",
});
```

### `delete(id)`

Delete a transaction.

**Parameters:**

-   `id`: Transaction ID (number)

**Returns:** `Promise<void>`

**Example:**

```typescript
await transactionService.delete(123);
```

## Error Handling

All methods include automatic error handling that extracts the `ApiError` format from API responses.

### Error Format

```typescript
interface ApiError {
    status: number; // HTTP status code
    message: string; // Error message
    errors: string[]; // Array of validation errors
}
```

### Handling Errors

```typescript
import { isApiError } from "@/types";

try {
    const transaction = await transactionService.create(data);
} catch (error) {
    if (isApiError(error)) {
        console.error(`Error ${error.status}: ${error.message}`);

        // Display validation errors
        error.errors.forEach(err => console.error(err));
    }
}
```

## Using with React Query Hooks

The service is designed to work seamlessly with React Query hooks:

```typescript
import { useTransactions, useCreateTransaction } from "@/hooks/useTransactions";

function TransactionList() {
    // Fetch paginated transactions
    const { data, isLoading, error } = useTransactions(1, 20);

    if (isLoading) return <div>Loading...</div>;

    if (error) {
        if (isApiError(error)) {
            return <div>Error: {error.message}</div>;
        }
    }

    return (
        <div>
            <p>Total: {data.totalCount}</p>
            <p>
                Page {data.pageNumber} of {data.totalPages}
            </p>

            {data.data.map(transaction => (
                <div key={transaction.id}>
                    {transaction.description} - ${transaction.amount}
                </div>
            ))}

            {data.hasNext && <button>Next Page</button>}
            {data.hasPrevious && <button>Previous Page</button>}
        </div>
    );
}

function CreateTransactionForm() {
    const createMutation = useCreateTransaction();

    const handleSubmit = async (formData: CreateTransactionDto) => {
        try {
            await createMutation.mutateAsync(formData);
            alert("Transaction created!");
        } catch (error) {
            if (isApiError(error)) {
                alert(`Error: ${error.message}`);
            }
        }
    };

    return <form onSubmit={handleSubmit}>...</form>;
}
```

## TypeScript Types

### Import Types

```typescript
import {
    TransactionDto,
    CreateTransactionDto,
    UpdateTransactionDto,
    PaginatedResponse,
    TransactionType,
} from "@/types";
```

### Type Definitions

**TransactionDto:**

```typescript
interface TransactionDto {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
    categoryName: string;
    notes?: string;
    createdAt: string;
    updatedAt?: string;
}
```

**CreateTransactionDto:**

```typescript
interface CreateTransactionDto {
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
    notes?: string;
}
```

**UpdateTransactionDto:**

```typescript
interface UpdateTransactionDto {
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
    notes?: string;
}
```

## Complete Example

```typescript
import { transactionService } from "@/api/transactionService";
import { TransactionType, isApiError } from "@/types";

async function manageTransactions() {
    try {
        // Create a transaction
        const newTransaction = await transactionService.create({
            date: new Date().toISOString().split("T")[0],
            description: "Coffee",
            amount: 5.5,
            type: TransactionType.Expense,
            categoryId: 10,
            notes: "Morning coffee",
        });

        console.log("Created:", newTransaction.id);

        // Get all transactions (first page)
        const page1 = await transactionService.getAll(1, 10);
        console.log(`Found ${page1.totalCount} transactions`);

        // Update the transaction
        const updated = await transactionService.update(newTransaction.id, {
            ...newTransaction,
            amount: 6.0,
            description: "Coffee (updated)",
        });

        console.log("Updated:", updated.description);

        // Get specific transaction
        const fetched = await transactionService.getById(newTransaction.id);
        console.log("Fetched:", fetched);

        // Delete transaction
        await transactionService.delete(newTransaction.id);
        console.log("Deleted successfully");
    } catch (error) {
        if (isApiError(error)) {
            console.error(`API Error ${error.status}: ${error.message}`);
            error.errors.forEach(err => console.error("  -", err));
        } else {
            console.error("Unexpected error:", error);
        }
    }
}
```

## Notes

-   All dates should be in ISO format (YYYY-MM-DD)
-   The service uses the base API URL from environment variables (`VITE_API_BASE_URL`)
-   Authentication tokens are automatically added via Axios interceptors
-   All amounts should be positive numbers
-   Transaction IDs are numeric (not strings)
