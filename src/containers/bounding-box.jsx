import { connect } from 'react-redux';
import BoundingBox from '../components/bounding-box';

const mapStateToProps = state => ({
  imageUrl: state.pipeline.imageUrl,
  rect: state.pipeline.rect,
});

export default connect(mapStateToProps)(BoundingBox);
