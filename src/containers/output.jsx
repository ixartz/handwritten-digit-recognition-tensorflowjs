import { connect } from 'react-redux';
import Output from '../components/output';

const mapStateToProps = state => ({
  prediction: state.mnist.prediction,
});

export default connect(mapStateToProps)(Output);
