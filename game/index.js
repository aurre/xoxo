import {Map} from 'immutable'


// Initialize State
const initialState = {
  board: Map(),
  turn: 'X'
}

export const move = (turn, [row, col]) => ({
  type: 'MOVE',
  turn,
  row,
  col
})

export default function reducer(state = initialState, action) {
  // TODO
  switch(action.type) {
    case 'MOVE':
      console.log(action)
      return {
        board: state.board.setIn([action.row, action.col], action.turn),
        turn: action.turn === 'X' ? 'O' : 'X'
      }
      
  }

  return state
}