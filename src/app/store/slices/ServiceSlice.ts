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

export const fetchAllAvailableServices = createAsyncThunk<Service[]>(
  'services/fetchAllAvailableServices',
  async () => {

    const response = await agent.Services.getAllAvailable();
    return response;
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (service: Omit<Service, 'serviceId'>, {rejectWithValue}) => {

    try {

      const response = await agent.Services.create(service);
      return response;
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  }
);

// Async Thunk: Update an existing service
export const updateService = createAsyncThunk(
  'services/updateService',
  async (service: Service, {rejectWithValue}) => {
    try {

      const response = await agent.Services.update(service);
      return response;
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  }
);

// Async Thunk: Delete a service
export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (serviceId: number, {rejectWithValue}) => {

    try {
      await agent.Services.delete(serviceId); // Use the Services API utility
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
    // Handle fetchAllServices lifecycle
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

    // Handle fetchAllAvailableServices lifecycle
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

    // Handle createService lifecycle
    builder.addCase(createService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createService.fulfilled, (state, action) => {
      state.loading = false;
      state.services.push(action.payload); // Add the new service
      state.filteredServices = state.services; // Update filteredServices
    });
    builder.addCase(createService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle updateService lifecycle
    builder.addCase(updateService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.services.findIndex(
        (service) => service.serviceId === action.payload.serviceId
      );
      if (index !== -1) {
        state.services[index] = action.payload; // Update the service
        state.filteredServices = state.services; // Update filteredServices
      }
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle deleteService lifecycle
    builder.addCase(deleteService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.loading = false;
      state.services = state.services.filter(
        (service) => service.serviceId !== action.payload
      );
      state.filteredServices = state.services; // Update filteredServices
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
})

export const serviceActions = serviceSlice.actions;
export default serviceSlice.reducer;