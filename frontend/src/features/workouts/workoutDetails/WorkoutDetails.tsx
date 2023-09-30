// Core
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { store } from '../../../app/store'
import './WorkoutDetails.css'

// Components
import DeleteWorkout from '../../../components/deleteWorkout/DeleteWorkout'
import WorkoutDetail from '../../../components/workoutDetail/WorkoutDetail'

// Features
import { selectAllMoveCategories } from '../../moveCategories/moveCategoriesSlice'
import { selectWorkoutById } from '../workoutsSlice'

// Interfaces
import WorkoutMove from '../../../interfaces/WorkoutMove'

// Utils
import DateUtils from '../../../utils/dateUtils'

export const WorkoutDetails = () => {
  const navigate = useNavigate()

  const auth = useSelector(() => store.getState().auth.data)

  const params = useParams()
  const workout = useSelector((state) => selectWorkoutById(state, String(params.id)))
  const workoutSliceStatus = useSelector(() => store.getState().workouts.status)

  const [deleteWorkoutModalIsOpen, setDeleteWorkoutModalIsOpen] = useState(false)

  const movesByCategory = (categoryID: number): WorkoutMove[] | undefined => workout?.moves.filter((workoutMove: WorkoutMove) => workoutMove.move.category_id === categoryID)

  const moveCategories = useSelector(selectAllMoveCategories)
  const moveCategoriesContent = moveCategories.map((moveCategory: any) => (
    <div className="grid" key={moveCategory.id}>
      <div
        className="font-semibold rounded-md mt-2"
        style={{
          backgroundColor: moveCategory.background,
          color: moveCategory.color
        }}
      >
        <p className="border-b border-white text-xl px-2 py-1 mb-1">{moveCategory.name}</p>
        {movesByCategory(moveCategory.id)?.map((workoutMove: WorkoutMove) => (
          <p className="px-2 py-0.5" key={workoutMove.id}>
            {workoutMove.move.name} ({workoutMove.amount} {workoutMove.move.unit})
          </p>
        ))}
      </div>
    </div>
  ))

  const trackedDuration = DateUtils.secondsToReadableFormat(workout?.duration_real)
  const ingameDuration = DateUtils.secondsToReadableFormat(workout?.duration_ingame)
  const start = dayjs(workout?.start_at).format('YYYY-MM-DD HH:mm:ss')
  const end = dayjs(workout?.end_at).format('YYYY-MM-DD HH:mm:ss')

  useEffect(() => {
    if (workoutSliceStatus === 'succeeded' && workout === undefined) {
      navigate('/')
    }
  }, [workoutSliceStatus, navigate, workout])

  return (
    <div className="workout-details">
      <div className="flex flex-col">
        <div className="flex">
          <p className="workout-details__title">Workout {workout ? workout.id : ''}</p>
          {auth !== '' && (
            <div className="flex ml-auto">
              <NavLink
                to={`/edit-workout/${workout?.id}`}
                className="bg-sky-600 hover:bg-sky-700 focus:bg-sky-700 font-semibold text-white rounded-md hover:shadow-md focus:shadow-md outline-none px-4 py-0.5 mt-1"
              >
                <button>Edit</button>
              </NavLink>
              <button
                className="bg-red-600 hover:bg-red-700 focus:bg-red-700 font-semibold text-white rounded-md hover:shadow-md focus:shadow-md outline-none px-4 py-0.5 ml-2 mt-1"
                onClick={() => setDeleteWorkoutModalIsOpen(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="workout-details__info">
          <p className="font-bold text-xl text-orange-500 border-b px-1 mb-2 pb-2">Workout Details</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <WorkoutDetail label="Start" value={start} />
            <WorkoutDetail label="End" value={end} />
            <WorkoutDetail label="Duration (tracked)" value={trackedDuration} />
            <WorkoutDetail label="Duration (in game)" value={ingameDuration} />
            <WorkoutDetail label="Kcal burned (tracked)" value={workout ? workout.kcal_real : 0} />
            <WorkoutDetail label="Kcal burned (in game)" value={workout ? workout.kcal_ingame : 0} />
          </div>
          <p className="font-bold text-xl text-orange-500 border-b px-1 mt-4 pb-2">Moves</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">{moveCategoriesContent}</div>
        </div>
      </div>

      {deleteWorkoutModalIsOpen && <DeleteWorkout workoutID={workout!.id} setDeleteWorkoutModalIsOpen={(modalStatus: boolean) => setDeleteWorkoutModalIsOpen(modalStatus)} />}
    </div>
  )
}
