import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../module/employees/store/employeesSlice';
import { usersApi } from '../module/employees/api/usersApi';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
