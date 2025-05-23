import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
//utils
import { componentService } from "../componentService";
//models
import { ComponentView } from "../../../models/views/ComponentView";
import { CreateComponentRequest } from "../../../api/Component/models/CreateComponentRequest";
import { UpdateComponentRequest } from "../../../api/Component/models/UpdateComponentRequest";

export const componentAdapter = createEntityAdapter({
  selectId: (component: ComponentView) => component.id,
});

export const componentInitialState = componentAdapter.getInitialState({
  loading: false,
});

export const getComponentsByWorksheetId = createAsyncThunk(
  "component/getComponentsByWorksheetId",
  async (worksheetId: number, thunkAPI) => {
    const result = await componentService.GetComponentsByWorksheetId(
      worksheetId
    );
    return result;
  }
);

export const createComponent = createAsyncThunk(
  "component/createComponent",
  async (request: CreateComponentRequest, thunkAPI) => {
    const result = await componentService.CreateComponent(request);
    return result;
  }
);

export const updateComponent = createAsyncThunk(
  "component/updateComponent",
  async (request: UpdateComponentRequest, thunkAPI) => {
    const result = await componentService.UpdateComponent(request);
    return result;
  }
);

export const deleteComponent = createAsyncThunk(
  "component/deleteComponent",
  async (componentId: number, thunkAPI) => {
    const result = await componentService.DeleteComponent(componentId);
    return result;
  }
);

const componentSlice = createSlice({
  name: "component",
  initialState: componentInitialState,
  reducers: {
    addComponentToStore: (state, action) => {
      componentAdapter.addOne(state, action.payload);
    },
    updateComponentInStore: (state, action) => {
      componentAdapter.updateOne(state, action.payload);
    },
    removeComponentFromStore: (state, action) => {
      componentAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //GetComponentsByWorksheetId
      .addCase(getComponentsByWorksheetId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComponentsByWorksheetId.fulfilled, (state, action) => {
        state.loading = false;
        componentAdapter.setAll(state, action.payload);
      })
      .addCase(getComponentsByWorksheetId.rejected, (state) => {
        state.loading = false;
      })

      //CreateComponent
      .addCase(createComponent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComponent.fulfilled, (state, action) => {
        state.loading = false;
        componentAdapter.addOne(state, action.payload);
      })
      .addCase(createComponent.rejected, (state) => {
        state.loading = false;
      })

      //UpdateComponent
      .addCase(updateComponent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComponent.fulfilled, (state, action) => {
        state.loading = false;
        componentAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      })
      .addCase(updateComponent.rejected, (state) => {
        state.loading = false;
      })

      //DeleteComponent
      .addCase(deleteComponent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComponent.fulfilled, (state, action) => {
        state.loading = false;
        componentAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteComponent.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const componentSelectors = componentAdapter.getSelectors(
  (state: RootState) => state.component
);
export const selectComponentLoading = (state: RootState) =>
  state.component.loading;

export const {
  addComponentToStore,
  updateComponentInStore,
  removeComponentFromStore,
} = componentSlice.actions;
export default componentSlice.reducer;
