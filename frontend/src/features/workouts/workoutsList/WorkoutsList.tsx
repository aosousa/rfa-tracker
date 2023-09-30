// Core
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { store } from '../../../app/store'
import './WorkoutsList.css'

// Components
import Pagination from '../../../components/pagination/Pagination'

// Features
import { selectAllWorkouts } from '../workoutsSlice'

// Interfaces
import { WorkoutItem } from '../workoutItem/WorkoutItem'

export const WorkoutsList = () => {
  const numItemsToShow = 10
  const auth = useSelector(() => store.getState().auth.data)
  const workouts = useSelector(selectAllWorkouts)

  const [workoutItems, setWorkoutItems] = useState<React.JSX.Element[]>([])
  const changeWorkoutItems = (pageNum: number) => {
    const start = pageNum * numItemsToShow
    const end = start + numItemsToShow > workouts.length ? workouts.length - 1 : start + numItemsToShow
    setWorkoutItems(workouts.slice(start, end).map((workout) => <WorkoutItem key={workout.id} workout={workout} />))
  }

  return (
    <div className="workouts">
      <div className="flex">
        <p className="workouts__title">Workouts</p>
        {auth !== '' && (
          <NavLink to="/add-workout" className="workouts__add-btn ml-auto mt-1">
            <button>Add Workout</button>
          </NavLink>
        )}
      </div>

      <div className="workouts__list">
        <div className="workouts__list-table">
          <div className="workouts__list-table-headers">
            <p className="flex flex-col">Date</p>
            <p className="flex flex-col">Duration (tracked / in game)</p>
            <p className="sm:hidden md:flex flex-col">Kcal burned (tracked / in game)</p>
            <p className="flex flex-col ml-auto">Actions</p>
          </div>
        </div>
        {workoutItems}
        <Pagination numItems={workouts.length} numItemsToShow={numItemsToShow} changePage={(pageNum) => changeWorkoutItems(pageNum)} />
      </div>
    </div>
  )
}
