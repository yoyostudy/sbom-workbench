import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { INewProject, IProject, IWorkspaceCfg } from '@api/types';
import { fetchProjects, init, setSettings } from '@store/workspace-store/workspaceThunks';
import { RootState } from '@store/rootReducer';
import { IScan } from '@context/types';
import { IAppInfo } from '@api/dto';

export interface WorkspaceState {
  appInfo: IAppInfo,
  settings: IWorkspaceCfg,
  loading: boolean;
  projects: IProject[];
  currentProject: IProject;
  newProject: INewProject;
  scanPath: IScan;
}

const initialState: WorkspaceState = {
  appInfo: null,
  settings: null,
  loading: false,
  projects: null,
  currentProject: null,
  newProject: null,
  scanPath: null,
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setNewProject: (state, action: PayloadAction<INewProject>) => {
      state.newProject = action.payload;
    },
    setScanPath: (state, action: PayloadAction<IScan>) => {
      state.scanPath = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<IProject>) => {
      state.currentProject = action.payload;
    },
    setApis: (state, action: PayloadAction<any>) => {
      state.settings.APIS = action.payload;
    },
  },
  extraReducers: {
    [fetchProjects.pending.type]: (state) => ({ ...state, loading: true }),
    [fetchProjects.fulfilled.type]: (state, action: PayloadAction<IProject[]>) => ({
      ...state,
      loading: false,
      projects: action.payload,
    }),
    [fetchProjects.rejected.type]: (state) => ({ ...state, loading: false }),
    [init.fulfilled.type]: (state, action: PayloadAction<{ app: IAppInfo, settings: IWorkspaceCfg }>) => ({
      ...state,
      appInfo: action.payload.app,
      settings: action.payload.settings,
    }),
    [setSettings.fulfilled.type]: (state, action: PayloadAction<IWorkspaceCfg>) => ({
      ...state,
      settings: action.payload,
    }),
  },
});

// actions
export const { setNewProject, setScanPath, setCurrentProject, setApis } = workspaceSlice.actions;

// selectors
export const selectWorkspaceState = (state: RootState) => state.workspace;

export default workspaceSlice.reducer;
