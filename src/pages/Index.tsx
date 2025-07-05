
import { useState } from 'react';
import { Plus, Search, Filter, CheckSquare, Clock, AlertCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';
import FilterDropdown from '@/components/FilterDropdown';

const Index = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project documentation",
      description: "Write comprehensive documentation for the todo app project",
      priority: "high",
      status: "in-progress",
      dueDate: "2025-07-07",
      assignedTo: "john@example.com",
      createdAt: "2025-07-05",
      tags: ["work", "documentation"]
    },
    {
      id: 2,
      title: "Review pull requests",
      description: "Review and merge pending pull requests from team members",
      priority: "medium",
      status: "pending",
      dueDate: "2025-07-06",
      assignedTo: "jane@example.com",
      createdAt: "2025-07-04",
      tags: ["code-review", "teamwork"]
    },
    {
      id: 3,
      title: "Design system updates",
      description: "Update the design system with new color palette and components",
      priority: "low",
      status: "completed",
      dueDate: "2025-07-08",
      assignedTo: "designer@example.com",
      createdAt: "2025-07-03",
      tags: ["design", "ui"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeFilter) {
      case 'completed': return matchesSearch && task.status === 'completed';
      case 'pending': return matchesSearch && task.status === 'pending';
      case 'in-progress': return matchesSearch && task.status === 'in-progress';
      case 'overdue': 
        const today = new Date().toISOString().split('T')[0];
        return matchesSearch && task.dueDate < today && task.status !== 'completed';
      case 'due-today':
        const todayDate = new Date().toISOString().split('T')[0];
        return matchesSearch && task.dueDate === todayDate;
      default: return matchesSearch;
    }
  });

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskData) => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, ...taskData } : task
    ));
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getTaskStats = () => {
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const today = new Date().toISOString().split('T')[0];
    const overdue = tasks.filter(t => t.dueDate < today && t.status !== 'completed').length;
    
    return { completed, inProgress, pending, overdue, total: tasks.length };
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <CheckSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">TaskFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowTaskForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Tasks</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <CheckSquare className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <CheckSquare className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">In Progress</p>
                  <p className="text-3xl font-bold">{stats.inProgress}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Overdue</p>
                  <p className="text-3xl font-bold">{stats.overdue}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <FilterDropdown 
                activeFilter={activeFilter} 
                onFilterChange={setActiveFilter} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckSquare className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No tasks found</h3>
                <p className="text-slate-500 mb-6">
                  {searchTerm || activeFilter !== 'all' 
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by creating your first task"
                  }
                </p>
                {!searchTerm && activeFilter === 'all' && (
                  <Button 
                    onClick={() => setShowTaskForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(task) => {
                  setEditingTask(task);
                  setShowTaskForm(true);
                }}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Index;
