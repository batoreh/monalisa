import React, { Component } from 'react';
import './App.css';

class MonalisaCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();

    this.state = {
      brushWidth: 0,
      color: '#000000',
      xAxis: NaN,
      yAxis: NaN,
      clicking: false
    }
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
    this.setState({
      brushWidth: this.props.brushWidth || 10,
      color: this.props.defaultColor || '#000000'
    });
  }

  onClear = () => {
    this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
  }

  onSave = () => {
    window.open(this.canvas.current.toDataURL(), '_blank');
  }

  onMouseMove = (evt) => {
    const position = this.getMousePos(evt);
    const { color, brushWidth, clicking } = this.state;
    if (clicking === true){
      this.drawPoint(position.x, position.y, color, brushWidth);
      this.drawComplete(position.x, position.y, color, brushWidth);
    }
  }

  stopPainting = () => {
    this.setState({
      clicking: false,
      xAxis: NaN,
      yAxis: NaN
    });
  }

  onMouseDown = (evt) => {
    const position = this.getMousePos(evt);
    const { color, brushWidth } = this.state;
    this.drawPoint(position.x, position.y, color, brushWidth);
    this.setState({ clicking: true });
  }

  drawPoint = (positionX, positionY, color, brushWidth) => {
    this.ctx.lineWidth = brushWidth;
    this.ctx.beginPath();
    this.ctx.arc(positionX, positionY, brushWidth/2, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#"+color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawComplete = (positionX, positionY, color, brushWidth) => {
    const { xAxis, yAxis } = this.state;
    this.ctx.beginPath();
    this.ctx.lineWidth = brushWidth;
    this.ctx.moveTo(xAxis, yAxis);
    this.ctx.lineTo(positionX, positionY);
    this.ctx.strokeStyle = "#"+color;
    this.ctx.stroke();
    this.ctx.closePath();
    this.setState({ xAxis: positionX, yAxis: positionY });
  }

  changeColor = (event) => {
    event.persist();
    const color = event.target.value.slice(1, 7);
    this.setState({ color });
  }

  changeWidth = brushWidth => this.setState({ brushWidth });

  getMousePos = evt => {
    const rect = this.canvas.current.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  render() {
    const height = this.props.height || 400;
    const width = this.props.width || 600;
    const controls = this.props.controls || false;
    return (
      <React.Fragment>
        {
          controls ?
          <div className="controls">
            <input onChange={this.changeColor} type="color" id="input-color" />
            <input onChange={this.changeWidth} type="range" min="1" max="40" id="input-width"/>
            <input onClick={this.onClear} type="button" name="clear" value="clear" id="clearCanvas" />
            <input onClick={this.onSave} type="button" name="save" value="save" id="saveBtn" />
          </div> : null
        }
        <canvas
          ref={this.canvas}
          height={height}
          width={width}
          onMouseDown={this.onMouseDown}
          onMouseOut={this.stopPainting}
          onMouseUp={this.stopPainting}
          onMouseMove={this.onMouseMove} />
      </React.Fragment>
    );
  }
}
