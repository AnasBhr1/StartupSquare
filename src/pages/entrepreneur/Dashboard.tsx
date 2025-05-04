import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import StatsGrid from '../../components/dashboard/StatsGrid';
import RecentSessions from '../../components/dashboard/RecentSessions';
import RecentGoals from '../../components/dashboard/RecentGoals';
import RecentInvoices from '../../components/dashboard/RecentInvoices';
import { 
  getSessionsByUser, 
  getGoalsByUser, 
  getInvoicesByUser,
  getDashboardStatsByUser 
} from '../../services/mockData';
import { Session, Goal, Invoice, EntrepreneurDashboardStats } from '../../types';

const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<EntrepreneurDashboardStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        if (user) {
          const fetchedSessions = getSessionsByUser('entrepreneur', user.id);
          const fetchedGoals = getGoalsByUser('entrepreneur', user.id);
          const fetchedInvoices = getInvoicesByUser('entrepreneur', user.id);
          const fetchedStats = getDashboardStatsByUser('entrepreneur', user.id) as EntrepreneurDashboardStats;

          setSessions(fetchedSessions);
          setGoals(fetchedGoals);
          setInvoices(fetchedInvoices);
          setStats(fetchedStats);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Entrepreneur Dashboard</h1>
      
      {/* Stats Overview */}
      {stats && <StatsGrid role="entrepreneur" stats={stats} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sessions */}
        <RecentSessions sessions={sessions} />
        
        {/* Recent Goals */}
        <RecentGoals goals={goals} />
      </div>
      
      {/* Recent Invoices */}
      <RecentInvoices invoices={invoices} />
    </div>
  );
};

export default EntrepreneurDashboard;