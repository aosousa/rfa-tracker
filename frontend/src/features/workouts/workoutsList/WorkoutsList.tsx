// Core
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { store, AppDispatch } from '../../../app/store'
import './WorkoutsList.css'

// Features
import { fetchWorkouts, selectAllWorkouts } from '../workoutsSlice'

// Interfaces
import { WorkoutItem } from '../workoutItem/WorkoutItem'

export const WorkoutsList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector(() => store.getState().auth.data)
  const workouts = useSelector(selectAllWorkouts)
  const workoutItems = workouts.map((workout) => <WorkoutItem key={workout.id} workout={workout} />)

  useEffect(() => {
    dispatch(fetchWorkouts())
  }, [dispatch])

  return (
    <div className="workouts">
      <div className="flex">
        <p className="workouts__title">Workouts</p>
        {auth !== '' && (
          <div className="ml-auto">
            <NavLink
              to="/add-workout"
              className="bg-green-600 hover:bg-green-700 focus:bg-green-700 font-semibold text-white rounded-md hover:shadow-md focus:shadow-md outline-none sm:px-2 md:px-4 py-1"
            >
              <button>Add Workout</button>
            </NavLink>
          </div>)}
      </div>

      <div className="workouts__list">
        <div className="workouts__list-table">
          <div className="workouts__list-table-headers">
            <div className="flex flex-col">Date</div>
            <div className="flex flex-col">Duration (tracked / in game)</div>
            <div className="sm:hidden md:flex flex-col">Kcal burned (tracked / in game)</div>
            <div className="flex flex-col ml-auto">Actions</div>
          </div>
        </div>
        {workoutItems}

      </div>
    </div>
  )
}
