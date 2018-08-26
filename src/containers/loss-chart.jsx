import { connect } from 'react-redux';
import LineChart from '../components/line-chart';

const mapStateToProps = state => ({
  data: state.chart.loss,
  cols: {
    batch: { range: [0, 1], alias: 'Batch' },
    loss: { min: 0, alias: 'Loss' },
  },
});

export default connect(mapStateToProps)(LineChart);
