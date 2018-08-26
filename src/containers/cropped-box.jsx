import { connect } from 'react-redux';
import { Display100 } from '../components/display';

const mapStateToProps = state => ({
  imageUrl: state.pipeline.croppedUrl,
  width: 200,
  height: 200,
  title: 'Cropped image',
});

export default connect(mapStateToProps)(Display100);
