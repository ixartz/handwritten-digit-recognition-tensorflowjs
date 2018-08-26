import { connect } from 'react-redux';
import { addStroke, addStrokePos, endStroke } from '../actions/drawing';
import { addInput } from '../actions/pipeline';
import Drawing from '../components/drawing';

const mapStateToProps = state => ({
  isDrawing: state.drawing.isDrawing,
  isEndStroke: state.drawing.isEndStroke,
  strokes: state.drawing.strokes,
});

const mapDispatchToProps = dispatch => ({
  addStroke: pos => dispatch(addStroke(pos)),
  addStrokePos: pos => dispatch(addStrokePos(pos)),
  endStroke: () => dispatch(endStroke()),
  addInput: image => dispatch(addInput(image)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawing);
