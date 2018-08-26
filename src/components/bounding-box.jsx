import PropTypes from 'prop-types';
import React from 'react';
import Rect from '../utils/rect';
import { Display140 } from './display';

export default class BoundingBox extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    rect: PropTypes.instanceOf(Rect),
  };

  static defaultProps = {
    imageUrl: null,
    rect: null,
  };

  componentDidMount() {
    this.initContext();
  }

  componentDidUpdate() {
    this.initContext();
  }

  setDisplay = (elt) => {
    this.display = elt;
  };

  initContext() {
    const { imageUrl, rect } = this.props;

    if (imageUrl) {
      const image = new Image();
      image.onload = () => {
        this.display.ctx.drawImage(image, 0, 0);

        this.display.ctx.strokeStyle = 'red';
        this.display.ctx.strokeRect(
          rect.xmin,
          rect.ymin,
          rect.computeWidth(),
          rect.computeHeight(),
        );
      };
      image.src = imageUrl;
    }
  }

  render() {
    return <Display140 innerRef={this.setDisplay} title="Bounding box" />;
  }
}
