import React from 'react';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { Target } from 'lucide-react';

const ManagerGoals = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Goals Management</h1>
          <p className="mt-1 text-sm text-gray-600">Track and manage goals for your team</p>
        </div>
      </div>

      <Card>
        <EmptyState
          title="No goals created yet"
          description="Start by creating goals for your team members"
          icon={<Target className="h-10 w-10 text-gray-400" />}
          actionLabel="Create Goal"
          onAction={() => {
            // TODO: Implement goal creation
            console.log('Create goal clicked');
          }}
        />
      </Card>
    </div>
  );
};

export default ManagerGoals;