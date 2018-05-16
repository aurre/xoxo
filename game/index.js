import { Map } from 'immutable';

// Initialize State
const initialState = {
  board: Map(),
  turn: 'X',
  winner: null,
};

export const move = (turn, [row, col]) => ({
  type: 'MOVE',
  turn,
  row,
  col,
});

function bad(state, action) {
  if (isNaN(action.row) || isNaN(action.col)) {
    return 'NaN';
  }
  if (action.row > 2 || action.row < 0) {
    return 'Out of bounds row input';
  }
  if (action.col > 2 || action.col < 0) {
    return 'Out of bounds column input';
  }
  if (state.board.getIn([action.row, action.col])) {
    return 'Sorry move has already been done';
  }
  return null;
}

const winner = board => {
  for (let x = 0; x < 3; x++) {
    if (
      board.getIn([x, 0]) === board.getIn([x, 1]) &&
      board.getIn([x, 0]) === board.getIn([x, 2]) &&
      (board.getIn([x, 0]) && board.getIn([x, 1]) && board.getIn([x, 2]))
    ) {
      return board.getIn([x, 0]);
    }
  }

  for (let y = 0; y < 3; y++) {
    if (
      board.getIn([0, y]) === board.getIn([1, y]) &&
      board.getIn([0, y]) === board.getIn([2, y]) &&
      (board.getIn([0, y]) && board.getIn([1, y]) && board.getIn([2, y]))
    ) {
      return board.getIn([0, y]);
    }
  }

  if (
    board.getIn([0, 0]) === board.getIn([1, 1]) &&
    board.getIn([0, 0]) === board.getIn([2, 2]) &&
    (board.getIn([0, 0]) && board.getIn([1, 1]) && board.getIn([2, 2]))
  ) {
    return board.getIn([0, 0]);
  }

  if (
    board.getIn([0, 2]) === board.getIn([1, 1]) &&
    board.getIn([0, 2]) === board.getIn([2, 0]) &&
    (board.getIn([2, 0]) && board.getIn([1, 1]) && board.getIn([0, 2]))
  ) {
    return board.getIn([0, 2]);
  }

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (!board.getIn([x, y])) {
        return null;
      }
    }
  }

  return 'draw';
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

export default function reducer(state = initialState, action) {
  // TODO

  const error = bad(state, action);
  if (error) {
    return Object.assign({}, state, error);
  } else {
    const nextBoard = boardReducer(state.board, action);
    const winnerOut = winner(nextBoard);

    return {
      board: nextBoard,
      turn: turnReducer(state.turn, action),
      winner: winnerOut,
    };
  }
}
