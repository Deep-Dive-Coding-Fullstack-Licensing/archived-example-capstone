import {createSlice} from '@reduxjs/toolkit'
import { httpConfig } from '../ui/shared/utils/httpConfig'

const slice = createSlice({
  name: "profiles",
  initialState: {},
  reducers: {
    setProfile: (profiles, action) => {
      profiles[action.payload.profileId] = action.payload.data
    }
  }
})

export const {setProfile} = slice.actions

export const fetchProfileByProfileId = (profileId) => async (dispatch, getState)=> {
  const state = getState()

  const profiles = state.profiles
  console.log(profiles[profileId])
  if(profiles[profileId] === undefined){
    const{data} = await httpConfig(`/apis/profile/${profileId}`)
    dispatch(setProfile({profileId, data}))
  }
}

export default slice.reducer