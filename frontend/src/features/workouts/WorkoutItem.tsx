// Core
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store, AppDispatch } from '../../app/store'
import { NavLink } from 'react-router-dom'

// Components
import { Modal } from '../../components/Modal'

// Features
import { deleteWorkout } from './workoutsSlice'

// Utils
import { DateUtils } from '../../utils/dateUtils'

export const WorkoutItem = ({ workout }: any) => {
  const workoutStartParsed = dayjs(workout.start_at).format('YYYY-MM-DD HH:mm:ss')

  const realDurationParsed = DateUtils.secondsToReadableFormat(workout.duration_real)
  const inGameDurationParsed = DateUtils.secondsToReadableFormat(workout.duration_ingame)

  const [deleteWorkoutModalIsOpen, setDeleteWorkoutModalIsOpen] = useState(false)
  const [deleteWorkoutError, setDeleteWorkoutError] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector(() => store.getState().auth.data)
  const workoutSliceStatus = useSelector(() => store.getState().workouts.status)

  const onDeleteWorkoutButtonClicked = async () => {
    try {
      setDeleteWorkoutError(false)
      await dispatch(deleteWorkout(workout.id))
    } catch (error) {
      setDeleteWorkoutError(true)
      console.error(`Failed to delete workout: ${error}`)
    }
  }

  useEffect(() => {
    if (workoutSliceStatus === 'failed') {
      setDeleteWorkoutError(true)
    } else {
      setDeleteWorkoutError(false)

      if (workoutSliceStatus === 'succeeded') {
        setDeleteWorkoutModalIsOpen(false)
      }
    }
  }, [workoutSliceStatus])

  return (
    <div className="flex bg-white rounded-md p-2 my-2 border-2 border-gray-300">
      <div className="w-full grid sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="flex flex-col mt-1">{workoutStartParsed}</div>
        <div className="flex flex-col mt-1">{`${realDurationParsed} / ${inGameDurationParsed}`}</div>
        <div className="sm:hidden md:flex flex-col mt-1">{`${workout.kcal_real} / ${workout.kcal_ingame} kcal`}</div>
        <div className="flex ml-auto">
          <NavLink to={`/workout/${workout.id}`}>
            <button
              type="button"
              title="Workout Details"
              className="sm:w-6 md:w-8 sm:h-6 md:h-8 rounded-md border-2 bg-transparent hover:bg-gray-100 focus:bg-gray-100 text-gray-500 border-gray-500 outline-none sm:pb-6 md:pb-0"
            >
              <FontAwesomeIcon icon="eye" />
            </button>
          </NavLink>

          {auth !== '' && (
            <NavLink to={`/edit-workout/${workout.id}`}>
              <button
                type="button"
                title="Edit Workout"
                className="sm:w-6 md:w-8 sm:h-6 md:h-8 rounded-md border-2 bg-transparent hover:bg-sky-100 focus:bg-sky-100 text-sky-500 border-sky-500 outline-none ml-2 sm:pb-6 md:pb-0"
              >
                <FontAwesomeIcon icon="pencil" />
              </button>
            </NavLink>
          )}

          {auth !== '' && (
            <button
              type="button"
              title="Delete Workout"
              className="sm:w-6 md:w-8 sm:h-6 md:h-8 rounded-md border-2 bg-transparent hover:bg-red-100 focus:bg-red-100 text-red-500 border-red-500 outline-none ml-2 sm:pb-6 md:pb-0"
              onClick={() => setDeleteWorkoutModalIsOpen(true)}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          )}
        </div>
      </div>

      {deleteWorkoutModalIsOpen && (
        <Modal title="Delete Workout" closeModal={() => setDeleteWorkoutModalIsOpen(false)}>
          <div>Are you sure you want to delete this workout?</div>

          {deleteWorkoutError && <div className="mt-1 text-xs text-red-700">An error occurred while deleting the workout.</div>}

          <div className="ml-auto mt-1">
            <button
              className="bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 hover:shadow-md font-semibold text-sm text-white outline-none rounded-md px-4 py-1 ml-auto mr-2"
              onClick={() => setDeleteWorkoutModalIsOpen(false)}
            >
              Cancel
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 focus:bg-red-700 hover:shadow-md font-semibold text-sm text-white outline-none rounded-md px-4 py-1 ml-auto mr-2"
              onClick={onDeleteWorkoutButtonClicked}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
