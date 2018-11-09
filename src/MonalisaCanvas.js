import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class MonalisaCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 20,
      color: '#000000',
      xAxis: NaN,
      yAxis: NaN,
      clicking: false
    }
  }

  componentDidMount() {
    this.canvas = document.getElementById('screen');
    this.ctx = this.canvas.getContext('2d');
  }

  onClear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onSave = () => {
    window.open(this.canvas.toDataURL(), '_blank');
  }

  onMouseMove = (evt) => {
    const position = this.getMousePos(evt);
    const { color, width, clicking } = this.state;
    if (clicking === true){
      this.drawPoint(position.x, position.y, color, width);
      this.drawComplete(position.x, position.y, color, width);
    }
  }

  stopPainting = () => {
    this.setState({
      click: false,
      xAxis: NaN,
      yAxis: NaN
    });
  }

  onMouseDown = (evt) => {
    const position = this.getMousePos(evt);
    const { color, width } = this.state;
    this.drawPoint(position.x, position.y, color, width);
    this.setState({ clicking: true });
  }

  drawPoint = (positionX, positionY, color, width) => {
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.arc(positionX, positionY, width/2, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#"+color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawComplete = (positionX, positionY, color, width) => {
    const { xAxis, yAxis } = this.state;
    this.ctx.beginPath();
    this.ctx.lineWidth = width;
    this.ctx.moveTo(xAxis, yAxis);
    this.ctx.lineTo(positionX, positionY);
    this.setState({ xAxis: positionX, yAxis: positionY });
    this.ctx.strokeStyle = "#"+color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  changeColor = (change) => {
    const color = change.slice(1, 7);
    this.setState({ color });
    const icolor = document.getElementById('div-color');
    icolor.style.backgroundColor='#'+color;
  }

  changeWidth = width => this.setState({ width });

  getMousePos = evt => {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="controls">
          <input onChange={this.changeColor} type="color" id="input-color" />
          <input onChange={this.changeWidth} type="range" min="1" max="40" id="input-width" />
          <input onClick={this.onClear} type="button" name="clear" value="clear" id="clearCanvas" />
          <input onClick={this.onSave} type="button" name="save" id="saveBtn" />
        </div>
        <canvas
          id={'screen'}
          onMouseDown={this.onMouseDown}
          onMouseOut={this.stopPainting}
          onMouseUp={this.stopPainting}
          onMouseMove={this.onMouseMove}
          ref={this.canvas} />
      </React.Fragment>
    );
  }
}

export default MonalisaCanvas;
