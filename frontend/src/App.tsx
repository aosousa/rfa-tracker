import "./App.css";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";

import { TopBar } from "./components/TopBar";
import { AddWorkoutForm } from "./features/workouts/AddWorkoutForm";
import { WorkoutsList } from "./features/workouts/WorkoutsList";

export const App = () => {
  return (
    <div className="App">
      <TopBar />

      <Routes>
        <Route path="/" element={<WorkoutsList />} />
        <Route path="/add-workout" element={<AddWorkoutForm />} />
      </Routes>
    </div>
  );
};
