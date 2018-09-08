import { Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import RetrainButton from '../containers/retrain-button';

const PWarning = styled.p`
  color: red;
`;

const content = (
  <div>
    <p>
      The system has already loaded a pretrained model with 0.99700 accuracy. If you want to train a
      new model, please click on continue button.
    </p>
    <PWarning>
      It is unrecommended to run the training on your phone. The process will drain your battery.
    </PWarning>
  </div>
);

const ConfirmRetrainButton = ({ onConfirm }) => (
  <Popconfirm title={content} trigger="click" okText="Continue" onConfirm={onConfirm}>
    <RetrainButton />
  </Popconfirm>
);

ConfirmRetrainButton.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmRetrainButton;
