import { Move } from './Move'

export interface MoveAmount {
  id?: number
  move?: Move
  move_id: number
  amount: number
}
