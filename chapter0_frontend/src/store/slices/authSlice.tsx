import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "authReducer",
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
  tagTypes: ["auth"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    login: build.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUser: build.query<void, void>({
      query: () => ({
        url: `/me`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApiSlice;
