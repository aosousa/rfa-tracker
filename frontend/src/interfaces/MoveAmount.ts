import Move from './Move'

export default interface MoveAmount {
  id?: number
  move?: Move
  move_id: number
  amount: number
}
