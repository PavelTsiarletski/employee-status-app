import { useState } from 'react';
import styles from './CreateUserModal.module.css';
import { UserStatus } from '@module/employees/store/employeesSlice';
import { useCreateUserMutation } from '@module/employees/api/usersApi';
import { toast } from '@helpers/toast';
import { Button } from '@components/index';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const statuses: UserStatus[] = [
  'Working',
  'OnVacation',
  'LunchTime',
  'BusinessTrip',
];

export const CreateUserModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<UserStatus>('Working');
  const [createUser, { isLoading }] = useCreateUserMutation();

  const isValidName = /^[A-Za-z\s]+$/.test(name);

  const handleCreate = async () => {
    if (!isValidName) return;

    try {
      const created = await createUser({ name, status }).unwrap();
      toast.success(`User "${created.name}" created`);
      onClose();
      setName('');
      setStatus('Working');
    } catch (err) {
      console.error('Failed to create user:', err);
      toast.error('Could not create user');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create New User</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.field}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
            />
            {!isValidName && name && (
              <p className={styles.error}>Only English letters allowed</p>
            )}
          </div>

          <div className={styles.field}>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as UserStatus)}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.actions}>
            <Button onClick={handleCreate} disabled={!isValidName || isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
