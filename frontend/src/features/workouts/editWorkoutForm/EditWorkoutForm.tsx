// Core
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store, AppDispatch } from '../../../app/store'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import './EditWorkoutForm.css'

// Features
import { updateWorkout, selectWorkoutById, deleteWorkoutMove } from '../workoutsSlice'
import { selectAllMoveCategories } from '../../moveCategories/moveCategoriesSlice'
import { selectAllMoves } from '../../moves/movesSlice'

// Interfaces
import MoveAmount from '../../../interfaces/MoveAmount'

// Utils
import DateUtils from '../../../utils/dateUtils'
import Move from '../../../interfaces/Move'

export const EditWorkoutForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [submitError, setSubmitError] = useState(false)

  const params = useParams()
  const workout = useSelector((state) => selectWorkoutById(state, String(params.id)))
  const workoutsSliceStatus = useSelector(() => store.getState().workouts.status)

  const moveCategories: any[] = useSelector(selectAllMoveCategories)
  const moves: any[] = useSelector(selectAllMoves)

  const movesByCategory = (categoryID: number) => moves.filter((move) => move.category_id === categoryID)

  const [trackedDuration, setTrackedDuration] = useState('')
  const onTrackedDurationChange = (e: React.FormEvent<HTMLInputElement>) => setTrackedDuration((e.target as HTMLInputElement).value)

  const [ingameDuration, setIngameDuration] = useState('')
  const onIngameDurationChange = (e: React.FormEvent<HTMLInputElement>) => setIngameDuration((e.target as HTMLInputElement).value)

  const [trackedKcal, setTrackedKcal] = useState(0)
  const onTrackedKcalChange = (e: React.FormEvent<HTMLInputElement>) => setTrackedKcal(Number((e.target as HTMLInputElement).value))

  const [ingameKcal, setIngameKcal] = useState(0)
  const onIngameKcalChange = (e: React.FormEvent<HTMLInputElement>) => setIngameKcal(Number((e.target as HTMLInputElement).value))

  const [start, setStart] = useState('')
  const onStartChange = (e: React.FormEvent<HTMLInputElement>) => setStart((e.target as HTMLInputElement).value)

  const [end, setEnd] = useState('')
  const onEndChange = (e: React.FormEvent<HTMLInputElement>) => setEnd((e.target as HTMLInputElement).value)

  const [workoutMoves, setWorkoutMoves] = useState<MoveAmount[]>([])

  useEffect(() => {
    if (workoutsSliceStatus === 'succeeded') {
      if (workout === undefined) {
        navigate('/')
      } else {
        setTrackedDuration(DateUtils.secondsToReadableFormat(workout.duration_real))
        setIngameDuration(DateUtils.secondsToReadableFormat(workout.duration_ingame))
        setTrackedKcal(workout.kcal_real)
        setIngameKcal(workout.kcal_ingame)
        setStart(dayjs(workout.start_at).format('YYYY-MM-DDTHH:mm:ss'))
        setEnd(dayjs(workout.end_at).format('YYYY-MM-DDTHH:mm:ss'))
        setWorkoutMoves(
          workout.moves.map((move) => ({
            id: move.id,
            move: move.move,
            move_id: move.move_id,
            amount: move.amount
          }))
        )
      }
    }

    if (workoutsSliceStatus === 'failed') {
      setSubmitError(true)
    } else {
      setSubmitError(false)
    }
  }, [navigate, workout, workoutsSliceStatus])

  const onWorkoutMoveChange = (index: number, e: React.FormEvent<HTMLSelectElement>) => {
    const moveID = Number((e.target as HTMLSelectElement).value)
    const move = store.getState().moves.entities[moveID] as Move

    workoutMoves[index].move_id = moveID
    workoutMoves[index].move = move
  }

  const onWorkoutMoveAmountChange = (index: number, e: React.FormEvent<HTMLInputElement>) => {
    workoutMoves[index].amount = Number((e.target as HTMLInputElement).value)
  }

  const onAddWorkoutMoveButtonClicked = () => {
    const move = store.getState().moves.entities[moves[0].id] as Move

    setWorkoutMoves([...workoutMoves, { move_id: moves[0].id, amount: 0, move }])
  }

  const onRemoveMoveButtonClicked = (index: number) => {
    const moveToRemove = workoutMoves[index].id
    const updatedWorkoutMoves = workoutMoves
    updatedWorkoutMoves.splice(index, 1)

    setWorkoutMoves([...updatedWorkoutMoves])

    try {
      dispatch(
        deleteWorkoutMove({
          id: params.id,
          move_id: moveToRemove,
          moves: workoutMoves.map((move) => ({
            move_id: Number(move.move_id),
            amount: Number(move.amount)
          }))
        })
      )
    } catch (error) {
      console.error(`Failed to delete workout_move: ${error}`)
    }
  }

  const workoutMovesContent = workoutMoves.map((workoutMove, idx) => (
    <div className="ml-2 mt-2" key={idx}>
      <button title="Remove Move" className="edit-workout-form__remove-move-btn" onClick={() => onRemoveMoveButtonClicked(idx)}>
        <FontAwesomeIcon icon="square-minus" className="h-5" style={{ marginBottom: '-.2em' }} />
      </button>

      <select name={`workout-move-${idx}`} id={`workout-move-${idx}`} className="rfa-input sm:w-56 md:w-fit" onChange={(e) => onWorkoutMoveChange(idx, e)}>
        {moveCategories.map((moveCategory: any) => (
          <optgroup key={moveCategory.id} label={moveCategory.name}>
            {movesByCategory(moveCategory.id).map((move) => (
              <option key={move.id} value={move.id} selected={move.id === workoutMoves[idx].move_id}>
                {move.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <input
        type="number"
        name={`amount-${idx}`}
        id={`amount-${idx}`}
        className="rfa-input w-24 ml-2"
        min="0"
        defaultValue={workoutMoves[idx].amount}
        onChange={(e) => onWorkoutMoveAmountChange(idx, e)}
      />
    </div>
  ))

  const canSave = [trackedDuration, ingameDuration, trackedKcal, ingameKcal, start, end].every(Boolean)

  const onSubmitButtonClicked = async () => {
    try {
      setSubmitError(false)
      dispatch(
        updateWorkout({
          id: params.id,
          duration_ingame: DateUtils.hmsToSeconds(ingameDuration),
          duration_real: DateUtils.hmsToSeconds(trackedDuration),
          kcal_ingame: ingameKcal,
          kcal_real: trackedKcal,
          start_at: start,
          end_at: end,
          moves: workoutMoves.map((move) => ({
            move: move.move,
            move_id: Number(move.move_id),
            amount: Number(move.amount)
          }))
        })
      )
    } catch (error) {
      setSubmitError(true)
      console.error(`Failed to add workout: ${error}`)
    } finally {
      if (workoutsSliceStatus === 'succeeded') {
        navigate('/')
      }
    }
  }

  return (
    <div className="edit-workout-form">
      <div className="flex flex-col">
        <p className="edit-workout-form__title">Edit Workout {workout ? workout.id : ''}</p>
        <div className="edit-workout-form__info">
          <p className="edit-workout-form__header">Workout Details</p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-2">
            <div className="grid mx-2">
              <label htmlFor="start" className="edit-workout-form__label">
                Start <span className="edit-workout-form__required-field">*</span>
              </label>
              <input type="datetime-local" name="start" id="start" className="rfa-input sm:w-full md:w-56" step="1" value={start} onChange={onStartChange} />
            </div>

            <div className="grid mx-2">
              <label htmlFor="end" className="edit-workout-form__label">
                End <span className="edit-workout-form__required-field">*</span>
              </label>
              <input type="datetime-local" name="end" id="end" className="rfa-input sm:w-full md:w-56" step="1" value={end} onChange={onEndChange} />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
            <div className="grid mx-2">
              <label htmlFor="duration-real" className="edit-workout-form__label">
                Duration (tracked) <span className="edit-workout-form__required-field">*</span>
              </label>
              <input type="time" name="duration-real" id="duration-real" className="rfa-input sm:w-full md:w-40" step="1" value={trackedDuration} onChange={onTrackedDurationChange} />
            </div>

            <div className="grid mx-2">
              <label htmlFor="duration-ingame" className="edit-workout-form__label">
                Duration (in game) <span className="edit-workout-form__required-field">*</span>
              </label>
              <input type="time" name="duration-ingame" id="duration-ingame" className="rfa-input sm:w-full md:w-40" step="1" value={ingameDuration} onChange={onIngameDurationChange} />
            </div>

            <div className="grid mx-2">
              <label htmlFor="kcal-real" className="edit-workout-form__label">
                Kcal burned (tracked) <span className="edit-workout-form__required-field">*</span>
              </label>
              <input type="number" name="kcal-real" id="kcal-real" className="rfa-input sm:w-full md:w-40" min="0" value={trackedKcal} onChange={onTrackedKcalChange} />
            </div>

            <div className="grid mx-2">
              <label htmlFor="kcal-ingame" className="edit-workout-form__label">
                Kcal burned (in game) <span className="edit-workout-form__required-field">*</span>
              </label>
              <input type="number" name="kcal-ingame" id="kcal-ingame" className="rfa-input sm:w-full md:w-40" min="0" value={ingameKcal} onChange={onIngameKcalChange} />
            </div>
          </div>

          <div className="edit-workout-form__header mt-4">
            <p>Moves</p>
            <button className="edit-workout-form__add-move-btn" onClick={onAddWorkoutMoveButtonClicked}>
              Add Move
            </button>
          </div>

          {workoutMoves.length > 0 && (
            <div className="flex flex-row font-semibold mt-2">
              <p className="ml-9 text-orange-600">Move</p>
              <p className="sm:hidden md:block text-orange-600 ml-[14.25em]">Amount / Duration</p>
              <p className="sm:block md:hidden sm:ml-[12.25em] text-orange-600">Amount</p>
            </div>
          )}
          {workoutMovesContent}

          <div className="border-b py-2"></div>

          <div className="flex ml-auto mt-2">
            {submitError && <p className="text-xs text-red-700 mt-1 mr-2">An error occurred while editing the workout.</p>}

            <button className="edit-workout-form__submit-btn" onClick={onSubmitButtonClicked} disabled={!canSave}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
