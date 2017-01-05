import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactCanvas from 'react-konva';
import {Layer, Rect, Stage, Group, Circle} from 'react-konva';
const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
import MyCircle from './MyCircle';
var rows = [];

const width = 1110;
const height = 500;

export default class NewCircles extends Component {
  render() {
    var rows = [];
    for (var i=0; i < this.props.value; i++) {
      const innerKey = i;
      rows.push(<MyCircle key={i} innerKey={innerKey} value={this.props.value} width={width} height={height} layer={this.refs.layer} isRunning={this.props.isRunning}/>);
    }

    return (
      <div className = "img">
        <Stage width={width} height={height}>
          <Layer ref="layer">
            {rows}
          </Layer>
        </Stage>
      </div>
    );

  }
}
NewCircles.propTypes = {
  value: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired
};
