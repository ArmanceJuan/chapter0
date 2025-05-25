import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "./slices/userSlice";
import { projectApiSlice } from "./slices/projectSlice";
import { chapterApiSlice } from "./slices/chapterSlice";
import { characterApiSlice } from "./slices/characterSlice";
import { placeApiSlice } from "./slices/placeSlice";
import { storyArcApiSlice } from "./slices/storyArcSlice";
import { authApiSlice } from "./slices/authSlice";
import { usersProjectApiSlice } from "./slices/usersProjectSlice";
import { adminApiSlice } from "./slices/adminSlice";

const reducer = combineReducers({
  authReducer: authApiSlice.reducer,
  userReducer: userApiSlice.reducer,
  projectReducer: projectApiSlice.reducer,
  characterReducer: characterApiSlice.reducer,
  chapterReducer: chapterApiSlice.reducer,
  placeReducer: placeApiSlice.reducer,
  storyArcReducer: storyArcApiSlice.reducer,
  usersProjectReducer: usersProjectApiSlice.reducer,
  adminReducer: adminApiSlice.reducer,
});
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(projectApiSlice.middleware)
      .concat(characterApiSlice.middleware)
      .concat(placeApiSlice.middleware)
      .concat(storyArcApiSlice.middleware)
      .concat(chapterApiSlice.middleware)
      .concat(usersProjectApiSlice.middleware)
      .concat(adminApiSlice.middleware),
});
