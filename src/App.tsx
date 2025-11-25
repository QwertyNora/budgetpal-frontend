import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import Transactions from "./pages/Transactions";
import CategoriesPage from "./pages/CategoriesPage";
import Statistics from "./pages/Statistics";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/transactions" element={<Transactions />} />
                            <Route path="/categories" element={<CategoriesPage />} />
                            <Route path="/statistics" element={<Statistics />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
