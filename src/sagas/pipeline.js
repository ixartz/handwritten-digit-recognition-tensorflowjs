import { call, put, takeLatest } from 'redux-saga/effects';
import { requestPredict } from '../actions/mnist';
import {
  displayBoundingBox,
  displayCenteredBox,
  displayCroppedBox,
  displayNormalizedBox,
  PipelineAction,
} from '../actions/pipeline';
import { computeBoundingRect } from '../utils/image-processing';

function* boundingBoxTask(action) {
  const canvas = document.createElement('canvas');
  canvas.width = 280;
  canvas.height = 280;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(action.image, 0, 0);

  const rect = computeBoundingRect(action.image);

  yield put(displayBoundingBox(canvas.toDataURL(), rect));

  return {
    canvas,
    rect,
  };
}

function* croppedBoxTask(canvas, rect) {
  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = 200;
  croppedCanvas.height = 200;
  const croppedCtx = croppedCanvas.getContext('2d');

  const rectWidth = rect.computeWidth();
  const rectHeight = rect.computeHeight();
  const scalingFactor = 200 / Math.max(rectWidth, rectHeight);
  const croppedRectSize = {
    width: rectWidth * scalingFactor,
    height: rectHeight * scalingFactor,
  };

  croppedCtx.drawImage(
    canvas,
    rect.xmin,
    rect.ymin,
    rectWidth,
    rectHeight,
    0,
    0,
    croppedRectSize.width,
    croppedRectSize.height,
  );

  yield put(displayCroppedBox(croppedCanvas.toDataURL()));

  return {
    croppedCanvas,
    croppedRectSize,
  };
}

function* centeredBoxTask(croppedCanvas, croppedRectSize) {
  const centeredCanvas = document.createElement('canvas');
  centeredCanvas.width = 280;
  centeredCanvas.height = 280;
  const centeredCtx = centeredCanvas.getContext('2d');

  centeredCtx.drawImage(
    croppedCanvas,
    centeredCanvas.width / 2 - croppedRectSize.width / 2,
    centeredCanvas.height / 2 - croppedRectSize.height / 2,
  );

  yield put(displayCenteredBox(centeredCanvas.toDataURL()));

  return centeredCanvas;
}

function* normalizedTask(centeredCanvas) {
  const normalizedCanvas = document.createElement('canvas');
  normalizedCanvas.width = 28;
  normalizedCanvas.height = 28;
  const normalizedCtx = normalizedCanvas.getContext('2d');

  normalizedCtx.drawImage(
    centeredCanvas,
    0,
    0,
    centeredCanvas.width,
    centeredCanvas.height,
    0,
    0,
    normalizedCanvas.width,
    normalizedCanvas.height,
  );

  yield put(displayNormalizedBox(normalizedCanvas.toDataURL()));

  return normalizedCanvas;
}

function* requestPredictTask(normalizedCanvas) {
  const normalizedCtx = normalizedCanvas.getContext('2d');
  yield put(
    requestPredict(
      normalizedCtx.getImageData(0, 0, normalizedCanvas.width, normalizedCanvas.height),
    ),
  );
}

function* pipelineImgProcessing(action) {
  const { canvas, rect } = yield call(boundingBoxTask, action);
  const { croppedCanvas, croppedRectSize } = yield call(croppedBoxTask, canvas, rect);
  const centeredCanvas = yield call(centeredBoxTask, croppedCanvas, croppedRectSize);
  const normalizedCanvas = yield call(normalizedTask, centeredCanvas);
  yield call(requestPredictTask, normalizedCanvas);
}

function* watchPipeline() {
  yield takeLatest(PipelineAction.INPUT, pipelineImgProcessing);
}

export default watchPipeline;
