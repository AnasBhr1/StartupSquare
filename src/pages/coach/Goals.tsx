import React from 'react';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import { Target } from 'lucide-react';

const CoachGoals = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
          <p className="mt-1 text-sm text-gray-600">Track and manage your clients' goals</p>
        </div>
      </div>

      <Card>
        <EmptyState
          title="No goals yet"
          description="Goals assigned to your clients will appear here"
          icon={<Target className="h-10 w-10 text-gray-400" />}
        />
      </Card>
    </div>
  );
};

export default CoachGoals;