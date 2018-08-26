import { MnistAction } from '../actions/mnist';

export default function isLoadingClassifier(state) {
  return (
    state.mnist.retrainStatus !== MnistAction.INIT
    && state.mnist.retrainStatus !== MnistAction.LOAD_AND_TRAIN_MNIST_SUCCEEDED
  );
}
