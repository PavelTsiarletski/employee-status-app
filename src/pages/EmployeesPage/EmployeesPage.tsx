import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUsers, User } from '../../store/employeesSlice';

const mockUsers = [
  { id: '1', name: 'Johana Levi', status: 'Working' },
  { id: '2', name: 'Avraham Cohen', status: 'OnVacation' },
  { id: '3', name: 'Philip Leser', status: 'BusinessTrip' },
  { id: '4', name: 'Nicci Troiani', status: 'Working' },
  { id: '5', name: 'Franz Ferdinand', status: 'Working' },
  { id: '6', name: 'Rebecca Moore', status: 'BusinessTrip' },
] as User[];

export const EmployeesPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.employees.users);

  useEffect(() => {
    dispatch(setUsers(mockUsers));
  }, [dispatch]);

  return (
    <div>
      <h1>Employees</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '12px',
              width: '200px',
            }}
          >
            <strong>{user.name}</strong>
            <p>Status: {user.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
