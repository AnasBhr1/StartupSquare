import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { Invoice, InvoiceStatus } from '../../types';
import { CreditCard } from 'lucide-react';
import { useCurrency } from '../../hooks/useCurrency';

interface RecentInvoicesProps {
  invoices: Invoice[];
  limit?: number;
}

const RecentInvoices: React.FC<RecentInvoicesProps> = ({ invoices, limit = 5 }) => {
  const { formatAmount } = useCurrency();

  // Only show the most recent invoices up to the limit
  const recentInvoices = [...invoices]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  // Get badge variant based on invoice status
  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'overdue':
        return <Badge variant="danger">Overdue</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card title="Recent Invoices">
      {recentInvoices.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {recentInvoices.map((invoice) => (
            <div key={invoice.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Invoice #{invoice.invoiceNumber}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {invoice.entrepreneurName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(invoice.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                  {getStatusBadge(invoice.status)}
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {formatAmount(invoice.amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No invoices yet"
          description="Generate invoices to track payments."
          icon={<CreditCard className="h-10 w-10 text-gray-400" />}
        />
      )}
    </Card>
  );
};

export default RecentInvoices;