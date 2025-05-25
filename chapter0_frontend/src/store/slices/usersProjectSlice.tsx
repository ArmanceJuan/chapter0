import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersProjectApiSlice = createApi({
  reducerPath: "usersProjectReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
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
  tagTypes: ["usersProject"],
  endpoints: (build) => ({
    getProjectsByUser: build.query({
      query: (userId) => ({
        url: `/user/${userId}/projects`,
        method: "GET",
      }),
      providesTags: ["usersProject"],
    }),
    getUsersByProject: build.query({
      query: (projectId) => ({
        url: `/project/${projectId}/users`,
        method: "GET",
      }),
      providesTags: ["usersProject"],
    }),
    addUserToProject: build.mutation({
      query: ({ projectId, userId, role }) => ({
        url: `/project/${projectId}/user/add`,
        method: "POST",
        body: { userId, role },
      }),
      invalidatesTags: ["usersProject"],
    }),
    updateUserRole: build.mutation({
      query: ({ projectId, userId, role }) => ({
        url: `/project/${projectId}/user/${userId}/edit-role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["usersProject"],
    }),
    removeUserFromProject: build.mutation({
      query: ({ projectId, userId }) => ({
        url: `/project/${projectId}/user/${userId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["usersProject"],
    }),
  }),
});

export const {
  useGetProjectsByUserQuery,
  useGetUsersByProjectQuery,
  useAddUserToProjectMutation,
  useUpdateUserRoleMutation,
  useRemoveUserFromProjectMutation,
} = usersProjectApiSlice;
