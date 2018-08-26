import {
  Axis, Chart, Geom, Tooltip,
} from 'bizcharts';
import PropTypes from 'prop-types';
import React from 'react';

export default class LineChart extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
    cols: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  static defaultProps = {
    data: null,
    cols: null,
  };

  static getObjectKeyName(obj, i) {
    return Object.keys(obj)[i];
  }

  render() {
    const { data, cols } = this.props;
    const firstAxis = LineChart.getObjectKeyName(cols, 0);
    const secondAxis = LineChart.getObjectKeyName(cols, 1);
    const position = `${firstAxis}*${secondAxis}`;

    if (data.length > 0) {
      return (
        <Chart
          height={400}
          data={data}
          scale={cols}
          padding={['auto', 'auto', 40, 'auto']}
          forceFit
        >
          <Axis name={firstAxis} title />
          <Axis name={secondAxis} title />
          <Tooltip crosshairs={{ type: 'cross' }} />
          <Geom type="line" position={position} size={2} />
          <Geom
            type="point"
            position={position}
            size={4}
            shape="circle"
            style={{ stroke: '#fff', lineWidth: 1 }}
          />
        </Chart>
      );
    }

    return null;
  }
}
