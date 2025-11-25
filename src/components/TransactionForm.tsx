import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { createTransactionSchema, CreateTransactionFormData } from "../types/validation";
import { TransactionDto, TransactionType, CategoryType } from "../types/types";
import { useCategories } from "../hooks/useCategories";

interface TransactionFormProps {
    transaction?: TransactionDto;
    onSubmit: (data: CreateTransactionFormData) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

export default function TransactionForm({ transaction, onSubmit, onCancel, isSubmitting }: TransactionFormProps) {
    const { data: categories, isLoading: categoriesLoading } = useCategories();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CreateTransactionFormData>({
        resolver: zodResolver(createTransactionSchema),
        defaultValues: transaction
            ? {
                  date: transaction.date.split("T")[0],
                  description: transaction.description,
                  amount: transaction.amount,
                  type: transaction.type,
                  categoryId: transaction.categoryId,
                  notes: transaction.notes || "",
              }
            : {
                  date: new Date().toISOString().split("T")[0],
                  description: "",
                  amount: 0,
                  type: TransactionType.Expense,
                  categoryId: 0,
                  notes: "",
              },
    });

    const selectedType = watch("type");

    // Filter categories based on transaction type
    const filteredCategories =
        categories?.filter(category => {
            if (category.type === CategoryType.Both) return true;
            if (selectedType === TransactionType.Income) {
                return category.type === CategoryType.Income;
            }
            if (selectedType === TransactionType.Expense) {
                return category.type === CategoryType.Expense;
            }
            return false;
        }) || [];

    // Reset category selection when type changes
    useEffect(() => {
        const currentCategoryId = watch("categoryId");
        const isValidCategory = filteredCategories.some(cat => cat.id === currentCategoryId);
        if (!isValidCategory && filteredCategories.length > 0) {
            setValue("categoryId", filteredCategories[0].id);
        }
    }, [selectedType, filteredCategories, setValue, watch]);

    const today = new Date().toISOString().split("T")[0];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Date Field */}
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                </label>
                <input
                    type="date"
                    id="date"
                    max={today}
                    {...register("date")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
            </div>

            {/* Description Field */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                </label>
                <input
                    type="text"
                    id="description"
                    placeholder="Enter description"
                    {...register("description")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            {/* Amount Field */}
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount *
                </label>
                <input
                    type="number"
                    id="amount"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("amount", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.amount ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
            </div>

            {/* Type Field */}
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                </label>
                <select
                    id="type"
                    {...register("type", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.type ? "border-red-500" : "border-gray-300"
                    }`}
                >
                    <option value={TransactionType.Expense}>Expense</option>
                    <option value={TransactionType.Income}>Income</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
            </div>

            {/* Category Field */}
            <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                </label>
                {categoriesLoading ? (
                    <div className="text-sm text-gray-500">Loading categories...</div>
                ) : (
                    <>
                        <select
                            id="categoryId"
                            {...register("categoryId", { valueAsNumber: true })}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.categoryId ? "border-red-500" : "border-gray-300"
                            }`}
                        >
                            <option value={0}>Select a category</option>
                            {filteredCategories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {filteredCategories.length === 0 && (
                            <p className="mt-1 text-sm text-amber-600">
                                No categories available for this transaction type
                            </p>
                        )}
                    </>
                )}
                {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>}
            </div>

            {/* Notes Field */}
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                </label>
                <textarea
                    id="notes"
                    rows={3}
                    placeholder="Add any additional notes..."
                    {...register("notes")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.notes ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>}
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
                    disabled={isSubmitting || categoriesLoading || filteredCategories.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Saving..." : transaction ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}
