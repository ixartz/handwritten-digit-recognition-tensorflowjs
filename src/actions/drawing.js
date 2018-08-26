export const StrokeAction = {
  ADD_STROKE: 'ADD_STROKE',
  ADD_STROKE_POS: 'ADD_STROKE_POS',
  END_STROKE: 'END_STROKE',
  RESET_DRAWING: 'RESET_DRAWING',
};

export const addStroke = pos => ({
  type: StrokeAction.ADD_STROKE,
  pos,
});

export const addStrokePos = pos => ({
  type: StrokeAction.ADD_STROKE_POS,
  pos,
});

export const endStroke = () => ({
  type: StrokeAction.END_STROKE,
});

export const resetDrawing = () => ({
  type: StrokeAction.RESET_DRAWING,
});
