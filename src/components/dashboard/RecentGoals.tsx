import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { Goal, GoalStatus } from '../../types';
import { Target } from 'lucide-react';

interface RecentGoalsProps {
  goals: Goal[];
  limit?: number;
}

const RecentGoals: React.FC<RecentGoalsProps> = ({ goals, limit = 5 }) => {
  // Only show the most recent goals up to the limit
  const recentGoals = [...goals]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  // Get badge variant based on goal status
  const getStatusBadge = (status: GoalStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'in_progress':
        return <Badge variant="primary">In Progress</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card title="Recent Goals">
      {recentGoals.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {recentGoals.map((goal) => (
            <div key={goal.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Entrepreneur: {goal.entrepreneurName}
                  </p>
                  {goal.dueDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(goal.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                  {getStatusBadge(goal.status)}
                  <div className="mt-2 w-24">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${goal.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-right mt-1">{goal.progress}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No goals yet"
          description="Create goals to track progress toward success."
          icon={<Target className="h-10 w-10 text-gray-400" />}
        />
      )}
    </Card>
  );
};

export default RecentGoals;