import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Header } = Layout;

const H1 = styled.h1`
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WhiteHeader = styled(Header)`
  background: dodgerblue;
  margin-bottom: 20px;
`;

const MnistHeader = () => (
  <WhiteHeader>
    <H1>Digit Recognition with Tensorflow.js and React</H1>
  </WhiteHeader>
);

export default MnistHeader;
