// Core
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store, AppDispatch } from '../../../app/store'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AddWorkoutForm.css'

// Features
import { createWorkout } from '../workoutsSlice'
import { selectAllMoveCategories } from '../../moveCategories/moveCategoriesSlice'
import { selectAllMoves } from '../../moves/movesSlice'

// Interfaces
import Move from '../../../interfaces/Move'
import MoveAmount from '../../../interfaces/MoveAmount'

// Utils
import DateUtils from '../../../utils/dateUtils'

export const AddWorkoutForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [submitError, setSubmitError] = useState(false)

  const moveCategories: any[] = useSelector(selectAllMoveCategories)

  const moves: any[] = useSelector(selectAllMoves)
  const workoutsSliceStatus = useSelector(() => store.getState().workouts.status)

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
    const updatedWorkoutMoves = workoutMoves
    updatedWorkoutMoves.splice(index, 1)

    setWorkoutMoves([...updatedWorkoutMoves])
  }

  const workoutMovesContent = workoutMoves.map((workoutMove, idx) => (
    <div className="ml-2 mt-2" key={idx}>
      <button title="Remove Move" className="add-workout-form__remove-move-btn" onClick={() => onRemoveMoveButtonClicked(idx)}>
        <FontAwesomeIcon icon="square-minus" className="h-5" style={{ marginBottom: '-.2em' }} />
      </button>

      <select name={`workout-move-${idx}`} id={`workout-move-${idx}`} className="rfa-input" onChange={(e) => onWorkoutMoveChange(idx, e)}>
        {moveCategories.map((moveCategory: any) => (
          <optgroup key={moveCategory.id} label={moveCategory.name}>
            {movesByCategory(moveCategory.id).map((move) => (
              <option key={move.id} value={move.id}>
                {move.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <input type="number" name={`amount-${idx}`} id={`amount-${idx}`} min="0" className="rfa-input sm:w-12 md:w-24 ml-2" onChange={(e) => onWorkoutMoveAmountChange(idx, e)} />
    </div>
  ))

  const canSave = [trackedDuration, ingameDuration, trackedKcal, ingameKcal, start, end].every(Boolean)

  const onSubmitButtonClicked = async () => {
    try {
      setSubmitError(false)
      dispatch(
        createWorkout({
          duration_ingame: DateUtils.hmsToSeconds(ingameDuration),
          duration_real: DateUtils.hmsToSeconds(trackedDuration),
          kcal_ingame: ingameKcal,
          kcal_real: trackedKcal,
          start_at: start,
          end_at: end,
          moves: workoutMoves
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

  useEffect(() => {
    if (workoutsSliceStatus === 'failed') {
      setSubmitError(true)
    } else {
      setSubmitError(false)
    }
  }, [navigate, workoutsSliceStatus])

  return (
    <div className="add-workout-form">
      <div className="flex flex-col">
        <div className="add-workout-form__title">Add Workout</div>
        <div className="add-workout-form__info">
          <div className="add-workout-form__header">Workout Details</div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-2">
            <div className="grid mx-2">
              <label htmlFor="start" className="add-workout-form__label">
                Start <span className="add-workout-form__required-field">*</span>
              </label>
              <input type="datetime-local" name="start" id="start" className="rfa-input w-56" step="1" onChange={onStartChange} />
            </div>

            <div className="grid mx-2">
              <label htmlFor="end" className="add-workout-form__label">
                End <span className="add-workout-form__required-field">*</span>
              </label>
              <input type="datetime-local" name="end" id="end" className="rfa-input w-56" step="1" onChange={onEndChange} />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
            <div className="grid mx-2">
              <label htmlFor="duration-real" className="add-workout-form__label">
                Duration (tracked) <span className="add-workout-form__required-field">*</span>
              </label>
              <input type="time" name="duration-real" id="duration-real" className="rfa-input w-40" step="1" onChange={onTrackedDurationChange} />
            </div>

            <div className="grid mx-2">
              <label htmlFor="duration-ingame" className="add-workout-form__label">
                Duration (in game) <span className="add-workout-form__required-field">*</span>
              </label>
              <input type="time" name="duration-ingame" id="duration-ingame" className="rfa-input w-40" step="1" onChange={onIngameDurationChange} />
            </div>

            <div className="grid mx-2">
              <label htmlFor="kcal-real" className="add-workout-form__label">
                Kcal burned (tracked) <span className="add-workout-form__required-field">*</span>
              </label>
              <input type="number" name="kcal-real" id="kcal-real" className="rfa-input w-40" min="0" onChange={onTrackedKcalChange} />
            </div>

            <div className="grid mx-2">
              <label htmlFor="kcal-ingame" className="add-workout-form__label">
                Kcal burned (in game) <span className="add-workout-form__required-field">*</span>
              </label>
              <input type="number" name="kcal-ingame" id="kcal-ingame" className="rfa-input w-40" min="0" onChange={onIngameKcalChange} />
            </div>
          </div>

          <div className="add-workout-form__header mt-4">
            Moves
            <button className="add-workout-form__add-move-btn" onClick={onAddWorkoutMoveButtonClicked}>
              Add Move
            </button>
          </div>

          {workoutMoves.length > 0 && (
            <div className="flex flex-row font-semibold mt-2">
              <div className="ml-9 text-orange-600">Move</div>
              <div className="sm:hidden md:block text-orange-600 ml-56">Amount / Duration</div>
              <div className="sm:block md:hidden sm:ml-56 text-orange-600">Amount</div>
            </div>
          )}
          {workoutMovesContent}

          <div className="border-b py-2"></div>

          <div className="flex ml-auto mt-2">
            {submitError && <div className="text-xs text-red-700 mt-1 mr-2">An error occurred while creating the workout.</div>}

            <button className="add-workout-form__submit-btn" onClick={onSubmitButtonClicked} disabled={!canSave}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
