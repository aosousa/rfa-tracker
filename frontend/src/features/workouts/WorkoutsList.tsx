// Core
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { store, AppDispatch } from '../../app/store'

// Features
import { fetchWorkouts, selectAllWorkouts } from './workoutsSlice'

// Interfaces
import { WorkoutItem } from './WorkoutItem'

export const WorkoutsList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector(() => store.getState().auth.data)
  const workouts = useSelector(selectAllWorkouts)
  const workoutItems = workouts.map((workout) => <WorkoutItem key={workout.id} workout={workout} />)

  useEffect(() => {
    dispatch(fetchWorkouts())
  }, [dispatch])

  return (
    <div className="flex flex-col py-2 lg:w-2/3 md:w-5/6 sm:px-2 mx-auto">
      <div className="flex">
        <p className="font-bold text-xl">Workouts</p>
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

      <div className="bg-white rounded-md p-2 mt-2">
        <div className="flex bg-white rounded-md p-1 mb-2">
          <div className="w-full grid sm:grid-cols-3 md:grid-cols-4 gap-4 font-semibold">
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
