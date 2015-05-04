addEventListener('DOMContentLoaded', initCanvas);
var click;
function initCanvas() {	
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	
	canvas.addEventListener('mousemove', function(evt){
		var position = getMousePos(canvas, evt);
		console.log('MOVINx:' + position.x + ' , y:' + position.y);
		if (click===true){
			draw(ctx, position.x, position.y);
		}
	});
	canvas.addEventListener('mousedown', function(evt){
		var position = getMousePos(canvas, evt);
		draw(ctx, position.x, position.y);
		click = true;
		al(click);
	});
	canvas.addEventListener('mouseup', function(evt){
		click = false;
		al(click);
	});
}

function al(click){
	if (click===true) {
		return true;
	} else {
		return false;
	}
}

function draw(ctx, positionX, positionY) {
		console.log('CLICKx:' + positionX + ' , y:' + positionY);
		ctx.beginPath();
		ctx.moveTo(positionX, positionY-1);
		ctx.lineTo (positionX, positionY);
		ctx.closePath();
		ctx.strokeStyle = "#000000";
		ctx.stroke();
	  	
	  	
}
function getMousePos(canvas, evt) { // get canvas and event to return the cordinates
    var rect = canvas.getBoundingClientRect();
    
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
