import { StrokeAction } from '../actions/drawing';

const initialState = {
  isDrawing: false,
  isEndStroke: false,
  strokes: [],
};

const drawing = (state = initialState, action) => {
  switch (action.type) {
    case StrokeAction.ADD_STROKE:
      return {
        ...state,
        isDrawing: true,
        isEndStroke: false,
        strokes: [...state.strokes, [action.pos]],
      };
    case StrokeAction.ADD_STROKE_POS:
      return {
        ...state,
        strokes: [
          ...state.strokes.slice(0, state.strokes.length - 1),
          [...state.strokes[state.strokes.length - 1], action.pos],
        ],
      };
    case StrokeAction.END_STROKE:
      return {
        ...state,
        isDrawing: false,
        isEndStroke: true,
      };
    case StrokeAction.RESET_DRAWING:
      return initialState;
    default:
      return state;
  }
};

export default drawing;
