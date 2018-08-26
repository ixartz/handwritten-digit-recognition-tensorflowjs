import { connect } from 'react-redux';
import { resetDrawing } from '../actions/drawing';
import ButtonSpace from '../components/button-space';

const mapStateToProps = state => ({
  disabled: state.mnist.prediction == null,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(resetDrawing()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonSpace);
