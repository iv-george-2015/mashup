/**
 * The tooltip is a singleton class . Only one instance of it can be existed on
 * for a page at a time .
 */
var Tooltip = (function() {
	var instance;

	function createInstance() {
		var object = new HoverDataViewer();
		return object;
	}

	return {
		getInstance : function() {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};

})();

function HoverDataViewer() {
	var displayElement_;
	var clientWindowWH_;
	var displayElementDimensions_;

	function init_() {
		displayElement_ = $("<div></div>").attr("id", 'tooltip').addClass(
				'tooltip').appendTo(document.body);
		clientWindowWH_ = {
			'w' : window.innerWidth,
			'h' : window.innerHeight
		}
		displayElementDimensions_ = {
			'w' : $(displayElement_).width(),
			'h' : $(displayElement_).height()
		}
	}

	function getMousePosition_(evt) {
		var x = evt.clientX;
		var y = evt.clientY;
		return {
			'x' : x + 10,
			'y' : y + 10
		};

	}

	function setDisplayElementPosition_() {
		var currentMousePosition = getMousePosition_();

	}
	
	function makeDisplayElement_(data){
		var headerElement = null;
		//if there is a header attribute in data make header element . 
		if( data!=undefined && data['header'] != undefined )
			{
			headerElement = $('<div>'+data['header']+'</div>').addClass('header');
			$(displayElement_).append(headerElement);
			}
		if( data!=undefined){
			for(dataVal in data['list']){
				var innerElement = $('<div>'+data['list'][dataVal]['label']+' : '+data['list'][dataVal]['value']+'</div>').addClass('label');

				$(displayElement_).append(innerElement);
			}

		}
	}

	this.show = function(evt, data) {
		if (displayElement_.hasClass('hide')) {
			$(displayElement_).removeClass('hide');
		}
		//TODO : No need to makeDisplayElement call when the same element as 'MOUSEENTER' is  'MOUSEMOVE'. 
		makeDisplayElement_.call(this,data);
		
		var pos = getMousePosition_.call(this, evt);
		// adjust position if the tooltip is going out of the page and scroll is
		// shown
		if ( pos.x + displayElementDimensions_.w  > clientWindowWH_.w ) {
			pos.x = pos.x - displayElementDimensions_.w;
		}
/*
		TODO:
		If the displayElement_s is creating y scroll we need to consider the scenario 
*/		
		$(displayElement_).offset({
			top : pos.y,
			left : pos.x
		})
		$(displayElement_).addClass('show');
	}

	this.hide = function(evt, data) {
		if (displayElement_.hasClass('show')) {
			$(displayElement_).removeClass('show');
		}
		$(displayElement_).addClass('hide');
		$(displayElement_).empty();
	}

	init_.call(this);
}