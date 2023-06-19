// Core
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

// Interfaces
import { Workout } from "../../interfaces/Workout";

// Utils
import { client } from "../../utils/apiClient"

export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async () => {
    const response = await client.get('/workouts')
    return response.data.data
})

export const createWorkout = createAsyncThunk('workouts/createWorkout', 
    async (requestBody, { getState }) => {
        const state: any = getState()
        const response = await client.post('/workouts', requestBody, { headers: { Authorization: `Bearer ${state.auth.data}` }})

        return response.data.data
    }
)

export const updateWorkout = createAsyncThunk('workouts/updateWorkout',
    async (requestBody: any , { getState }) => {
        const state: any = getState()
        await client.put(`/workouts/${requestBody.id}`, requestBody, { headers: { Authorization: `Bearer ${state.auth.data}` }})
    
        return {
            id: requestBody.id,
            duration_ingame: requestBody.duration_ingame,
            duration_real: requestBody.duration_real,
            kcal_ingame: requestBody.kcal_ingame,
            kcal_real: requestBody.kcal_real,
            start_at: requestBody.start_at,
            end_at: requestBody.end_at
        }
    }
)

export const deleteWorkout = createAsyncThunk('workouts/deleteWorkout', 
    async (id: number, { getState }) => {
        const state: any = getState()
        await client.delete(`/workouts/${id}`, { headers: { Authorization: `Bearer ${state.auth.data}` }})

        return id
    }
)

// these next 3 should just be updated to a workout's moves array

// export const addMoveToWorkout

// export const updateMoveInWorkout

// export const deleteMoveInWorkout

const workoutsAdapter = createEntityAdapter({
    sortComparer: (a: Workout, b: Workout) => b.start_at.localeCompare(a.start_at)
})

export const {
    selectAll: selectAllWorkouts,
    selectById: selectWorkoutById
} = workoutsAdapter.getSelectors((state: any) => state.workouts)

const initialState = workoutsAdapter.getInitialState({
    status: 'idle',
    error: null
})

const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    reducers: { },
    extraReducers: (builder: any) => {
        builder.addCase(fetchWorkouts.pending, (state: any, action: any) => {
            state.status = 'loading'
        })
        .addCase(fetchWorkouts.fulfilled, (state: any, action: any) => {
            state.status = 'succeeded'
            workoutsAdapter.setAll(state, action.payload)
        })
        .addCase(fetchWorkouts.rejected, (state: any, action: any) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(createWorkout.pending, (state: any, action: any) => {
            state.status = 'loading'
        })
        .addCase(createWorkout.fulfilled, (state: any, action: any) => {
            state.status = 'succeeded'
            workoutsAdapter.addOne(state, action.payload)
        })
        .addCase(createWorkout.rejected, (state: any, action: any) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(updateWorkout.pending, (state: any, action: any) => {
            state.status = 'loading'
        })
        .addCase(updateWorkout.fulfilled, (state: any, { payload }: any) => {
            state.status = 'succeeded'

            const { id, ...changes } = payload
            
            workoutsAdapter.updateOne(state, { id, changes })
        })
        .addCase(deleteWorkout.pending, (state: any, action: any) => {
            state.status = 'loading'
        })
        .addCase(deleteWorkout.fulfilled, (state: any, action: any) => {
            state.status = 'succeeded'
            workoutsAdapter.removeOne(state, action.payload)
        })
        .addCase(deleteWorkout.rejected, (state: any, action: any) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default workoutsSlice.reducer