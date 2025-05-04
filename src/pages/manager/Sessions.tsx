import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { getSessionsByUser, mockUsers } from '../../services/mockData';
import { SESSION_STATUS_OPTIONS } from '../../config/constants';
import { Session, User } from '../../types';
import { Calendar, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

interface SessionFormData {
  title: string;
  description: string;
  coachId: string;
  entrepreneurId: string;
  status: string;
  notes?: string;
}

const ManagerSessions: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(new Date().setHours(new Date().getHours() + 1)));
  const [coaches, setCoaches] = useState<User[]>([]);
  const [entrepreneurs, setEntrepreneurs] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SessionFormData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // In a real app, these would be API calls
          const fetchedSessions = getSessionsByUser('manager', user.id);
          const fetchedCoaches = mockUsers.filter(u => u.role === 'coach');
          const fetchedEntrepreneurs = mockUsers.filter(u => u.role === 'entrepreneur');
          
          setSessions(fetchedSessions);
          setFilteredSessions(fetchedSessions);
          setCoaches(fetchedCoaches);
          setEntrepreneurs(fetchedEntrepreneurs);
        }
      } catch (error) {
        console.error('Error fetching sessions data:', error);
        toast.error('Failed to load sessions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    // Apply filters
    let results = [...sessions];
    
    if (searchTerm) {
      results = results.filter(
        session =>
          session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.coachName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.entrepreneurName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter) {
      results = results.filter(session => session.status === statusFilter);
    }
    
    setFilteredSessions(results);
  }, [searchTerm, statusFilter, sessions]);

  const handleCreateSession = (data: SessionFormData) => {
    try {
      // In a real app, this would be an API call
      const coach = coaches.find(c => c.id === data.coachId);
      const entrepreneur = entrepreneurs.find(e => e.id === data.entrepreneurId);
      
      if (!coach || !entrepreneur) {
        toast.error('Coach or entrepreneur not found');
        return;
      }
      
      const newSession: Session = {
        id: `session-${Date.now()}`,
        title: data.title,
        description: data.description,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        coachId: data.coachId,
        coachName: coach.name,
        entrepreneurId: data.entrepreneurId,
        entrepreneurName: entrepreneur.name,
        status: data.status as any,
        notes: data.notes,
        organizationId: user?.organizationId || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setSessions(prev => [newSession, ...prev]);
      toast.success('Session created successfully');
      setIsCreateModalOpen(false);
      reset();
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Failed to create session');
    }
  };

  const handleEditSession = (data: SessionFormData) => {
    try {
      if (!currentSession) return;
      
      // In a real app, this would be an API call
      const coach = coaches.find(c => c.id === data.coachId);
      const entrepreneur = entrepreneurs.find(e => e.id === data.entrepreneurId);
      
      if (!coach || !entrepreneur) {
        toast.error('Coach or entrepreneur not found');
        return;
      }
      
      const updatedSession: Session = {
        ...currentSession,
        title: data.title,
        description: data.description,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        coachId: data.coachId,
        coachName: coach.name,
        entrepreneurId: data.entrepreneurId,
        entrepreneurName: entrepreneur.name,
        status: data.status as any,
        notes: data.notes,
        updatedAt: new Date().toISOString(),
      };
      
      setSessions(prev => 
        prev.map(session => 
          session.id === currentSession.id ? updatedSession : session
        )
      );
      
      toast.success('Session updated successfully');
      setIsEditModalOpen(false);
      setCurrentSession(null);
      reset();
    } catch (error) {
      console.error('Error updating session:', error);
      toast.error('Failed to update session');
    }
  };

  const handleDeleteSession = () => {
    try {
      if (!currentSession) return;
      
      // In a real app, this would be an API call
      setSessions(prev => prev.filter(session => session.id !== currentSession.id));
      
      toast.success('Session deleted successfully');
      setIsDeleteModalOpen(false);
      setCurrentSession(null);
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error('Failed to delete session');
    }
  };

  const openEditModal = (session: Session) => {
    setCurrentSession(session);
    setValue('title', session.title);
    setValue('description', session.description);
    setValue('coachId', session.coachId);
    setValue('entrepreneurId', session.entrepreneurId);
    setValue('status', session.status);
    setValue('notes', session.notes || '');
    setStartDate(new Date(session.startTime));
    setEndDate(new Date(session.endTime));
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (session: Session) => {
    setCurrentSession(session);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    reset();
    setStartDate(new Date());
    setEndDate(new Date(new Date().setHours(new Date().getHours() + 1)));
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
        <Button 
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }} 
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Create Session
        </Button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {SESSION_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Sessions List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{session.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{session.description}</p>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Coach</p>
                        <p className="text-sm">{session.coachName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Entrepreneur</p>
                        <p className="text-sm">{session.entrepreneurName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Date & Time</p>
                        <p className="text-sm">
                          {new Date(session.startTime).toLocaleDateString()} at{' '}
                          {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    {session.notes && (
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="font-medium">Notes:</span> {session.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="mb-4">{getStatusBadge(session.status)}</div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(session)}
                        leftIcon={<Edit className="h-4 w-4" />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openDeleteModal(session)}
                        leftIcon={<Trash2 className="h-4 w-4" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">No sessions found.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Create Session Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Session"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(handleCreateSession)}>
              Create Session
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <Input
            label="Session Title"
            fullWidth
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Coach"
              options={coaches.map(coach => ({ label: coach.name, value: coach.id }))}
              placeholder="Select Coach"
              fullWidth
              error={errors.coachId?.message}
              {...register('coachId', { required: 'Coach is required' })}
            />
            
            <Select
              label="Entrepreneur"
              options={entrepreneurs.map(entrepreneur => ({ label: entrepreneur.name, value: entrepreneur.id }))}
              placeholder="Select Entrepreneur"
              fullWidth
              error={errors.entrepreneurId?.message}
              {...register('entrepreneurId', { required: 'Entrepreneur is required' })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <Select
            label="Status"
            options={SESSION_STATUS_OPTIONS}
            placeholder="Select Status"
            fullWidth
            defaultValue="scheduled"
            error={errors.status?.message}
            {...register('status', { required: 'Status is required' })}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              rows={3}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              rows={2}
              {...register('notes')}
            />
          </div>
        </form>
      </Modal>
      
      {/* Edit Session Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Session"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(handleEditSession)}>
              Update Session
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <Input
            label="Session Title"
            fullWidth
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Coach"
              options={coaches.map(coach => ({ label: coach.name, value: coach.id }))}
              placeholder="Select Coach"
              fullWidth
              error={errors.coachId?.message}
              {...register('coachId', { required: 'Coach is required' })}
            />
            
            <Select
              label="Entrepreneur"
              options={entrepreneurs.map(entrepreneur => ({ label: entrepreneur.name, value: entrepreneur.id }))}
              placeholder="Select Entrepreneur"
              fullWidth
              error={errors.entrepreneurId?.message}
              {...register('entrepreneurId', { required: 'Entrepreneur is required' })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <Select
            label="Status"
            options={SESSION_STATUS_OPTIONS}
            placeholder="Select Status"
            fullWidth
            error={errors.status?.message}
            {...register('status', { required: 'Status is required' })}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              rows={3}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              rows={2}
              {...register('notes')}
            />
          </div>
        </form>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Session"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteSession}>
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-gray-700">
          Are you sure you want to delete the session <span className="font-medium">{currentSession?.title}</span>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default ManagerSessions;