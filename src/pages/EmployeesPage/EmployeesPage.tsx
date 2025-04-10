import { useState } from 'react';

const mockUsers = [
  { id: '1', name: 'Johana Levi', status: 'Working' },
  { id: '2', name: 'Avraham Cohen', status: 'OnVacation' },
  { id: '3', name: 'Philip Leser', status: 'BusinessTrip' },
];

const EmployeesPage = () => {
  const [users, setUsers] = useState(mockUsers);

  return (
    <div>
      <h1>Employees</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            {user.name} — {user.status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
