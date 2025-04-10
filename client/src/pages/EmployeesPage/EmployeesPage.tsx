import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  setUsers,
  setStatusFilter,
  setSearchQuery,
  User,
} from '@store/employeesSlice';
import { EmployeeCard } from '@components/EmployeeCard/EmployeeCard';
import { usersApi } from '@api/usersApi';
import { CreateUserModal } from '@components/CreateUserModal/CreateUserModal';

const mockUsers = [
  { id: '1', name: 'Johana Levi', status: 'Working' },
  { id: '2', name: 'Avraham Cohen', status: 'OnVacation' },
  { id: '3', name: 'Philip Leser', status: 'BusinessTrip' },
  { id: '4', name: 'Nicci Troiani', status: 'Working' },
  { id: '5', name: 'Franz Ferdinand', status: 'Working' },
  { id: '6', name: 'Rebecca Moore', status: 'BusinessTrip' },
] as User[];

const statusOptions = [
  'All',
  'Working',
  'OnVacation',
  'LunchTime',
  'BusinessTrip',
] as const;

export const EmployeesPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { users, statusFilter, searchQuery } = useAppSelector(
    (state) => state.employees
  );

  useEffect(() => {
    dispatch(setUsers(mockUsers));
  }, [dispatch]);

  useEffect(() => {
    usersApi
      .getAll()
      .then((users) => dispatch(setUsers(users)))
      .catch((err) => {
        console.error('Failed to fetch users:', err);
      });
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatusFilter(e.target.value as (typeof statusOptions)[number]));
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const filteredUsers = users.filter((u) => {
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    const matchesSearch = u.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <h1>Employees</h1>
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div style={{ display: 'flex', gap: '16px', marginBottom: 16 }}>
        <button onClick={() => setModalOpen(true)}>Create +</button>
        <div>
          <label htmlFor="search">Search by name: </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Enter employee name"
          />
        </div>
        <div>
          <label htmlFor="status-filter">Filter by status: </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filteredUsers.map((user) => (
          <EmployeeCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
