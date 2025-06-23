import { createSlice } from '@reduxjs/toolkit';

interface breadCrumb {
    index: number;
    name: string;
    layer_id: string;
}

interface BreadCrumbsSliceType {
    breadcrumbs: breadCrumb[];
}

const initialState: BreadCrumbsSliceType = {
    breadcrumbs: [],
};


export const BreadCrumbsSlice = createSlice({
    name: 'breadcrumbs',
    initialState,
    reducers: {
        addBreadCrumb: (state, action) => {
            state.breadcrumbs.push(action.payload);
        },
        clearBreadCrumbs: (state) => {
            state.breadcrumbs = [];
        },
        deleteBreadCrumbChildrenById: (state, action) => {
            const targetBreadcrumb = state.breadcrumbs.find(
                breadcrumb => breadcrumb.layer_id === action.payload
            );

            if (targetBreadcrumb) {
                const targetIndex = targetBreadcrumb.index;
                // Фильтруем крошки, оставляя только те, у которых индекс НЕ больше targetIndex
                state.breadcrumbs = state.breadcrumbs.filter(
                    breadcrumb => breadcrumb.index <= targetIndex
                );
            }
        }
    }
});

export const {
    addBreadCrumb,
    clearBreadCrumbs,
    deleteBreadCrumbChildrenById,
} = BreadCrumbsSlice.actions;

export default BreadCrumbsSlice.reducer;