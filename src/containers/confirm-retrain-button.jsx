import { connect } from 'react-redux';
import { loadAndTrainMnist } from '../actions/mnist';
import ConfirmRetrainButton from '../components/confirm-retrain-button';

const mapDispatchToProps = dispatch => ({
  onConfirm: () => dispatch(loadAndTrainMnist()),
});

export default connect(
  null,
  mapDispatchToProps,
)(ConfirmRetrainButton);
