import { useState } from "react";
import { useCategories, useDeleteCategory } from "../hooks/useCategories";
import CategoryList from "../components/CategoryList";
import CategoryModal from "../components/CategoryModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ConfirmDialog from "../components/ConfirmDialog";
import { CategoryDto } from "../types/types";

export default function CategoriesPage() {
    const [showModal, setShowModal] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<CategoryDto | undefined>(undefined);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<CategoryDto | null>(null);

    const { data: categories, isLoading, error, refetch } = useCategories();
    const deleteMutation = useDeleteCategory();

    const handleNewCategory = () => {
        setCategoryToEdit(undefined);
        setShowModal(true);
    };

    const handleEdit = (category: CategoryDto) => {
        if (!category.isCustom) {
            return; // Should not happen due to UI, but extra safety
        }
        setCategoryToEdit(category);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCategoryToEdit(undefined);
    };

    const handleDeleteClick = (id: number) => {
        const category = categories?.find(cat => cat.id === id);
        if (!category) return;

        if (!category.isCustom) {
            return; // Should not happen due to UI, but extra safety
        }

        setCategoryToDelete(category);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (categoryToDelete) {
            try {
                await deleteMutation.mutateAsync(categoryToDelete.id);
                setShowDeleteConfirm(false);
                setCategoryToDelete(null);
            } catch (error) {
                // Error will be shown in the delete confirmation dialog
                console.error("Failed to delete category:", error);
            }
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
        setCategoryToDelete(null);
        // Clear any previous error
        deleteMutation.reset();
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <LoadingSpinner size="lg" message="Loading categories..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorMessage error={error} title="Error loading categories" onRetry={() => refetch()} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 sm:py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your transaction categories</p>
                </div>
                <button
                    onClick={handleNewCategory}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base touch-target w-full sm:w-auto"
                >
                    + New Category
                </button>
            </div>

            {/* Info Banner */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <svg
                        className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div className="text-sm text-blue-800">
                        <strong>Note:</strong> Predefined categories cannot be edited or deleted. You can only modify
                        custom categories you've created.
                    </div>
                </div>
            </div>

            {/* Category Count */}
            {categories && categories.length > 0 && (
                <div className="mb-4 text-sm text-gray-600">
                    Total: {categories.length} categories ({categories.filter(c => c.isCustom).length} custom,{" "}
                    {categories.filter(c => !c.isCustom).length} predefined)
                </div>
            )}

            {/* Category List */}
            {categories && <CategoryList categories={categories} onEdit={handleEdit} onDelete={handleDeleteClick} />}

            {/* Category Modal */}
            <CategoryModal isOpen={showModal} onClose={handleModalClose} category={categoryToEdit} />

            {/* Delete Confirmation Dialog */}
            {categoryToDelete && (
                <ConfirmDialog
                    isOpen={showDeleteConfirm}
                    title="Confirm Delete"
                    message={`Are you sure you want to delete the category "${categoryToDelete.name}"? If this category has associated transactions, the deletion will fail. Please reassign or delete those transactions first.`}
                    confirmLabel="Delete"
                    cancelLabel="Cancel"
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                    isLoading={deleteMutation.isPending}
                    variant="danger"
                />
            )}
        </div>
    );
}
