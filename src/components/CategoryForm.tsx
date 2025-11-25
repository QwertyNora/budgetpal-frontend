import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema, CreateCategoryFormData } from "../types/validation";
import { CategoryDto, CategoryType } from "../types/types";

interface CategoryFormProps {
    category?: CategoryDto;
    onSubmit: (data: CreateCategoryFormData) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

export default function CategoryForm({ category, onSubmit, onCancel, isSubmitting }: CategoryFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCategoryFormData>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: category
            ? {
                  name: category.name,
                  type: category.type,
              }
            : {
                  name: "",
                  type: CategoryType.Expense,
              },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter category name"
                    autoFocus
                    {...register("name")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            {/* Type Field */}
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Category Type *
                </label>
                <select
                    id="type"
                    {...register("type", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.type ? "border-red-500" : "border-gray-300"
                    }`}
                >
                    <option value={CategoryType.Income}>Income</option>
                    <option value={CategoryType.Expense}>Expense</option>
                    <option value={CategoryType.Both}>Both</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                    <strong>Type Guide:</strong>
                    <br />• <strong>Income:</strong> Category for income transactions only
                    <br />• <strong>Expense:</strong> Category for expense transactions only
                    <br />• <strong>Both:</strong> Category can be used for both income and expenses
                </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Saving..." : category ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}
