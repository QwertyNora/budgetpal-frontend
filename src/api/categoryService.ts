import { api } from "./api";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto, ApiError } from "../types/types";
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

export const categoryService = {
    /**
     * GET /api/categories
     * @returns List of all categories
     */
    getAll: async (): Promise<CategoryDto[]> => {
        try {
            const response = await api.get("/categories");
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * GET /api/categories/{id}
     * @param id - Category ID
     * @returns Single category
     */
    getById: async (id: number): Promise<CategoryDto> => {
        try {
            const response = await api.get(`/categories/${id}`);
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * POST /api/categories
     * @param data - Category data to create
     * @returns Created category
     */
    create: async (data: CreateCategoryDto): Promise<CategoryDto> => {
        try {
            const response = await api.post("/categories", data);
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * PUT /api/categories/{id}
     * @param id - Category ID to update
     * @param data - Updated category data
     * @returns Updated category
     */
    update: async (id: number, data: UpdateCategoryDto): Promise<CategoryDto> => {
        try {
            const response = await api.put(`/categories/${id}`, data);
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * DELETE /api/categories/{id}
     * @param id - Category ID to delete
     * @returns void
     */
    delete: async (id: number): Promise<void> => {
        try {
            await api.delete(`/categories/${id}`);
        } catch (error) {
            return handleApiError(error);
        }
    },
};
