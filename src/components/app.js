import React, { Component, PropTypes } from 'react';
import NewSlider from './NewSlider';
import NewCircles from './NewCircles';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isRunning: true,
      value: 3 /** Start value **/
    };
  }

  handleChange = (value) => {
    this.setState({
      ...this.state,
      value: value
    });
  }

  handleToggleAnimation = () => {
    this.setState({
      ...this.state,
      isRunning: !this.state.isRunning
    });
  }

  render() {
    const buttonText = this.state.isRunning ? 'Start' : 'Stop';
    return (
      <div>
        <h4>Welcome!</h4>
        <button onClick={this.handleToggleAnimation}>{buttonText}</button>
        <NewSlider handleChange={this.handleChange} value={this.state.value}/>
        <NewCircles value={this.state.value} isRunning={this.state.isRunning}/>
      </div>
    )
  };
}
