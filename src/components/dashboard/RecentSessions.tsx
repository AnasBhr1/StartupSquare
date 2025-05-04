import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { formatDistanceToNow } from 'date-fns';
import { Session, SessionStatus } from '../../types';
import { CalendarClock } from 'lucide-react';

interface RecentSessionsProps {
  sessions: Session[];
  limit?: number;
}

const RecentSessions: React.FC<RecentSessionsProps> = ({ sessions, limit = 5 }) => {
  // Only show the most recent sessions up to the limit
  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .slice(0, limit);

  // Get badge variant based on session status
  const getStatusBadge = (status: SessionStatus) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="primary">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return null;
    }
  };

  // Format session time
  const formatTime = (date: string) => {
    const sessionDate = new Date(date);
    return `${sessionDate.toLocaleDateString()} at ${sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <Card title="Recent Sessions">
      {recentSessions.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {recentSessions.map((session) => (
            <div key={session.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{session.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {session.coachName} with {session.entrepreneurName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(session.startTime)}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                  {getStatusBadge(session.status)}
                  <p className="text-xs text-gray-500 mt-1">
                    {session.status === 'scheduled'
                      ? formatDistanceToNow(new Date(session.startTime), { addSuffix: true })
                      : formatDistanceToNow(new Date(session.startTime), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No sessions yet"
          description="Schedule coaching sessions to see them here."
          icon={<CalendarClock className="h-10 w-10 text-gray-400" />}
        />
      )}
    </Card>
  );
};

export default RecentSessions;