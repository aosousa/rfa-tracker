import Move from './Move'

export default interface WorkoutMove {
  id: number
  workout_id: number
  move_id: number
  amount: number
  move: Move
}
