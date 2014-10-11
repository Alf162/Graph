var dragMaster =(function(){
		var dragObj;
		var mouseOffset;

		function getMouseOffset(target, e){
			var docPos = getPosition(target);
			return {x:e.pageX - docPos.x, Y:e.pageY - docPos.y};
		}

		function mouseDown(e){
			dragObj = this;
			mouseOffset = getMouseOffset(this,e);
			document.onmousemove = mouseMove;
			document.onmouseup = mouseUp;
			document.ondragstart = function(){ return false; }
			document.body.onselectstart = function(){ return false; }

			return false;
		}

		function mouseMove(e){
			dragObj.style.position = 'absolute';
			dragObj.style.top  = e.pageY - mouseOffset.Y  + 'px';
			dragObj.style.left = e.pageX - mouseOffset.x  + 'px';

			return false;
		}

		function mouseUp(e){
			updateNodes(dragObj);
			//console.log(simpNodes.toSource());
			drawLinesNodes();
			dragObj = null;

			document.onmousemove		= null;
			document.onmouseup	 		= null;
			document.ondragstart    	= null;
			document.body.onselectstart = null;
		}

		return {
			init: function(){
				document.onmousemove = mouseMove;
			},

			makeDraggable: function(el){
				el.onmousedown = mouseDown;
			}
		};
	})();