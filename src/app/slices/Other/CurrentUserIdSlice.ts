import { createSlice } from '@reduxjs/toolkit';

export const CurrentUserIdSlice = createSlice({
    name: 'userId',
    initialState: {
        userId: '',
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        }
    }
});

export const {
    setUserId
} = CurrentUserIdSlice.actions;

export default CurrentUserIdSlice.reducer;