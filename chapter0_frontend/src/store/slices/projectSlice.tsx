import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApiSlice = createApi({
  reducerPath: "projectReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/project",
    credentials: "include",
  }),
  tagTypes: ["projects"],
  endpoints: (build) => ({
    getProjects: build.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    getProject: build.query({
      query: (project) => ({
        url: `/${project.id}/view`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    createProject: build.mutation({
      query: (project) => ({
        url: "/create",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["projects"],
    }),
    updateProject: build.mutation({
      query: (project) => ({
        url: `/${project.id}/edit`,
        method: "PATCH",
        body: project,
      }),
      invalidatesTags: ["projects"],
    }),
    deleteProject: build.mutation({
      query: (project) => ({
        url: `/${project.id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice;
