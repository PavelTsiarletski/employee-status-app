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
  img: string;
}

interface EmployeesState {
  searchQuery: string;
  statusFilter: UserStatus | 'All';
}

const initialState: EmployeesState = {
  searchQuery: '',
  statusFilter: 'All',
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<UserStatus | 'All'>) {
      state.statusFilter = action.payload;
    },
  },
});

export const { setSearchQuery, setStatusFilter } = employeesSlice.actions;
export default employeesSlice.reducer;
