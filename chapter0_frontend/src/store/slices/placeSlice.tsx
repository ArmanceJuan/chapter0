import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placeApiSlice = createApi({
  reducerPath: "placeReducer",
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
  tagTypes: ["places"],
  endpoints: (build) => ({
    getPlaces: build.query({
      query: (place) => ({
        url: `/${place.projectId}/place/all`,
        method: "GET",
      }),
      providesTags: ["places"],
    }),
    getPlace: build.query({
      query: (place) => ({
        url: `/${place.projectId}/place/${place.id}/view`,
        method: "GET",
      }),
      providesTags: ["places"],
    }),
    createPlace: build.mutation({
      query: (place) => ({
        url: `/${place.projectId}/place/create`,
        method: "POST",
        body: place,
      }),
      invalidatesTags: ["places"],
    }),
    updatePlace: build.mutation({
      query: (place) => ({
        url: `/${place.projectId}/place/${place.id}/edit`,
        method: "PATCH",
        body: place,
      }),
      invalidatesTags: ["places"],
    }),
    deletePlace: build.mutation({
      query: (place) => ({
        url: `/${place.projectId}/place/${place.id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["places"],
    }),
  }),
});

export const {
  useGetPlacesQuery,
  useGetPlaceQuery,
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
  useDeletePlaceMutation,
} = placeApiSlice;
