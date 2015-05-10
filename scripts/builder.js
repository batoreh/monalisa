addEventListener('DOMContentLoaded', initCanvas);
addEventListener('DOMContentLoaded', function(){
	var canvas = document.getElementById('screen');
	var content = document.getElementById('content');
	var sideLeft = document.getElementById('side-left');
	var sideRight = document.getElementById('side-right');
	var top = document.getElementById('header');
	var bottom = document.getElementById('bottom');

	canvas.setAttribute("width", screen.width-475);
	canvas.setAttribute("height", screen.height-200);
})
var click;
var tool=0;
var width=0;

function initCanvas() {	
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	
	canvas.addEventListener('mouseout', function(){
		click=false;
	});
	canvas.addEventListener('mousemove', function(evt){
		var position = getMousePos(canvas, evt);
		//console.log('MOVINx:' + position.x + ' , y:' + position.y);
		if (click===true){
			draw(ctx, position.x, position.y, tool, width);
		}
	});
	canvas.addEventListener('mousedown', function(evt){
		var position = getMousePos(canvas, evt);
		draw(ctx, position.x, position.y, tool, width);
		click = true;
	});
	canvas.addEventListener('mouseup', function(evt){
		click = false;
	});
}


function draw(ctx, positionX, positionY, tool, width) {
		//console.log('CLICKx:' + positionX + ' , y:' + positionY);
		
		if (tool===0) {
			ctx.strokeStyle="#000000";
			ctx.fillStyle="#000000";
		} else if (tool===1){
			ctx.strokeStyle="#009933";
			ctx.fillStyle="#009933";
		} else if (tool===2){
			ctx.strokeStyle="#0099FF";
			ctx.fillStyle="#0099FF";
		} else if (tool===3){
			ctx.strokeStyle="#FF0000";
			ctx.fillStyle="#FF0000";
		} else if (tool===4){
			ctx.strokeStyle="#FFFFFF";
			ctx.fillStyle="#FFFFFF"
		}
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
