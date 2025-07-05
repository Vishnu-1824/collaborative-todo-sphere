
import { Filter, CheckSquare, Clock, AlertCircle, Calendar, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FilterDropdown = ({ activeFilter, onFilterChange }) => {
  const filterOptions = [
    { value: 'all', label: 'All Tasks', icon: List },
    { value: 'pending', label: 'Pending', icon: Clock },
    { value: 'in-progress', label: 'In Progress', icon: AlertCircle },
    { value: 'completed', label: 'Completed', icon: CheckSquare },
    { value: 'due-today', label: 'Due Today', icon: Calendar },
    { value: 'overdue', label: 'Overdue', icon: AlertCircle }
  ];

  const currentFilter = filterOptions.find(option => option.value === activeFilter);

  return (
    <Select value={activeFilter} onValueChange={onFilterChange}>
      <SelectTrigger className="w-full sm:w-48">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <SelectValue>
            {currentFilter && (
              <div className="flex items-center gap-2">
                <currentFilter.icon className="h-4 w-4" />
                <span>{currentFilter.label}</span>
              </div>
            )}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {filterOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              <option.icon className="h-4 w-4" />
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterDropdown;
