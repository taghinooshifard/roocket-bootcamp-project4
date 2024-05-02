import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
}

export const profileSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setProfile: (state, action) => {
        state.email = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProfile} = profileSlice.actions

export default profileSlice.reducer
