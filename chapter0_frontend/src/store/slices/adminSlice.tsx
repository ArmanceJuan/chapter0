import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApiSlice = createApi({
  reducerPath: "adminReducer",
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
  tagTypes: ["admin"],
  endpoints: (build) => ({
    getAllUsers: build.query<any, void>({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    getAllProjects: build.query<any, void>({
      query: () => ({
        url: "/admin/projects",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAllProjectsQuery } = adminApiSlice;
