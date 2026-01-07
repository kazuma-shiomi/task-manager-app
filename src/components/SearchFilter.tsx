import type { TaskStatus } from '../types/Task';
import { STATUS_LABELS } from '../types/Task';
import styles from './SearchFilter.module.css';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: TaskStatus | 'all';
  onStatusFilterChange: (status: TaskStatus | 'all') => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: SearchFilterProps) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="タスクを検索..."
        className={styles.searchInput}
        aria-label="検索"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as TaskStatus | 'all')}
        className={styles.filterSelect}
        aria-label="状態フィルタ"
      >
        <option value="all">すべて</option>
        {(Object.entries(STATUS_LABELS) as [TaskStatus, string][]).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
