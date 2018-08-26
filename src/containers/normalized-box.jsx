import { connect } from 'react-redux';
import { Display28 } from '../components/display';

const mapStateToProps = state => ({
  imageUrl: state.pipeline.normalizedUrl,
  width: 28,
  height: 28,
  title: 'Normalized image',
});

export default connect(mapStateToProps)(Display28);
