import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const H2 = styled.h2`
  text-align: center;
`;

export default class Output extends React.PureComponent {
  static propTypes = {
    prediction: PropTypes.number,
  };

  static defaultProps = {
    prediction: null,
  };

  render() {
    const { prediction } = this.props;

    return (
      <H2>
        {prediction != null
          ? `Prediction: ${prediction}`
          : 'Draw a number (0-9) in the black box above'}
      </H2>
    );
  }
}
