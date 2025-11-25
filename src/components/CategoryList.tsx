import { CategoryDto, CategoryType } from '../types/types';

interface CategoryListProps {
    categories: CategoryDto[];
    onEdit: (category: CategoryDto) => void;
    onDelete: (id: number) => void;
}

export default function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
    // Group categories by type
    const incomeCategories = categories.filter(cat => cat.type === CategoryType.Income);
    const expenseCategories = categories.filter(cat => cat.type === CategoryType.Expense);
    const bothCategories = categories.filter(cat => cat.type === CategoryType.Both);

    const getCategoryTypeColor = (type: CategoryType): string => {
        switch (type) {
            case CategoryType.Income:
                return 'bg-green-100 text-green-800 border-green-300';
            case CategoryType.Expense:
                return 'bg-red-100 text-red-800 border-red-300';
            case CategoryType.Both:
                return 'bg-blue-100 text-blue-800 border-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getCategoryTypeName = (type: CategoryType): string => {
        switch (type) {
            case CategoryType.Income:
                return 'Income';
            case CategoryType.Expense:
                return 'Expense';
            case CategoryType.Both:
                return 'Both';
            default:
                return 'Unknown';
        }
    };

    const renderCategoryGroup = (title: string, categoryList: CategoryDto[], colorClass: string) => {
        if (categoryList.length === 0) return null;

        return (
            <div className="mb-8">
                <h2 className={`text-xl font-semibold mb-4 pb-2 border-b-2 ${colorClass}`}>
                    {title} <span className="text-gray-500 text-base">({categoryList.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryList.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryTypeColor(category.type)}`}>
                                            {getCategoryTypeName(category.type)}
                                        </span>
                                        {!category.isCustom && (
                                            <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-300">
                                                Predefined
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {category.isCustom ? (
                                <div className="flex space-x-2 pt-3 border-t border-gray-100">
                                    <button
                                        onClick={() => onEdit(category)}
                                        className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(category.id)}
                                        className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 italic text-center">
                                        System category - cannot be edited or deleted
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (categories.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-500">Get started by creating your first category</p>
            </div>
        );
    }

    return (
        <div>
            {renderCategoryGroup('Income Categories', incomeCategories, 'border-green-500 text-green-700')}
            {renderCategoryGroup('Expense Categories', expenseCategories, 'border-red-500 text-red-700')}
            {renderCategoryGroup('Both (Income & Expense)', bothCategories, 'border-blue-500 text-blue-700')}
        </div>
    );
}
