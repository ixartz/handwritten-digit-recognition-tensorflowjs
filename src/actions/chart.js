export const ChartAction = {
  ADD_LOSS_POINT: 'ADD_LOSS_POINT',
  ADD_ACCURACY_POINT: 'ADD_ACCURACY_POINT',
  RESET_CHART: 'RESET_CHART',
};

export const addLossPoint = (batch, loss) => ({
  type: ChartAction.ADD_LOSS_POINT,
  pt: {
    batch,
    loss,
  },
});

export const addAccuracyPoint = (batch, accuracy) => ({
  type: ChartAction.ADD_ACCURACY_POINT,
  pt: {
    batch,
    accuracy,
  },
});

export const resetChart = () => ({
  type: ChartAction.RESET_CHART,
});
