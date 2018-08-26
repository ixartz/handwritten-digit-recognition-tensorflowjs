import { connect } from 'react-redux';
import LineChart from '../components/line-chart';

const mapStateToProps = state => ({
  data: state.chart.accuracy,
  cols: {
    batch: { range: [0, 1], alias: 'Batch' },
    accuracy: { min: 0, alias: 'Accuracy' },
  },
});

export default connect(mapStateToProps)(LineChart);
