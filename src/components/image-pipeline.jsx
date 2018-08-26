import { Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import BoundingBox from '../containers/bounding-box';
import CenteredBox from '../containers/centered-box';
import CroppedBox from '../containers/cropped-box';
import NormalizedBox from '../containers/normalized-box';
import CenterCol from './center-col';

const ImagePipelineRow = styled(Row)`
  margin-top: 20px;
`;

const ImagePipeline = () => (
  <ImagePipelineRow type="flex" align="middle">
    <CenterCol xs={24} sm={12} md={6}>
      <BoundingBox />
    </CenterCol>
    <CenterCol xs={24} sm={12} md={6}>
      <CroppedBox />
    </CenterCol>
    <CenterCol xs={24} sm={12} md={6}>
      <CenteredBox />
    </CenterCol>
    <CenterCol xs={24} sm={12} md={6}>
      <NormalizedBox />
    </CenterCol>
  </ImagePipelineRow>
);

export default ImagePipeline;
