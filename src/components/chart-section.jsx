import { Col, Row } from 'antd';
import React from 'react';
import AccuracyChart from '../containers/accuracy-chart';
import LossChart from '../containers/loss-chart';

const ChartSection = () => (
  <Row>
    <Col md={12}>
      <LossChart />
    </Col>
    <Col md={12}>
      <AccuracyChart />
    </Col>
  </Row>
);

export default ChartSection;
