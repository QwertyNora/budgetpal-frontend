import { useState } from 'react';
import { useCategories, useDeleteCategory } from '../hooks/useCategories';
import CategoryList from '../components/CategoryList';
import CategoryModal from '../components/CategoryModal';
import { CategoryDto } from '../types/types';
import { isApiError } from '../types/helpers';

export default function CategoriesPage() {
    const [showModal, setShowModal] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<CategoryDto | undefined>(undefined);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<CategoryDto | null>(null);

    const { data: categories, isLoading, error } = useCategories();
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
                console.error('Failed to delete category:', error);
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
                <div className="flex justify-center items-center h-64">
                    <div className="text-xl text-gray-600">Loading categories...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-red-800 font-semibold mb-2">Error loading categories</h3>
                    <p className="text-red-600">{isApiError(error) ? error.message : 'An unexpected error occurred'}</p>
                    {isApiError(error) && error.errors.length > 0 && (
                        <ul className="mt-2 list-disc list-inside text-red-600">
                            {error.errors.map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-600 mt-1">Manage your transaction categories</p>
                </div>
                <button
                    onClick={handleNewCategory}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    + New Category
                </button>
            </div>

            {/* Info Banner */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-blue-800">
                        <strong>Note:</strong> Predefined categories cannot be edited or deleted. You can only modify custom categories you've created.
                    </div>
                </div>
            </div>

            {/* Category Count */}
            {categories && categories.length > 0 && (
                <div className="mb-4 text-sm text-gray-600">
                    Total: {categories.length} categories ({categories.filter(c => c.isCustom).length} custom, {categories.filter(c => !c.isCustom).length} predefined)
                </div>
            )}

            {/* Category List */}
            {categories && <CategoryList categories={categories} onEdit={handleEdit} onDelete={handleDeleteClick} />}

            {/* Category Modal */}
            <CategoryModal isOpen={showModal} onClose={handleModalClose} category={categoryToEdit} />

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && categoryToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
                        <p className="text-gray-600 mb-2">
                            Are you sure you want to delete the category <strong>"{categoryToDelete.name}"</strong>?
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                            <div className="flex items-start">
                                <svg className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-amber-800">
                                    <strong>Warning:</strong> If this category has associated transactions, the deletion will fail. Please reassign or delete those transactions first.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleDeleteCancel}
                                disabled={deleteMutation.isPending}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={deleteMutation.isPending}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50"
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                        
                        {deleteMutation.isError && (
                            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-red-800 text-sm font-medium mb-1">Failed to delete category</p>
                                <p className="text-red-600 text-sm">
                                    {isApiError(deleteMutation.error)
                                        ? deleteMutation.error.message
                                        : 'An unexpected error occurred'}
                                </p>
                                {isApiError(deleteMutation.error) && deleteMutation.error.errors.length > 0 && (
                                    <ul className="mt-2 list-disc list-inside text-red-600 text-sm">
                                        {deleteMutation.error.errors.map((err, idx) => (
                                            <li key={idx}>{err}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
