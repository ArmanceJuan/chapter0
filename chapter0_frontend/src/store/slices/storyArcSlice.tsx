import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storyArcApiSlice = createApi({
  reducerPath: "storyArcReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/project",
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
  tagTypes: ["storyarcs"],
  endpoints: (build) => ({
    getStoryArcs: build.query({
      query: (storyArc) => ({
        url: `/${storyArc.projectId}/storyarc/all`,
        method: "GET",
      }),
      providesTags: ["storyarcs"],
    }),
    getStoryArc: build.query({
      query: (storyarc) => ({
        url: `/${storyarc.projectId}/storyarc/${storyarc.id}/view`,
        method: "GET",
      }),
      providesTags: ["storyarcs"],
    }),
    createStoryArc: build.mutation({
      query: (storyArc) => ({
        url: `/${storyArc.projectId}/storyarc/create`,
        method: "POST",
        body: storyArc,
      }),
      invalidatesTags: ["storyarcs"],
    }),
    updateStoryArc: build.mutation({
      query: (storyArc) => ({
        url: `/${storyArc.projectId}/storyarc/${storyArc.id}/edit`,
        method: "PATCH",
        body: storyArc,
      }),
      invalidatesTags: ["storyarcs"],
    }),
    deleteStoryArc: build.mutation({
      query: (storyArc) => ({
        url: `/${storyArc.projectId}/storyarc/${storyArc.id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["storyarcs"],
    }),
  }),
});

export const {
  useGetStoryArcsQuery,
  useGetStoryArcQuery,
  useCreateStoryArcMutation,
  useUpdateStoryArcMutation,
  useDeleteStoryArcMutation,
} = storyArcApiSlice;
