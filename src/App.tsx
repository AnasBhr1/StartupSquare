import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';

// Manager Pages
import ManagerDashboard from './pages/manager/Dashboard';
import ManagerSessions from './pages/manager/Sessions';
import ManagerGoals from './pages/manager/Goals';
import ManagerPayments from './pages/manager/Payments';

// Coach Pages
import CoachDashboard from './pages/coach/Dashboard';
import CoachGoals from './pages/coach/Goals';

// Entrepreneur Pages
import EntrepreneurDashboard from './pages/entrepreneur/Dashboard';
import EntrepreneurGoals from './pages/entrepreneur/Goals';

// Guards
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Manager Routes */}
      <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/sessions" element={<ManagerSessions />} />
          <Route path="/manager/goals" element={<ManagerGoals />} />
          <Route path="/manager/payments" element={<ManagerPayments />} />
        </Route>
      </Route>

      {/* Coach Routes */}
      <Route element={<ProtectedRoute allowedRoles={['coach']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/coach/dashboard" element={<CoachDashboard />} />
          <Route path="/coach/goals" element={<CoachGoals />} />
        </Route>
      </Route>

      {/* Entrepreneur Routes */}
      <Route element={<ProtectedRoute allowedRoles={['entrepreneur']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/entrepreneur/dashboard" element={<EntrepreneurDashboard />} />
          <Route path="/entrepreneur/goals" element={<EntrepreneurGoals />} />
        </Route>
      </Route>

      {/* Redirect to login if no route matches */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;