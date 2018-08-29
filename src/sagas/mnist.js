import * as tf from '@tensorflow/tfjs';
import {
  apply, call, put, take,
} from 'redux-saga/effects';
import { resetChart } from '../actions/chart';
import { resetDrawing } from '../actions/drawing';
import {
  loadAndTrainMnistSucceeded,
  loadingMnist,
  loadPretrainedModelSucceeded,
  MnistAction,
  predictSucceeded,
  trainingMnist,
} from '../actions/mnist';
import HandwritingDigitsClassifier from '../classifiers/handwriting-digits-classifier';
import MnistData from '../data/mnist-data';
import { convertToGrayscale } from '../utils/image-processing';

function* trainMnist(mnistData) {
  yield put(trainingMnist());
  const handwritingDigitsClassifier = new HandwritingDigitsClassifier();
  handwritingDigitsClassifier.initializeModel(mnistData);
  yield apply(handwritingDigitsClassifier, handwritingDigitsClassifier.train);
  return handwritingDigitsClassifier;
}

function* loadAndTrainMnist() {
  yield put(loadingMnist());
  const mnistData = new MnistData();
  yield call(mnistData.load);
  const handwritingDigitsClassifier = yield call(trainMnist, mnistData);
  return handwritingDigitsClassifier;
}

function* loadPretrainedModel() {
  const pretrainedHandwritingDigitsClassifier = new HandwritingDigitsClassifier();
  yield apply(
    pretrainedHandwritingDigitsClassifier,
    pretrainedHandwritingDigitsClassifier.loadModel,
  );
  yield put(loadPretrainedModelSucceeded());
  return pretrainedHandwritingDigitsClassifier;
}

function* predict(handwritingDigitsClassifier, image) {
  const dataGrayscale = convertToGrayscale(image);
  const dataTensor = tf.tensor(dataGrayscale, [1, 28, 28, 1]);
  const prediction = handwritingDigitsClassifier.predict(dataTensor);
  yield put(predictSucceeded(prediction));
}

function* request(pretrainedHandwritingDigitsClassifier) {
  let handwritingDigitsClassifier = pretrainedHandwritingDigitsClassifier;

  while (true) {
    const action = yield take([
      MnistAction.PREDICT_REQUESTED,
      MnistAction.LOAD_AND_TRAIN_MNIST_REQUESTED,
    ]);

    switch (action.type) {
      case MnistAction.PREDICT_REQUESTED:
        yield call(predict, handwritingDigitsClassifier, action.image);
        break;
      case MnistAction.LOAD_AND_TRAIN_MNIST_REQUESTED:
        yield put(resetChart());
        yield put(resetDrawing());

        if (handwritingDigitsClassifier.data) {
          handwritingDigitsClassifier = yield call(trainMnist, handwritingDigitsClassifier.data);
        } else {
          handwritingDigitsClassifier = yield call(loadAndTrainMnist);
        }

        yield put(loadAndTrainMnistSucceeded());
        break;
      default:
        break;
    }
  }
}

function* watchMnist() {
  const pretrainedHandwritingDigitsClassifier = yield call(loadPretrainedModel);
  yield call(request, pretrainedHandwritingDigitsClassifier);
}

export default watchMnist;
