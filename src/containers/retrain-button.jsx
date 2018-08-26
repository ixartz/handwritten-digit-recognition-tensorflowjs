import { connect } from 'react-redux';
import { MnistAction } from '../actions/mnist';
import ButtonSpace from '../components/button-space';
import isLoadingClassifier from '../utils/classifier';

const text = (state) => {
  switch (state.mnist.retrainStatus) {
    case MnistAction.LOADING_MNIST:
      return 'Loading MNIST database';
    case MnistAction.TRAINING_MNIST:
      return 'Training new model';
    default:
      return 'Retrain model';
  }
};

const mapStateToProps = state => ({
  loading: isLoadingClassifier(state),
  disabled: state.mnist.prediction == null,
  children: text(state),
});

// Do delete mapDispatchToProps, keep it empty. Otherwise, it will create an error on the console
const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonSpace);
