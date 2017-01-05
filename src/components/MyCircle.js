import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group, Circle} from 'react-konva';
const period = 0.00000001;
const getRandom = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const radius =30;
export default class MyCircle extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: Konva.Util.getRandomColor(),
      x: getRandom(50, 1000),
      y: getRandom(50, 470),
      VelocityX: getRandom(2,3),
      VelocityY: getRandom(2,3),
      isRunningCircle: this.props.isRunning
    };
  };

  componentDidMount() {
    const circle = this.refs.circle;
    circle.x(this.state.x)
    circle.y(this.state.y)
    this.setState({
      ...this.state,
      anim: new Konva.Animation((frame) => {
        this.move(this.props.innerKey);
      }, this.props.layer)
    });
  }
  componentWillReceiveProps(nextProps) {
    // console.log('received');
    if (this.props.isRunning !== nextProps.isRunning) {
      this.toggleAnimation(nextProps.isRunning);
    }
  }
  toggleAnimation = (isRunning) => {
    isRunning ? this.state.anim.stop() : this.state.anim.start();
  }
  toggleAnimationCircle = (isRunningCircle) => {
    isRunningCircle ? this.state.anim.stop() : this.state.anim.start();
  }
  move = (n) => {

    let kick = false;
    const circle = this.refs.circle;
    let coord = {
      n: [this.state.x, this.state.y, this.state.VelocityX, this.state.VelocityY]};

      if (coord.n[0] >= (1110-radius)) { coord.n[2]= -(coord.n[2]) }
      if (coord.n[0] <= radius) { coord.n[2]= -(coord.n[2]) }
      if (coord.n[1] >= (500-radius)) { coord.n[3]= -(coord.n[3]) }
      if (coord.n[1] <= radius) { coord.n[3]= -(coord.n[3]) }

      console.log(radius);
      if ( this.props.layer.getIntersection({x: (coord.n[0] -radius-3), y: (coord.n[1]) }))
        {  coord.n[2]= -(coord.n[2]);
           coord.n[3]= -(coord.n[3]);
      } if ( this.props.layer.getIntersection({x: (coord.n[0] + radius+3), y: (coord.n[1])  }))
        {  coord.n[2]= -(coord.n[2]);
           coord.n[3]= -(coord.n[3]);
      } if ( this.props.layer.getIntersection({x: coord.n[0] , y: (coord.n[1] + radius+3)}))
        {  coord.n[2]= -(coord.n[2]);
           coord.n[3]= -(coord.n[3]);
      } if ( this.props.layer.getIntersection({x: coord.n[0] , y: (coord.n[1] - radius-3)}))
        {  coord.n[2]= -(coord.n[2]);
           coord.n[3]= -(coord.n[3]);
      }

      coord.n[0] = coord.n[0] + coord.n[2] ;
      coord.n[1] = coord.n[1] + coord.n[3] ;

      circle.to({
        x: coord.n[0],
        y: coord.n[1],
        duration: period
      });
      this.setState({
        x: coord.n[0],
        y: coord.n[1],
        VelocityX: coord.n[2],
        VelocityY: coord.n[3]
      });

    };
    handleToggleAnimationCircle = () => {
      this.setState({
        ...this.state,
        isRunningCircle: !this.state.isRunningCircle
      });
      this.toggleAnimationCircle(this.state.isRunningCircle);
    }
    render() {
      return (
        <Circle
          ref="circle"
          x={this.state.x} y={this.state.y}
          radius={radius}
          fill= {this.state.color}
          shadowBlur={10}
          onClick={this.handleToggleAnimationCircle}
          stroke= {'black'}
          strokeWidth= {4}
        />
      )
    }
  }
  MyCircle.propTypes = {
    innerKey:  PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired
  };
