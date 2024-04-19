import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthSlice";
import ChecklistSlice from "./ChecklistSlice";
import TeamSlice from "./TeamSlice";


export default configureStore({
  reducer: {
    auth: AuthSlice,
    openingchecklist: ChecklistSlice,
    team : TeamSlice
    // authentication: AuthenticationSlice,
    
  }
});