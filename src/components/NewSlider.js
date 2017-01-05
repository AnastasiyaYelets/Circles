import React, { Component } from 'react';
import Slider from 'react-rangeslider';

export default class NewSlider extends Component {
  render() {
    return (
      <div>
        <Slider
          onChange={this.props.handleChange}
          value={this.props.value}
          orientation="horizontal"
          min={1}
          max={10}
          step={1}
        />
        <div>Value: {this.props.value}</div>
      </div>
    );
  }
}
