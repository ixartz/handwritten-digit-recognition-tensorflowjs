import { Layout } from 'antd';
import React from 'react';
import MnistContent from './mnist-content';
import MnistFooter from './mnist-footer';
import MnistHeader from './mnist-header';

const Mnist = () => (
  <div>
    <Layout>
      <MnistHeader />
      <MnistContent />
      <MnistFooter />
    </Layout>
  </div>
);

export default Mnist;
