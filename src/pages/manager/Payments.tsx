import React, { useState } from 'react';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { CreditCard } from 'lucide-react';

const ManagerPayments = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="mt-1 text-sm text-gray-600">Manage invoices and track payments</p>
        </div>
      </div>

      <Card>
        <EmptyState
          title="No payments yet"
          description="Create your first invoice to get started"
          icon={<CreditCard className="h-10 w-10 text-gray-400" />}
          actionLabel="Create Invoice"
          onAction={() => {
            // TODO: Implement invoice creation
            console.log('Create invoice clicked');
          }}
        />
      </Card>
    </div>
  );
};

export default ManagerPayments;