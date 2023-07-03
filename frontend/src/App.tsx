import './App.css'
import { Route, Routes } from 'react-router-dom'

import { TopBar } from './components/TopBar'
import { AddWorkoutForm } from './features/workouts/AddWorkoutForm'
import { EditWorkoutForm } from './features/workouts/EditWorkoutForm'
import { WorkoutDetails } from './features/workouts/WorkoutDetails'
import { WorkoutsList } from './features/workouts/WorkoutsList'

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
