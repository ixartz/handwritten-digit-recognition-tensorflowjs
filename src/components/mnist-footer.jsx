import { Icon, Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Footer } = Layout;

const IconFooter = styled(Icon)`
  margin-right: 3px;
  font-size: 15px;
`;

const PFooter = styled.p`
  font-size: 8px;
  text-align: center;
`;

const AFooter = styled.a`
  color: inherit;
`;

const MnistFooter = () => (
  <Footer>
    <PFooter>
      <AFooter
        href="https://github.com/ixartz/handwritten-digit-recognition-tensorflowjs"
        target="_blank"
        rel="noreferrer noopener"
      >
        <IconFooter type="github" />
      </AFooter>
      This page is made with Tensorflow.js, Mnist dataset, React, Redux, Redux-Saga, Babel, Webpack,
      Styled-components, Eslint, Prettier and Ant Design - Author:
      {' '}
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a href="https://blog.ixartz.com/" target="_blank" rel="noopener">
        Ixartz
      </a>
    </PFooter>
  </Footer>
);

export default MnistFooter;
