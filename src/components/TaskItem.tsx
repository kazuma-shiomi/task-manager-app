import { useState } from 'react';
import type { Task, TaskStatus } from '../types/Task';
import { STATUS_LABELS } from '../types/Task';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date(new Date().toDateString()) && task.status !== 'done';

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return '期限なし';
    const date = new Date(dateStr);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleTitleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed.length <= 100) {
      onUpdate(task.id, { title: trimmed });
    } else {
      setEditTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleStatusChange = (status: TaskStatus) => {
    onUpdate(task.id, { status });
  };

  const handleDateChange = (dueDate: string) => {
    onUpdate(task.id, { dueDate: dueDate || null });
  };

  return (
    <div className={`${styles.item} ${styles[task.status]}`}>
      <div className={styles.content}>
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
            className={styles.editInput}
            autoFocus
            aria-label="タスク名を編集"
          />
        ) : (
          <span
            className={styles.title}
            onClick={() => setIsEditing(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(true)}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className={`${styles.dueDate} ${isOverdue ? styles.overdue : ''}`}>
        <input
          type="date"
          value={task.dueDate || ''}
          onChange={(e) => handleDateChange(e.target.value)}
          className={styles.dateInput}
          aria-label="期限"
        />
        <span className={styles.dueDateText}>{formatDate(task.dueDate)}</span>
      </div>

      <select
        value={task.status}
        onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
        className={`${styles.statusSelect} ${styles[`status_${task.status}`]}`}
        aria-label="状態"
      >
        {(Object.entries(STATUS_LABELS) as [TaskStatus, string][]).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <button
        onClick={() => onDelete(task.id)}
        className={styles.deleteButton}
        aria-label="削除"
      >
        ×
      </button>
    </div>
  );
}
