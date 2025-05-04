// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'manager' | 'coach' | 'entrepreneur' | 'admin';

// Session Types
export interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  coachId: string;
  coachName: string;
  entrepreneurId: string;
  entrepreneurName: string;
  status: SessionStatus;
  notes?: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export type SessionStatus = 'scheduled' | 'completed' | 'cancelled';

// Goal Types
export interface Goal {
  id: string;
  title: string;
  description: string;
  entrepreneurId: string;
  entrepreneurName: string;
  coachIds: string[];
  coachNames: string[];
  status: GoalStatus;
  dueDate?: string;
  progress: number;
  notes?: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export type GoalStatus = 'pending' | 'in_progress' | 'completed';

// Invoice Types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  description: string;
  entrepreneurId: string;
  entrepreneurName: string;
  status: InvoiceStatus;
  dueDate: string;
  paidDate?: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus = 'pending' | 'paid' | 'overdue';

// Organization Types
export interface Organization {
  id: string;
  name: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Stats Types
export interface ManagerDashboardStats {
  sessionCount: number;
  sessionsThisWeek: number;
  totalGoals: number;
  completedGoals: number;
  pendingInvoices: number;
  paidInvoices: number;
}

export interface CoachDashboardStats {
  upcomingSessions: number;
  sessionsThisWeek: number;
  totalGoals: number;
  goalsInProgress: number;
}

export interface EntrepreneurDashboardStats {
  upcomingSessions: number;
  totalGoals: number;
  completedGoals: number;
  pendingInvoices: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}