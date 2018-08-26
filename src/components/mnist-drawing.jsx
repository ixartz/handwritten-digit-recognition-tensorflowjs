import { Spin } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import Drawing from '../containers/drawing';
import Output from '../containers/output';
import CenterCol from './center-col';
import MnistCommand from './mnist-command';

const MnistDrawing = ({ spinning }) => (
  <Spin spinning={spinning}>
    <CenterCol xs={24}>
      <Drawing />
    </CenterCol>
    <CenterCol xs={24}>
      <Output />
    </CenterCol>
    <CenterCol xs={24}>
      <MnistCommand />
    </CenterCol>
  </Spin>
);

MnistDrawing.propTypes = {
  spinning: PropTypes.bool,
};

MnistDrawing.defaultProps = {
  spinning: true,
};

export default MnistDrawing;
