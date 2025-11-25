import { useBudgets } from '@/hooks/useBudgets';
import { useTransactions } from '@/hooks/useTransactions';
import { formatCurrency } from '@/utils/format';
import { formatDate } from '@/utils/date';

export default function Statistics() {
  const { data: budgets, isLoading: budgetsLoading } = useBudgets();
  const { data: transactions, isLoading: transactionsLoading } = useTransactions();

  if (budgetsLoading || transactionsLoading) {
    return <div className="container mx-auto px-4 py-8">Loading statistics...</div>;
  }

  const totalIncome = transactions
    ?.filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0) || 0;

  const totalExpenses = transactions
    ?.filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0) || 0;

  const balance = totalIncome - totalExpenses;

  const totalBudget = budgets?.reduce((sum, b) => sum + b.amount, 0) || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Statistics & Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Balance</h3>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Budget</h3>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalBudget)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-2">
          {transactions?.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
              </div>
              <span
                className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          ))}
          {(!transactions || transactions.length === 0) && (
            <p className="text-gray-500 text-center py-4">No transactions yet</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
        <div className="space-y-4">
          {budgets?.map((budget) => {
            const spent = transactions
              ?.filter((t) => t.budgetId === budget.id && t.type === 'expense')
              .reduce((sum, t) => sum + t.amount, 0) || 0;
            const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
            
            return (
              <div key={budget.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{budget.name}</span>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(spent)} / {formatCurrency(budget.amount)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      percentage > 100 ? 'bg-red-600' : percentage > 80 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
          {(!budgets || budgets.length === 0) && (
            <p className="text-gray-500 text-center py-4">No budgets created yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
