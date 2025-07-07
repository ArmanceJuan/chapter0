import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chapterApiSlice = createApi({
  reducerPath: "chapterReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/project",
    credentials: "include",
  }),
  tagTypes: ["chapters"],
  endpoints: (build) => ({
    getChapters: build.query({
      query: (chapter) => ({
        url: `/${chapter.projectId}/chapter/all`,
        method: "GET",
      }),
      providesTags: ["chapters"],
    }),
    getChapter: build.query({
      query: (chapter) => ({
        url: `/${chapter.projectId}/chapter/${chapter.id}/view`,
        method: "GET",
      }),
      providesTags: ["chapters"],
    }),
    createChapter: build.mutation({
      query: (chapter) => ({
        url: `/${chapter.projectId}/chapter/create`,
        method: "POST",
        body: chapter,
      }),
      invalidatesTags: ["chapters"],
    }),
    updateChapter: build.mutation({
      query: (chapter) => ({
        url: `/${chapter.projectId}/chapter/${chapter.id}/edit`,
        method: "PATCH",
        body: chapter,
      }),
      invalidatesTags: ["chapters"],
    }),
    deleteChapter: build.mutation({
      query: (chapter) => ({
        url: `/${chapter.projectId}/chapter/${chapter.id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["chapters"],
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetChapterQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = chapterApiSlice;
