import { Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import CenterCol from './center-col';

const DisplayRow = styled(Row)`
  margin-bottom: 10px;
`;

const H3 = styled.h3`
  margin: 0;
`;

const Canvas = styled.canvas`
  display: block;
`;

export class Display extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    imageUrl: null,
    className: '',
    width: 280,
    height: 280,
  };

  constructor(props) {
    super(props);
    this.canvas = null;
    this.ctx = null;
  }

  componentDidMount() {
    this.initContext();
  }

  componentDidUpdate() {
    this.initContext();
  }

  setCanvasRef = (elt) => {
    this.canvas = elt;
  };

  initContext() {
    this.ctx = this.canvas.getContext('2d');

    this.clearCanvas();
    this.loadImage();
  }

  clearCanvas() {
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  loadImage() {
    const { imageUrl } = this.props;

    if (imageUrl) {
      const image = new Image();
      image.onload = () => {
        this.ctx.drawImage(image, 0, 0);
      };
      image.src = imageUrl;
    }
  }

  render() {
    const {
      className, width, height, title,
    } = this.props;

    return (
      <DisplayRow>
        <CenterCol span={24}>
          <H3>{title}</H3>
        </CenterCol>
        <CenterCol span={24}>
          <Canvas
            innerRef={this.setCanvasRef}
            className={className}
            width={width}
            height={height}
          />
        </CenterCol>
      </DisplayRow>
    );
  }
}

export const Display140 = styled(Display)`
  width: 140px;
  height: 140px;
`;

export const Display200 = styled(Display)`
  width: 200px;
  height: 200px;
`;

export const Display100 = styled(Display)`
  width: 100px;
  height: 100px;
`;

export const Display28 = styled(Display)`
  width: 28px;
  height: 28px;
`;
