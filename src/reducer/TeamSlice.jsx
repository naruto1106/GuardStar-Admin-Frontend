import { createSlice } from "@reduxjs/toolkit";

export const TeamSlice = createSlice({
  name: "team",
  initialState: {
    teamlist: [],
    incidentList : []
    
  },
  reducers: {
    setTeamlist: (state, action) => {
      state.teamlist = action.payload.teamlist;
      state.incidentList = action.payload.incidentList;
      
    },
  }
});

export const { setTeamlist } = TeamSlice.actions;

export const getTeamlist = (state) => state.team.teamlist;
export const getIncidentList = (state) => state.team.incidentList


export default TeamSlice.reducer;