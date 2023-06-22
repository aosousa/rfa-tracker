import "./App.css";
import { Route, Routes } from "react-router-dom";

import { TopBar } from "./components/TopBar";
import { AddWorkoutForm } from "./features/workouts/AddWorkoutForm";
import { EditWorkoutForm } from "./features/workouts/EditWorkoutForm";
import { WorkoutsList } from "./features/workouts/WorkoutsList";

export const App = () => {
  return (
    <div className="App">
      <TopBar />

      <Routes>
        <Route path="/" element={<WorkoutsList />} />
        <Route path="/add-workout" element={<AddWorkoutForm />} />
        <Route path="/edit-workout/:id" element={<EditWorkoutForm />} />
      </Routes>
    </div>
  );
};
