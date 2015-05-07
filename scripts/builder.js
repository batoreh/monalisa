addEventListener('DOMContentLoaded', initCanvas);
addEventListener('DOMContentLoaded', function(){
	var canvas = document.getElementById('screen');
	var sideLeft = document.getElementById('side-left');
	var sideRight = document.getElementById('side-right');
	var top = document.getElementById('header');
	var bottom = document.getElementById('bottom');

	canvas.setAttribute("width", screen.width-90);
	canvas.setAttribute("height", screen.height-200);
})
var click;
function initCanvas() {	
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	
	canvas.addEventListener('mousemove', function(evt){
		var position = getMousePos(canvas, evt);
		//console.log('MOVINx:' + position.x + ' , y:' + position.y);
		if (click===true){
			draw(ctx, position.x, position.y);
		}
	});
	canvas.addEventListener('mousedown', function(evt){
		var position = getMousePos(canvas, evt);
		draw(ctx, position.x, position.y);
		click = true;
	});
	canvas.addEventListener('mouseup', function(evt){
		click = false;
	});
}

function draw(ctx, positionX, positionY) {
		console.log('CLICKx:' + positionX + ' , y:' + positionY);
		ctx.lineWidth = '10';
		ctx.beginPath();
		ctx.arc(positionX, positionY, 3, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		
	  	
	  	
}
function getMousePos(canvas, evt) { // get canvas and event to return the cordinates
    var rect = canvas.getBoundingClientRect();
    
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
