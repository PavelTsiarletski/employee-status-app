import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserStatus } from '../store/employeesSlice';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    updateStatus: builder.mutation<
      User,
      { userId: string; status: UserStatus }
    >({
      query: ({ userId, status }) => ({
        url: `/users/${userId}`,
        method: 'POST',
        body: { status },
      }),
      invalidatesTags: ['Users'],
    }),
    createUser: builder.mutation<User, { name: string; status: UserStatus }>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateStatusMutation,
  useCreateUserMutation,
} = usersApi;
