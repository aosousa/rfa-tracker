import { Move } from "./Move"

export interface WorkoutMove {
    id: number
    workout_id: number
    move_id: number
    amount: number
    move: Move
}