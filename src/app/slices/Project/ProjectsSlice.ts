import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import {    Project} from "../../../store/types.ts";

interface ProjectsSliceState {
    projects: Project[]
}

const initialState: ProjectsSliceState = {
    projects: []
};

export const ProjectsSlice = createSlice({
    name: 'Projects',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
        deleteProject: (state, action: PayloadAction<Project>) => {
            state.projects = state.projects.filter(
                project => project.id !== action.payload.id
            );
        },
    },
});

export const {
    addProject,
    setProjects,
    deleteProject,
} = ProjectsSlice.actions;

export default ProjectsSlice.reducer;