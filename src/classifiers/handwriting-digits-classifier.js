import * as tf from '@tensorflow/tfjs';
import { put } from 'redux-saga/effects';
import { addAccuracyPoint, addLossPoint } from '../actions/chart';

export default class HandwritingDigitsClassifier {
  static TRAIN_BATCHES = 150;

  static BATCH_SIZE = 64;

  static TEST_ITERATION_FREQUENCY = 5;

  static TEST_BATCH_SIZE = 1000;

  static LEARNING_RATE = 0.15;

  static CLASSIFIER_FOLDER = 'classifiers';

  static CLASSIFIER_NAME = 'model';

  initializeModel(data) {
    this.data = data;

    this.model = tf.sequential();

    this.model.add(
      tf.layers.conv2d({
        inputShape: [28, 28, 1],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
      }),
    );

    this.model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

    this.model.add(
      tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
      }),
    );

    this.model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

    this.model.add(tf.layers.flatten());

    this.model.add(
      tf.layers.dense({ units: 10, kernelInitializer: 'varianceScaling', activation: 'softmax' }),
    );

    this.compile();
  }

  compile() {
    const optimizer = tf.train.sgd(HandwritingDigitsClassifier.LEARNING_RATE);

    this.model.compile({
      optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
  }

  * loadModel() {
    const { host, protocol } = window.location;

    this.model = yield tf.loadModel(
      `${protocol}//${host}/${HandwritingDigitsClassifier.CLASSIFIER_FOLDER}/${
        HandwritingDigitsClassifier.CLASSIFIER_NAME
      }.json`,
    );
    this.compile();
  }

  getTrainBatch(i) {
    const batch = this.data.nextTrainBatch(HandwritingDigitsClassifier.BATCH_SIZE);
    batch.xs = batch.xs.reshape([HandwritingDigitsClassifier.BATCH_SIZE, 28, 28, 1]);

    let validationData;

    if (i % HandwritingDigitsClassifier.TEST_ITERATION_FREQUENCY === 0) {
      const testBatch = this.data.nextTrainBatch(HandwritingDigitsClassifier.TEST_BATCH_SIZE);

      validationData = [
        testBatch.xs.reshape([HandwritingDigitsClassifier.TEST_BATCH_SIZE, 28, 28, 1]),
        testBatch.labels,
      ];
    }

    return [batch, validationData];
  }

  * train(save = false) {
    for (let i = 0; i < HandwritingDigitsClassifier.TRAIN_BATCHES; i += 1) {
      const [batch, validationData] = tf.tidy(() => this.getTrainBatch(i));

      const history = yield this.model.fit(batch.xs, batch.labels, {
        batchSize: HandwritingDigitsClassifier.BATCH_SIZE,
        validationData,
        epochs: 1,
      });

      const loss = history.history.loss[0];
      const accuracy = history.history.acc[0];

      yield put(addLossPoint(i, loss));

      if (validationData != null) {
        yield put(addAccuracyPoint(i, accuracy));
      }

      tf.dispose([batch, validationData]);

      yield tf.nextFrame();
    }

    if (save) {
      yield this.model.save(`downloads://${HandwritingDigitsClassifier.CLASSIFIER_NAME}`);
    }
  }

  predict(dataTensor) {
    return tf.tidy(() => {
      const output = this.model.predict(dataTensor);

      const axis = 1;
      const predictions = Array.from(output.argMax(axis).dataSync());

      return predictions[0];
    });
  }
}
