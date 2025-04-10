import React from 'react';
import { useUpdateStatusMutation } from '../../api/usersApi';
import styles from './EmployeeCard.module.css';
import { User, UserStatus } from '@module/employees/store/employeesSlice';
import clsx from 'clsx';

interface Props {
  user: User;
}

const statusOptions: UserStatus[] = [
  'Working',
  'OnVacation',
  'LunchTime',
  'BusinessTrip',
];

const statusToClassMap: Record<UserStatus, string> = {
  Working: styles.statusWorking,
  OnVacation: styles.statusVacation,
  LunchTime: styles.statusLunchTime,
  BusinessTrip: styles.statusBusinessTrip,
};

export const EmployeeCard = React.memo(({ user }: Props) => {
  const [updateStatus] = useUpdateStatusMutation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as UserStatus;
    updateStatus({ userId: user.id, status: newStatus }).catch((err) => {
      console.error('Failed to update status:', err);
    });
  };

  return (
    <div className={styles.card}>
      <img className={styles.avatar} src={user.img} alt={user.name} />
      <div className={styles.content}>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.statusRow}>
          <span
            className={clsx(styles.statusDot, statusToClassMap[user.status])}
          />
          <span className={styles.statusLabel}>{user.status}</span>
          <select
            value={user.status}
            onChange={handleChange}
            className={styles.statusSelect}
            title="Change status"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}, areEqual);

function areEqual(prev: Props, next: Props) {
  return (
    prev.user.id === next.user.id &&
    prev.user.name === next.user.name &&
    prev.user.status === next.user.status &&
    prev.user.img === next.user.img
  );
}
