import { connect } from 'react-redux';
import { Display140 } from '../components/display';

const mapStateToProps = state => ({
  imageUrl: state.pipeline.centeredUrl,
  width: 280,
  height: 280,
  title: 'Centered image',
});

export default connect(mapStateToProps)(Display140);
