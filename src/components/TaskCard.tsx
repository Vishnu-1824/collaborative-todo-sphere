
import { useState } from 'react';
import { Calendar, User, Edit, Trash2, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const isOverdue = () => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate < today && task.status !== 'completed';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${
      isOverdue() ? 'border-red-200 bg-red-50' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 
                className="text-lg font-semibold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {task.title}
              </h3>
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="hover:bg-blue-50 hover:text-blue-600"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
              
              <Select value={task.status} onValueChange={(value) => onStatusChange(task.id, value)}>
                <SelectTrigger className="w-auto h-auto p-0 border-0 bg-transparent">
                  <Badge className={`${getStatusColor(task.status)} cursor-pointer hover:opacity-80`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(task.status)}
                      <SelectValue />
                    </div>
                  </Badge>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              {isOverdue() && (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Overdue
                </Badge>
              )}
            </div>

            {isExpanded && (
              <p className="text-slate-600 mb-4 leading-relaxed">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Due {formatDate(task.dueDate)}</span>
              </div>
              
              {task.assignedTo && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{task.assignedTo}</span>
                </div>
              )}
            </div>

            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {task.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
