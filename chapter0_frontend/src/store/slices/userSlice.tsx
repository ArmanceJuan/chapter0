import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "userReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/user",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth-store");
      if (token) {
        const parsed = JSON.parse(token);
        if (parsed.state.token) {
          headers.set("Authorization", `Bearer ${parsed.state.token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["users"],
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    createUser: build.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: build.mutation({
      query: (user) => ({
        url: `/${user.id}/edit`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: build.mutation({
      query: (user) => ({
        url: `/${user.id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
