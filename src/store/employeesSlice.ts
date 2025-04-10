import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserStatus =
  | 'Working'
  | 'OnVacation'
  | 'LunchTime'
  | 'BusinessTrip';

export interface User {
  id: string;
  name: string;
  status: UserStatus;
}

interface EmployeesState {
  users: User[];
  searchQuery: string;
  statusFilter: UserStatus | 'All';
}

const initialState: EmployeesState = {
  users: [],
  searchQuery: '',
  statusFilter: 'All',
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    updateStatus(
      state,
      action: PayloadAction<{ userId: string; status: UserStatus }>
    ) {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) user.status = action.payload.status;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<UserStatus | 'All'>) {
      state.statusFilter = action.payload;
    },
  },
});

export const { setUsers, updateStatus, setSearchQuery, setStatusFilter } =
  employeesSlice.actions;
export default employeesSlice.reducer;
