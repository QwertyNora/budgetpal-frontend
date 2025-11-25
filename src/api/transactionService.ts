import { api } from "./api";
import {
    TransactionDto,
    CreateTransactionDto,
    UpdateTransactionDto,
    PaginatedResponse,
    ApiError,
} from "../types/types";
import { AxiosError } from "axios";

// Error handler to extract ApiError format from response
const handleApiError = (error: unknown): never => {
    if (error instanceof AxiosError && error.response) {
        const apiError: ApiError = {
            status: error.response.status,
            message: error.response.data?.message || error.message,
            errors: error.response.data?.errors || [],
        };
        throw apiError;
    }

    // Handle non-Axios errors
    const genericError: ApiError = {
        status: 500,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
        errors: [],
    };
    throw genericError;
};

export const transactionService = {
    /**
     * GET /api/transactions with pagination
     * @param pageNumber - Page number (default: 1)
     * @param pageSize - Items per page (default: 20)
     * @returns Paginated list of transactions
     */
    getAll: async (pageNumber: number = 1, pageSize: number = 20): Promise<PaginatedResponse<TransactionDto>> => {
        try {
            const response = await api.get("/transactions", {
                params: { pageNumber, pageSize },
            });
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * GET /api/transactions/{id}
     * @param id - Transaction ID
     * @returns Single transaction
     */
    getById: async (id: number): Promise<TransactionDto> => {
        try {
            const response = await api.get(`/transactions/${id}`);
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * POST /api/transactions
     * @param data - Transaction data to create
     * @returns Created transaction
     */
    create: async (data: CreateTransactionDto): Promise<TransactionDto> => {
        try {
            const response = await api.post("/transactions", data);
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * PUT /api/transactions/{id}
     * @param id - Transaction ID to update
     * @param data - Updated transaction data
     * @returns Updated transaction
     */
    update: async (id: number, data: UpdateTransactionDto): Promise<TransactionDto> => {
        try {
            const response = await api.put(`/transactions/${id}`, data);
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * DELETE /api/transactions/{id}
     * @param id - Transaction ID to delete
     * @returns void
     */
    delete: async (id: number): Promise<void> => {
        try {
            await api.delete(`/transactions/${id}`);
        } catch (error) {
            return handleApiError(error);
        }
    },
};
