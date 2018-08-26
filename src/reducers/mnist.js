import { MnistAction } from '../actions/mnist';

const initialState = {
  status: MnistAction.INIT,
  retrainStatus: MnistAction.INIT,
};

const mnist = (state = initialState, action) => {
  switch (action.type) {
    case MnistAction.LOAD_PRETRAINED_MODEL_SUCCEEDED:
      return {
        ...state,
        status: MnistAction.LOAD_PRETRAINED_MODEL_SUCCEEDED,
      };
    case MnistAction.LOADING_MNIST:
    case MnistAction.TRAINING_MNIST:
    case MnistAction.LOAD_AND_TRAIN_MNIST_SUCCEEDED:
      return {
        ...state,
        retrainStatus: action.type,
      };
    case MnistAction.PREDICT_SUCCEEDED:
      return {
        ...state,
        prediction: action.prediction,
      };
    default:
      return state;
  }
};

export default mnist;
