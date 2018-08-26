import { connect } from 'react-redux';
import { MnistAction } from '../actions/mnist';
import MnistDrawing from '../components/mnist-drawing';
import isLoadingClassifier from '../utils/classifier';

const mapStateToProps = state => ({
  spinning: state.mnist.status === MnistAction.INIT || isLoadingClassifier(state),
});

export default connect(mapStateToProps)(MnistDrawing);
