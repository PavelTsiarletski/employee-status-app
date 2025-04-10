import { usersApi } from '@api/usersApi';
import styles from './EmployeeCard.module.css';
import { User, UserStatus, updateStatus } from '@store/employeesSlice';
import { useAppDispatch } from '@store/hooks';

interface Props {
  user: User;
}

const statusOptions: UserStatus[] = [
  'Working',
  'OnVacation',
  'LunchTime',
  'BusinessTrip',
];

export const EmployeeCard = ({ user }: Props) => {
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as UserStatus;
    dispatch(updateStatus({ userId: user.id, status: newStatus }));
    usersApi.updateStatus(user.id, newStatus).catch((err) => {
      console.error('Failed to update status:', err);
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatar} />
      <div className={styles.info}>
        <strong className={styles.name}>{user.name}</strong>
        <label className={styles.status}>
          Status:
          <select value={user.status} onChange={handleChange}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
