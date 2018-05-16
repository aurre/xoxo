import { Map } from 'immutable';

// Initialize State
const initialState = {
  board: Map(),
  turn: 'X',
};

export const move = (turn, [row, col]) => ({
  type: 'MOVE',
  turn,
  row,
  col,
});

const winner = board => {
  console.log(board);
  for (let x = 0; x < 3; x++) {
    if ((board.get(x).get(0) === board.get(x).get(1)) === board.get(x).get(2)) {
      return board.get(x).get(0);
    }
  }

  for (let y = 0; y < 3; y++) {
    if ((board.get(0).get(y) === board.get(1).get(y)) === board.get(2).get(y)) {
      return board.get(0).get(y);
    }
  }

  if ((board.get(0).get(0) === board.get(1).get(1)) === board.get(2).get(2)) {
    return board.get(0).get(0);
  }
  if ((board.get(2).get(0) === board.get(1).get(1)) === board.get(0).get(2)) {
    return board.get(2).get(0);
  }

  if (board.keySeq().toArray().length === 9) {
    return 'draw';
  }
  return null;
};

function turnReducer(turn = 'X', action) {
  if (action.type === 'MOVE') return turn === 'X' ? 'O' : 'X';
  return turn;
}

function boardReducer(board = Map(), action) {
  if (action.type === 'MOVE')
    return board.setIn([action.row, action.col], action.turn);
  return board;
}

export default function reducer(state = {}, action) {
  // TODO
  switch (action.type) {
    case 'MOVE':
      console.log(action);
      return {
        board: boardReducer(state.board, action),
        turn: turnReducer(state.turn, action),
      };
  }

  return state;
}
