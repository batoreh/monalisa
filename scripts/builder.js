var click;
var color = '#000000';
var width=20;
var guidex;
var guidey;

addEventListener('DOMContentLoaded', initCanvas);


function initCanvas() {
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	var clear = document.getElementById('clearCanvas');
	var save = document.getElementById('saveBtn');
	canvas.addEventListener('mouseout', function(){
		click=false;
		guidex= NaN;
		guidey= NaN;
	});
	canvas.addEventListener('mousemove', function(evt){
		var position = getMousePos(canvas, evt);
		if (click===true){
			// console.log('MOVINg x:' + position.x + ' , y:' + position.y);
			drawPoint(ctx, position.x, position.y, color, width);
			drawComplete(ctx, position.x, position.y, color, width);
		}
	});
	canvas.addEventListener('mousedown', function(evt){
		var position = getMousePos(canvas, evt);
		drawPoint(ctx, position.x, position.y, color, width);
		click = true;
	});
	canvas.addEventListener('mouseup', function(evt){
		click = false;
		guidex = NaN;
		guidey = NaN;
	});
	clear.addEventListener('click', function(evt){
		ctx.clearRect(0,0,canvas.width, canvas.height);
	});
	save.addEventListener('click', function(){
		var canvas = document.getElementById('screen');
		window.open(canvas.toDataURL(), '_blank');
	});
	changeColor(color); //black as default color
	changeWidth(width);
}

function drawPoint(ctx, positionX, positionY, color, width) {
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.arc(positionX, positionY, width/2, 0, 2 * Math.PI);
		ctx.fillStyle = "#"+color;
		ctx.fill();
		ctx.closePath();
}

function drawComplete(ctx, positionX, positionY, color, width) {
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.moveTo(guidex, guidey);
		ctx.lineTo(positionX, positionY);
		guidex = positionX;
		guidey = positionY;
		ctx.strokeStyle = "#"+color;
		ctx.stroke();
		ctx.closePath();
}
function changeColor(change) {
	color = change.slice(1,7);
	var icolor = document.getElementById('div-color');
	icolor.style.backgroundColor='#'+color;
}
function changeWidth(change){
	width = change;
}

function getMousePos(canvas, evt) { // get canvas and event to return the cordinates
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}