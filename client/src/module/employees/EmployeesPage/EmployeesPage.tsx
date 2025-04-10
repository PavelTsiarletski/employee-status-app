import { useMemo, useCallback, useState } from 'react';

import styles from './EmployeesPage.module.css';
import { Button, CreateUserModal, EmployeeCard } from '@components/index';
import { setStatusFilter, setSearchQuery } from '../store/employeesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useGetUsersQuery } from '../api/usersApi';

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
  const { statusFilter, searchQuery } = useAppSelector(
    (state) => state.employees
  );

  const { data: users = [], isLoading } = useGetUsersQuery();

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(
        setStatusFilter(e.target.value as (typeof statusOptions)[number])
      );
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch]
  );

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
      const matchesSearch = u.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [users, statusFilter, searchQuery]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className={styles.controls}>
        <Button size="lg" onClick={() => setModalOpen(true)}>
          Create +
        </Button>

        <div className={styles.filters}>
          <input
            type="text"
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Type to search"
          />
          <div className={styles.selectWrapper}>
            <select
              className={styles.statusSelect}
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
      </div>

      <div className={styles.grid}>
        {filteredUsers.map((user) => (
          <EmployeeCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};
