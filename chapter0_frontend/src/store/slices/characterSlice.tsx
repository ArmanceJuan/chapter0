import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const characterApiSlice = createApi({
  reducerPath: "characterReducer",
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
  tagTypes: ["characters"],
  endpoints: (build) => ({
    getCharacters: build.query({
      query: (character) => ({
        url: `/${character.projectId}/character/all`,
        method: "GET",
      }),
      providesTags: ["characters"],
    }),
    getCharacter: build.query({
      query: (character) => ({
        url: `/${character.projectId}/character/${character.id}/view`,
        method: "GET",
      }),
      providesTags: ["characters"],
    }),
    createCharacter: build.mutation({
      query: (character) => ({
        url: `/${character.projectId}/character/create`,
        method: "POST",
        body: character,
      }),
      invalidatesTags: ["characters"],
    }),
    updateCharacter: build.mutation({
      query: (character) => ({
        url: `/${character.projectId}/character/${character.id}/edit`,
        method: "PATCH",
        body: character,
      }),
      invalidatesTags: ["characters"],
    }),
    deleteCharacter: build.mutation({
      query: (character) => ({
        url: `/${character.projectId}/character/${character.id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["characters"],
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useCreateCharacterMutation,
  useUpdateCharacterMutation,
  useDeleteCharacterMutation,
} = characterApiSlice;
