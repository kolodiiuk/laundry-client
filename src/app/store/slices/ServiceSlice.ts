import {Service} from "../../models/Service";
import agent from "../../api/agent";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface ServiceState {
  services: Service[];
  filteredServices: Service[];
  error: string | null;
  loading: boolean;
}

const initialState: ServiceState = {
  services: [],
  filteredServices: [],
  loading: false,
  error: null,
}

export const fetchAllServices = createAsyncThunk(
  'services/fetchAllServices',
  async () => {
    const response = await agent.Services.getAll();
    return response;
  }
);

export const fetchAllAvailableServices = createAsyncThunk(
  'services/fetchAllAvailableServices',
  async () => {

    const response = await agent.Services.getAllAvailable();
    return response;
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (service: Omit<Service, 'id'>, {rejectWithValue}) => {

    try {
      const response = await agent.Services.create(service);
      return response;
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async (service: any, {rejectWithValue}) => {
    try {

      const response = await agent.Services.update(service);
      return response;
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (serviceId: number, {rejectWithValue}) => {

    try {
      await agent.Services.delete(serviceId);
      return serviceId;
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  }
);

export const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllServices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllServices.fulfilled, (state, action) => {
      state.loading = false;
      state.services = action.payload;
      state.filteredServices = action.payload;
    });
    builder.addCase(fetchAllServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch services';
    });

    builder.addCase(fetchAllAvailableServices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllAvailableServices.fulfilled, (state, action) => {
      state.loading = false;
      state.services = action.payload;
      state.filteredServices = action.payload;
    });
    builder.addCase(fetchAllAvailableServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch available services';
    });

    builder.addCase(createService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createService.fulfilled, (state, action) => {
      state.loading = false;
      state.services.push(action.payload); 
      state.filteredServices = state.services;
    });
    builder.addCase(createService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.services.findIndex(
        (service) => service.id === action.payload.id
      );
      if (index !== -1) {
        state.services[index] = action.payload;
        state.filteredServices = state.services; 
      }
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.loading = false;
      state.services = state.services.filter(
        (service) => service.id !== action.payload
      );
      state.filteredServices = state.services;
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }})

export const serviceActions = serviceSlice.actions;
export default serviceSlice.reducer;
