import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { store, AppDispatch } from '../../app/store'

// Components
import Modal from '../../components/modal/Modal'

// Features
import { deleteWorkout } from '../../features/workouts/workoutsSlice'

type DeleteWorkoutProps = {
  workoutID: number
  setDeleteWorkoutModalIsOpen: (isOpen: boolean) => void
}

const DeleteWorkout = (props: DeleteWorkoutProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [deleteWorkoutError, setDeleteWorkoutError] = useState(false)

  const workoutSliceStatus = useSelector(() => store.getState().workouts.status)

  const onDeleteWorkoutButtonClicked = async () => {
    try {
      setDeleteWorkoutError(false)
      await dispatch(deleteWorkout(props.workoutID))
    } catch (error) {
      setDeleteWorkoutError(true)
      console.error(`Failed to delete workout: ${error}`)
    } finally {
      if (workoutSliceStatus === 'succeeded') {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    if (workoutSliceStatus === 'failed') {
      setDeleteWorkoutError(true)
    } else {
      setDeleteWorkoutError(false)
    }
  }, [workoutSliceStatus])

  return (
    <Modal title="Delete Workout" closeModal={() => props.setDeleteWorkoutModalIsOpen(false)}>
      <div>Are you sure you want to delete this workout?</div>

      {deleteWorkoutError && <div className="mt-1 text-xs text-red-700">An error occurred while deleting the workout.</div>}

      <div className="ml-auto mt-1">
        <button
          className="bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 hover:shadow-md font-semibold text-sm text-white outline-none rounded-md px-4 py-1 ml-auto mr-2"
          onClick={() => props.setDeleteWorkoutModalIsOpen(false)}
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
  )
}

export default DeleteWorkout
