import { useCategories } from '@/hooks/useCategories';

export default function Categories() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading categories...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        Error loading categories: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create Category
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="bg-white p-4 rounded-lg shadow-md border-l-4"
            style={{ borderLeftColor: category.color || '#3B82F6' }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  category.type === 'income'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {category.type}
              </span>
            </div>
          </div>
        ))}
      </div>
      {categories?.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          No categories found. Create your first category to get started!
        </div>
      )}
    </div>
  );
}
