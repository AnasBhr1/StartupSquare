import { 
  Session, 
  Goal, 
  Invoice, 
  User, 
  ManagerDashboardStats,
  CoachDashboardStats,
  EntrepreneurDashboardStats
} from '../types';
import { addDays, subDays } from 'date-fns';

// Update the mock users with Moroccan and European names
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Youssef El Mansouri',
    email: 'manager@example.com',
    role: 'manager',
    organizationId: 'org1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Sophie Laurent',
    email: 'coach@example.com',
    role: 'coach',
    organizationId: 'org1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Karim Benali',
    email: 'entrepreneur@example.com',
    role: 'entrepreneur',
    organizationId: 'org1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Hans Schmidt',
    email: 'mike@example.com',
    role: 'coach',
    organizationId: 'org1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Fatima Zahra',
    email: 'lisa@example.com',
    role: 'entrepreneur',
    organizationId: 'org1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Pierre Dubois',
    email: 'pierre@example.com',
    role: 'coach',
    organizationId: 'org1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Amina Idrissi',
    email: 'amina@example.com',
    role: 'entrepreneur',
    organizationId: 'org1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Initial Strategy Session',
    description: 'Setting goals and defining the roadmap',
    startTime: addDays(new Date(), 2).toISOString(),
    endTime: addDays(new Date(new Date().setHours(new Date().getHours() + 1)), 2).toISOString(),
    coachId: '2',
    coachName: 'Sophie Laurent',
    entrepreneurId: '3',
    entrepreneurName: 'Karim Benali',
    status: 'scheduled',
    organizationId: 'org1',
    createdAt: subDays(new Date(), 5).toISOString(),
    updatedAt: subDays(new Date(), 5).toISOString(),
  },
  {
    id: '2',
    title: 'Marketing Strategy Review',
    description: 'Reviewing current marketing efforts and planning next steps',
    startTime: addDays(new Date(), 5).toISOString(),
    endTime: addDays(new Date(new Date().setHours(new Date().getHours() + 1)), 5).toISOString(),
    coachId: '4',
    coachName: 'Hans Schmidt',
    entrepreneurId: '3',
    entrepreneurName: 'Karim Benali',
    status: 'scheduled',
    organizationId: 'org1',
    createdAt: subDays(new Date(), 3).toISOString(),
    updatedAt: subDays(new Date(), 3).toISOString(),
  },
  {
    id: '3',
    title: 'Product Development Workshop',
    description: 'Brainstorming new product ideas and features',
    startTime: subDays(new Date(), 2).toISOString(),
    endTime: subDays(new Date(new Date().setHours(new Date().getHours() + 2)), 2).toISOString(),
    coachId: '2',
    coachName: 'Sophie Laurent',
    entrepreneurId: '5',
    entrepreneurName: 'Fatima Zahra',
    status: 'completed',
    notes: 'Productive session, identified 3 key features to develop',
    organizationId: 'org1',
    createdAt: subDays(new Date(), 7).toISOString(),
    updatedAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: '4',
    title: 'Investor Pitch Practice',
    description: 'Preparing for upcoming investor meetings',
    startTime: subDays(new Date(), 5).toISOString(),
    endTime: subDays(new Date(new Date().setHours(new Date().getHours() + 1)), 5).toISOString(),
    coachId: '4',
    coachName: 'Hans Schmidt',
    entrepreneurId: '5',
    entrepreneurName: 'Fatima Zahra',
    status: 'completed',
    notes: 'Great progress on the pitch deck, needs more financial projections',
    organizationId: 'org1',
    createdAt: subDays(new Date(), 10).toISOString(),
    updatedAt: subDays(new Date(), 5).toISOString(),
  },
  {
    id: '5',
    title: 'Team Building Workshop',
    description: 'Strategies for building and managing a high-performing team',
    startTime: addDays(new Date(), 1).toISOString(),
    endTime: addDays(new Date(new Date().setHours(new Date().getHours() + 3)), 1).toISOString(),
    coachId: '2',
    coachName: 'Sophie Laurent',
    entrepreneurId: '3',
    entrepreneurName: 'Karim Benali',
    status: 'scheduled',
    organizationId: 'org1',
    createdAt: subDays(new Date(), 2).toISOString(),
    updatedAt: subDays(new Date(), 2).toISOString(),
  },
];

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Launch MVP by Q3',
    description: 'Develop and launch the minimum viable product by the end of Q3',
    entrepreneurId: '3',
    entrepreneurName: 'Karim Benali',
    coachIds: ['2'],
    coachNames: ['Sophie Laurent'],
    status: 'in_progress',
    dueDate: addDays(new Date(), 45).toISOString(),
    progress: 60,
    organizationId: 'org1',
    createdAt: subDays(new Date(), 30).toISOString(),
    updatedAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: '2',
    title: 'Secure Seed Funding',
    description: 'Raise $500K in seed funding',
    entrepreneurId: '3',
    entrepreneurName: 'Karim Benali',
    coachIds: ['2', '4'],
    coachNames: ['Sophie Laurent', 'Hans Schmidt'],
    status: 'pending',
    dueDate: addDays(new Date(), 90).toISOString(),
    progress: 20,
    organizationId: 'org1',
    createdAt: subDays(new Date(), 15).toISOString(),
    updatedAt: subDays(new Date(), 15).toISOString(),
  },
  {
    id: '3',
    title: 'Develop Marketing Strategy',
    description: 'Create comprehensive marketing plan for product launch',
    entrepreneurId: '5',
    entrepreneurName: 'Fatima Zahra',
    coachIds: ['4'],
    coachNames: ['Hans Schmidt'],
    status: 'completed',
    dueDate: subDays(new Date(), 10).toISOString(),
    progress: 100,
    notes: 'Strategy document finalized and approved',
    organizationId: 'org1',
    createdAt: subDays(new Date(), 45).toISOString(),
    updatedAt: subDays(new Date(), 10).toISOString(),
  },
  {
    id: '4',
    title: 'Hire Technical Team',
    description: 'Recruit 3 developers and 1 designer',
    entrepreneurId: '5',
    entrepreneurName: 'Fatima Zahra',
    coachIds: ['2'],
    coachNames: ['Sophie Laurent'],
    status: 'in_progress',
    dueDate: addDays(new Date(), 30).toISOString(),
    progress: 75,
    notes: 'Lead developer and designer hired, interviewing for remaining positions',
    organizationId: 'org1',
    createdAt: subDays(new Date(), 20).toISOString(),
    updatedAt: subDays(new Date(), 3).toISOString(),
  },
  {
    id: '5',
    title: 'Develop Financial Projections',
    description: '3-year financial model with various scenarios',
    entrepreneurId: '3',
    entrepreneurName: 'Karim Benali',
    coachIds: ['4'],
    coachNames: ['Hans Schmidt'],
    status: 'in_progress',
    dueDate: addDays(new Date(), 15).toISOString(),
    progress: 40,
    organizationId: 'org1',
    createdAt: subDays(new Date(), 10).toISOString(),
    updatedAt: subDays(new Date(), 1).toISOString(),
  },
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    amount: 15000,
    description: 'Coaching sessions - April 2025',
    entrepreneurId: '3',
    entrepreneurName: 'Karim Benali',
    status: 'paid',
    dueDate: subDays(new Date(), 15).toISOString(),
    paidDate: subDays(new Date(), 10).toISOString(),
    organizationId: 'org1',
    createdAt: subDays(new Date(), 30).toISOString(),
    updatedAt: subDays(new Date(), 10).toISOString(),
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    amount: 20000,
    description: 'Coaching sessions - May 2025',
    entrepreneurId: '3',
    entrepreneurName: 'Karim Benali',
    status: 'pending',
    dueDate: addDays(new Date(), 10).toISOString(),
    organizationId: 'org1',
    createdAt: subDays(new Date(), 5).toISOString(),
    updatedAt: subDays(new Date(), 5).toISOString(),
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    amount: 12000,
    description: 'Coaching sessions - April 2025',
    entrepreneurId: '5',
    entrepreneurName: 'Fatima Zahra',
    status: 'overdue',
    dueDate: subDays(new Date(), 5).toISOString(),
    organizationId: 'org1',
    createdAt: subDays(new Date(), 20).toISOString(),
    updatedAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: '4',
    invoiceNumber: 'INV-004',
    amount: 18000,
    description: 'Workshop facilitation - March 2025',
    entrepreneurId: '5',
    entrepreneurName: 'Fatima Zahra',
    status: 'paid',
    dueDate: subDays(new Date(), 30).toISOString(),
    paidDate: subDays(new Date(), 28).toISOString(),
    organizationId: 'org1',
    createdAt: subDays(new Date(), 45).toISOString(),
    updatedAt: subDays(new Date(), 28).toISOString(),
  },
];

// Mock Dashboard Stats
export const mockManagerStats: ManagerDashboardStats = {
  sessionCount: mockSessions.length,
  sessionsThisWeek: mockSessions.filter(
    (session) => 
      new Date(session.startTime) > new Date() && 
      new Date(session.startTime) < addDays(new Date(), 7)
  ).length,
  totalGoals: mockGoals.length,
  completedGoals: mockGoals.filter((goal) => goal.status === 'completed').length,
  pendingInvoices: mockInvoices
    .filter((invoice) => invoice.status === 'pending' || invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0),
  paidInvoices: mockInvoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0),
};

export const mockCoachStats: CoachDashboardStats = {
  upcomingSessions: mockSessions.filter(
    (session) => session.status === 'scheduled' && new Date(session.startTime) > new Date()
  ).length,
  sessionsThisWeek: mockSessions.filter(
    (session) => 
      session.status === 'scheduled' &&
      new Date(session.startTime) > new Date() && 
      new Date(session.startTime) < addDays(new Date(), 7)
  ).length,
  totalGoals: mockGoals.filter((goal) => goal.coachIds.includes('2')).length,
  goalsInProgress: mockGoals.filter(
    (goal) => goal.status === 'in_progress' && goal.coachIds.includes('2')
  ).length,
};

export const mockEntrepreneurStats: EntrepreneurDashboardStats = {
  upcomingSessions: mockSessions.filter(
    (session) => 
      session.status === 'scheduled' && 
      session.entrepreneurId === '3' && 
      new Date(session.startTime) > new Date()
  ).length,
  totalGoals: mockGoals.filter((goal) => goal.entrepreneurId === '3').length,
  completedGoals: mockGoals.filter(
    (goal) => goal.status === 'completed' && goal.entrepreneurId === '3'
  ).length,
  pendingInvoices: mockInvoices
    .filter(
      (invoice) => 
        (invoice.status === 'pending' || invoice.status === 'overdue') && 
        invoice.entrepreneurId === '3'
    )
    .reduce((sum, invoice) => sum + invoice.amount, 0),
};

// Helper function to get sessions by user role and ID
export const getSessionsByUser = (role: string, userId: string): Session[] => {
  switch (role) {
    case 'manager':
      return [...mockSessions];
    case 'coach':
      return mockSessions.filter((session) => session.coachId === userId);
    case 'entrepreneur':
      return mockSessions.filter((session) => session.entrepreneurId === userId);
    default:
      return [];
  }
};

// Helper function to get goals by user role and ID
export const getGoalsByUser = (role: string, userId: string): Goal[] => {
  switch (role) {
    case 'manager':
      return [...mockGoals];
    case 'coach':
      return mockGoals.filter((goal) => goal.coachIds.includes(userId));
    case 'entrepreneur':
      return mockGoals.filter((goal) => goal.entrepreneurId === userId);
    default:
      return [];
  }
};

// Helper function to get invoices by user role and ID
export const getInvoicesByUser = (role: string, userId: string): Invoice[] => {
  switch (role) {
    case 'manager':
      return [...mockInvoices];
    case 'entrepreneur':
      return mockInvoices.filter((invoice) => invoice.entrepreneurId === userId);
    default:
      return [];
  }
};

// Helper function to get dashboard stats by user role and ID
export const getDashboardStatsByUser = (
  role: string, 
  userId: string
): ManagerDashboardStats | CoachDashboardStats | EntrepreneurDashboardStats => {
  switch (role) {
    case 'manager':
      return mockManagerStats;
    case 'coach':
      // For simplicity, we're using the prepared mock data
      // In a real app, this would be calculated based on the userId
      return mockCoachStats;
    case 'entrepreneur':
      // For simplicity, we're using the prepared mock data
      // In a real app, this would be calculated based on the userId
      return mockEntrepreneurStats;
    default:
      return mockManagerStats;
  }
};