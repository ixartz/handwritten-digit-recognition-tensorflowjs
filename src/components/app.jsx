import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Mnist from './mnist';

window.BizCharts.track(false);

const App = class App extends React.Component {
  constructor(props) {
    super(props);

    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <Mnist />
      </Provider>
    );
  }
};

export default hot(module)(App);
