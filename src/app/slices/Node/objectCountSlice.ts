
import { createSlice } from '@reduxjs/toolkit';

export const objectCountSlice = createSlice({
    name: 'objectCount',
    initialState: {
        objectCount: 1,
    },
    reducers: {
        incrementObjectCount: (state) => {
            state.objectCount += 1;
        },
        setObjectCount: (state, action) => {
            state.objectCount = action.payload;
        }
    }
});

export const { incrementObjectCount, setObjectCount } = objectCountSlice.actions;

export default objectCountSlice.reducer;