// Core
import './App.css'
import { Route, Routes } from 'react-router-dom'

// Components
import { TopBar } from './components/topBar/TopBar'

// Features
import { AddWorkoutForm } from './features/workouts/addWorkoutForm/AddWorkoutForm'
import { EditWorkoutForm } from './features/workouts/editWorkoutForm/EditWorkoutForm'
import { WorkoutDetails } from './features/workouts/workoutDetails/WorkoutDetails'
import { WorkoutsList } from './features/workouts/workoutsList/WorkoutsList'

export const App = () => (
  <div className="App">
    <TopBar />

    <Routes>
      <Route path="/" element={<WorkoutsList />} />
      <Route path="/add-workout" element={<AddWorkoutForm />} />
      <Route path="/edit-workout/:id" element={<EditWorkoutForm />} />
      <Route path="/workout/:id" element={<WorkoutDetails />} />
    </Routes>
  </div>
)
