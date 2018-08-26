import { ChartAction } from '../actions/chart';

const initialState = {
  loss: [],
  accuracy: [],
};

const chart = (state = initialState, action) => {
  switch (action.type) {
    case ChartAction.ADD_LOSS_POINT:
      return {
        ...state,
        loss: [...state.loss, action.pt],
      };
    case ChartAction.ADD_ACCURACY_POINT:
      return {
        ...state,
        accuracy: [...state.accuracy, action.pt],
      };
    case ChartAction.RESET_CHART:
      return initialState;
    default:
      return state;
  }
};

export default chart;
