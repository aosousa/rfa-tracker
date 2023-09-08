// Core
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../app/store'
import { NavLink } from 'react-router-dom'
import './WorkoutItem.css'

// Components
import DeleteWorkout from '../../../components/deleteWorkout/DeleteWorkout'

// Interfaces
import Workout from '../../../interfaces/Workout'

// Utils
import DateUtils from '../../../utils/dateUtils'

type WorkoutItemProps = {
  workout: Workout
}

export const WorkoutItem = ({ workout }: WorkoutItemProps) => {
  const workoutStartParsed = dayjs(workout.start_at).format('YYYY-MM-DD HH:mm:ss')

  const realDurationParsed = DateUtils.secondsToReadableFormat(workout.duration_real)
  const inGameDurationParsed = DateUtils.secondsToReadableFormat(workout.duration_ingame)

  const [deleteWorkoutModalIsOpen, setDeleteWorkoutModalIsOpen] = useState(false)

  const auth = useSelector(() => store.getState().auth.data)
  const workoutSliceStatus = useSelector(() => store.getState().workouts.status)

  useEffect(() => {
    if (workoutSliceStatus === 'succeeded') {
      setDeleteWorkoutModalIsOpen(false)
    }
  }, [workoutSliceStatus])

  return (
    <div className="workout-item">
      <div className="workout-item__grid">
        <div className="flex flex-col mt-1">{workoutStartParsed}</div>
        <div className="flex flex-col mt-1">{`${realDurationParsed} / ${inGameDurationParsed}`}</div>
        <div className="sm:hidden md:flex flex-col mt-1">{`${workout.kcal_real} / ${workout.kcal_ingame} kcal`}</div>
        <div className="flex ml-auto">
          <NavLink to={`/workout/${workout.id}`}>
            <button type="button" title="Workout Details" className="workout-item__view-btn">
              <FontAwesomeIcon icon="eye" />
            </button>
          </NavLink>

          {auth !== '' && (
            <NavLink to={`/edit-workout/${workout.id}`}>
              <button type="button" title="Edit Workout" className="workout-item__edit-btn">
                <FontAwesomeIcon icon="pencil" />
              </button>
            </NavLink>
          )}

          {auth !== '' && (
            <button type="button" title="Delete Workout" className="workout-item__delete-btn" onClick={() => setDeleteWorkoutModalIsOpen(true)}>
              <FontAwesomeIcon icon="trash" />
            </button>
          )}
        </div>
      </div>

      {deleteWorkoutModalIsOpen && <DeleteWorkout workoutID={workout.id} setDeleteWorkoutModalIsOpen={(modalStatus: boolean) => setDeleteWorkoutModalIsOpen(modalStatus)} />}
    </div>
  )
}
