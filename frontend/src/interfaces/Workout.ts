import { WorkoutMove } from './WorkoutMove'

export interface Workout {
    id: number
    duration_ingame: number
    duration_real: number
    kcal_ingame: number
    kcal_real: number
    start_at: string
    end_at: string
    moves: WorkoutMove[]
}