import { all, fork } from 'redux-saga/effects';
import watchMnist from './mnist';
import watchPipeline from './pipeline';

export default function* rootSaga() {
  yield all([fork(watchMnist), fork(watchPipeline)]);
}
