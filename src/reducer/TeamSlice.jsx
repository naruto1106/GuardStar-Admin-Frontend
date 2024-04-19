import { createSlice } from "@reduxjs/toolkit";

export const TeamSlice = createSlice({
  name: "team",
  initialState: {
    teamlist: [],
    
  },
  reducers: {
    setTeamlist: (state, action) => {
      state.teamlist = action.payload.teamlist;
      
    },
  }
});

export const { setTeamlist } = TeamSlice.actions;

export const getTeamlist = (state) => state.team.teamlist;


export default TeamSlice.reducer;