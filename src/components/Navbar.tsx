import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        Budget Tracker
                    </Link>
                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive("/") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/transactions"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive("/transactions") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Transactions
                        </Link>
                        <Link
                            to="/categories"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive("/categories") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Categories
                        </Link>
                        <Link
                            to="/statistics"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive("/statistics") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Statistics
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
