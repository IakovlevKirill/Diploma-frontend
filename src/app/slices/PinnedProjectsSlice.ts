import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import {    Project} from "../../store/types.ts";

interface ProjectsSliceState {
    projects: Project[]
}

const initialState: ProjectsSliceState = {
    projects: []
};

export const PinnedProjectsSlice = createSlice({
    name: 'PinnedProjects',
    initialState,
    reducers: {
        addPinnedProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
        setPinnedProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
        unpinPinnedProject: (state, action: PayloadAction<Project>) => {
            state.projects = state.projects.filter(
                project => project.id !== action.payload.id
            );
        },
        deletePinnedProject: (state, action: PayloadAction<Project>) => {
            state.projects = state.projects.filter(
                project => project.id !== action.payload.id
            );
        },
    },
});

export const {
    addPinnedProject,
    setPinnedProjects,
    deletePinnedProject,
    unpinPinnedProject,
} = PinnedProjectsSlice.actions;

export default PinnedProjectsSlice.reducer;