import React from 'react';
import StatCard from '../common/StatCard';
import { UserRole } from '../../types';
import { useCurrency } from '../../hooks/useCurrency';
import { 
  CalendarClock, 
  Target, 
  CreditCard, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

interface ManagerStats {
  sessionCount: number;
  sessionsThisWeek: number;
  totalGoals: number;
  completedGoals: number;
  pendingInvoices: number;
  paidInvoices: number;
}

interface CoachStats {
  upcomingSessions: number;
  sessionsThisWeek: number;
  totalGoals: number;
  goalsInProgress: number;
}

interface EntrepreneurStats {
  upcomingSessions: number;
  totalGoals: number;
  completedGoals: number;
  pendingInvoices: number;
}

interface StatsGridProps {
  role: UserRole;
  stats: ManagerStats | CoachStats | EntrepreneurStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ role, stats }) => {
  const { formatAmount } = useCurrency();

  // Render stats based on user role
  const renderStats = () => {
    switch (role) {
      case 'manager':
        const managerStats = stats as ManagerStats;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Total Sessions"
              value={managerStats.sessionCount}
              icon={<CalendarClock className="w-5 h-5" />}
            />
            <StatCard
              title="Sessions This Week"
              value={managerStats.sessionsThisWeek}
              icon={<Clock className="w-5 h-5" />}
            />
            <StatCard
              title="Total Goals"
              value={managerStats.totalGoals}
              icon={<Target className="w-5 h-5" />}
            />
            <StatCard
              title="Completed Goals"
              value={managerStats.completedGoals}
              icon={<CheckCircle2 className="w-5 h-5" />}
              trend={{
                value: managerStats.totalGoals > 0 
                  ? Math.round((managerStats.completedGoals / managerStats.totalGoals) * 100) 
                  : 0,
                isPositive: true,
              }}
            />
            <StatCard
              title="Pending Invoices"
              value={formatAmount(managerStats.pendingInvoices)}
              icon={<CreditCard className="w-5 h-5" />}
            />
            <StatCard
              title="Paid Invoices"
              value={formatAmount(managerStats.paidInvoices)}
              icon={<CreditCard className="w-5 h-5" />}
            />
          </div>
        );
      case 'coach':
        const coachStats = stats as CoachStats;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Upcoming Sessions"
              value={coachStats.upcomingSessions}
              icon={<CalendarClock className="w-5 h-5" />}
            />
            <StatCard
              title="Sessions This Week"
              value={coachStats.sessionsThisWeek}
              icon={<Clock className="w-5 h-5" />}
            />
            <StatCard
              title="Total Goals"
              value={coachStats.totalGoals}
              icon={<Target className="w-5 h-5" />}
            />
            <StatCard
              title="Goals In Progress"
              value={coachStats.goalsInProgress}
              icon={<Target className="w-5 h-5" />}
              trend={{
                value: coachStats.totalGoals > 0 
                  ? Math.round((coachStats.goalsInProgress / coachStats.totalGoals) * 100) 
                  : 0,
                isPositive: true,
              }}
            />
          </div>
        );
      case 'entrepreneur':
        const entrepreneurStats = stats as EntrepreneurStats;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Upcoming Sessions"
              value={entrepreneurStats.upcomingSessions}
              icon={<CalendarClock className="w-5 h-5" />}
            />
            <StatCard
              title="Total Goals"
              value={entrepreneurStats.totalGoals}
              icon={<Target className="w-5 h-5" />}
            />
            <StatCard
              title="Completed Goals"
              value={entrepreneurStats.completedGoals}
              icon={<CheckCircle2 className="w-5 h-5" />}
              trend={{
                value: entrepreneurStats.totalGoals > 0 
                  ? Math.round((entrepreneurStats.completedGoals / entrepreneurStats.totalGoals) * 100) 
                  : 0,
                isPositive: true,
              }}
            />
            <StatCard
              title="Pending Invoices"
              value={formatAmount(entrepreneurStats.pendingInvoices)}
              icon={<CreditCard className="w-5 h-5" />}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return renderStats();
};

export default StatsGrid;