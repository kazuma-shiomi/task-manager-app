import { useState, type FormEvent } from 'react';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  onAdd: (title: string, dueDate: string | null) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('タスク名を入力してください');
      return;
    }

    if (trimmedTitle.length > 100) {
      setError('タスク名は100文字以内で入力してください');
      return;
    }

    if (dueDate && dueDate < today) {
      setError('期限は今日以降の日付を選択してください');
      return;
    }

    onAdd(trimmedTitle, dueDate || null);
    setTitle('');
    setDueDate('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タスク名を入力"
          className={styles.titleInput}
          aria-label="タスク名"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
          className={styles.dateInput}
          aria-label="期限"
        />
        <button type="submit" className={styles.addButton}>
          追加
        </button>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </form>
  );
}
