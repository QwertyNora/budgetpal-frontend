import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Transactions</h2>
          <p className="text-gray-600 mb-4">Track your expenses and income</p>
          <Link
            to="/transactions"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Transactions →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p className="text-gray-600 mb-4">Organize with categories</p>
          <Link
            to="/categories"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Categories →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Statistics</h2>
          <p className="text-gray-600 mb-4">View reports and analytics</p>
          <Link
            to="/statistics"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Statistics →
          </Link>
        </div>
      </div>
    </div>
  );
}
