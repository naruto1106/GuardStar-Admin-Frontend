import { createSlice } from "@reduxjs/toolkit";

export const ChecklistSlice = createSlice({
  name: "checkType",
  initialState: {
    openingchecklist: [],
    closingchecklist: [],
    editchecklist: [],
    // userInfo: {}
  },
  reducers: {
    setOpeningChecklist: (state, action) => {
      state.openingchecklist = action.payload.openingchecklist;
      state.closingchecklist = action.payload.closingchecklist;
      state.editchecklist = action.payload.editchecklist;
      // state.userInfo = action.payload.userInfo;
    },
  }
});

export const { setOpeningChecklist } = ChecklistSlice.actions;

export const getOpeningChecklist = (state) => state.openingchecklist.openingchecklist;
export const getClosingChecklist = (state) => state.openingchecklist.closingchecklist;
export const EditChecklist = (state) => state.openingchecklist.editchecklist;

// export const getUserInfo = (state) => state.auth.userInfo;

export default ChecklistSlice.reducer;