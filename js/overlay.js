/**
 * A Class which handles all the actions and animations that are performed on the svg element overlayed on the container .
 * 
 */

function Overlay(width, height, opt_id) {

	var id_ = opt_id;

	var element_ = null;

	var width_ = width;

	var height_ = height;

	function init_() {
		var x = width_;
		var y = height_;
		var svg = document.getElementById(id_ + "-svg-overlay");
		if (null == svg) {
			svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute('id', id_ + "-svg-overlay");
			svg.setAttribute('style', 'position:absolute;');
			svg.setAttribute('width', x);
			svg.setAttribute('height', y);
			svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink",
					"http://www.w3.org/1999/xlink");
			element_ = svg;
		}
	}

	this.drawCircle = function(x, y, radius, color) {
		var shape = document.createElementNS("http://www.w3.org/2000/svg",
				"circle");
		shape.setAttributeNS(null, "cx", x);
		shape.setAttributeNS(null, "cy", y);
		shape.setAttributeNS(null, "r", radius);
		shape.setAttributeNS(null, "fill", color);
		element_.appendChild(shape);
	}

	this.drawCurvedline = function(x1, y1, x2, y2, color, tension) {
		var shape = document.createElementNS("http://www.w3.org/2000/svg",
				"path");
		var delta = (x2 - x1) * tension;
		var hx1 = x1 + delta;
		var hy1 = y1;
		var hx2 = x2 - delta;
		var hy2 = y2;
		var path = "M " + x1 + " " + y1 + " C " + hx1 + " " + hy1 + " " + hx2
				+ " " + hy2 + " " + x2 + " " + y2;
		shape.setAttributeNS(null, "d", path);
		shape.setAttributeNS(null, "fill", "none");
		shape.setAttributeNS(null, "stroke", color);
		element_.appendChild(shape);
	}

	this.getElement = function() {
		return element_;
	}

	this.fitToSize = function(x, y) {
		element_.setAttribute('width', x);
		element_.setAttribute('height', y);
	}

	init_.call(this);
}

//Overlay.prototype.init_ = function() {
//	var x = this.width_;
//	var y = this.height_;
//	var svg = document.getElementById(this.id_ + "-svg-overlay");
//	if (null == svg) {
//		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//		svg.setAttribute('id', this.id_ + "-svg-overlay");
//		svg.setAttribute('style', 'position:absolute;');
//		svg.setAttribute('width', x);
//		svg.setAttribute('height', y);
//		svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink",
//				"http://www.w3.org/1999/xlink");
//		this.element_ = svg;
//	}
//}

//Overlay.prototype.getElement = function() {
//	return this.element_;
//}

//Overlay.prototype.drawCircle_ = function(x, y, radius, color) {
//	var shape = document
//			.createElementNS("http://www.w3.org/2000/svg", "circle");
//	shape.setAttributeNS(null, "cx", x);
//	shape.setAttributeNS(null, "cy", y);
//	shape.setAttributeNS(null, "r", radius);
//	shape.setAttributeNS(null, "fill", color);
//	this.element_.appendChild(shape);
//}

//Overlay.prototype.drawCurvedline_ = function drawCurvedLine(x1, y1, x2, y2, color, tension) {
//    var shape = document.createElementNS("http://www.w3.org/2000/svg", 
//                                         "path");
//    var delta = (x2-x1)*tension;
//    var hx1=x1+delta;
//    var hy1=y1;
//    var hx2=x2-delta;
//    var hy2=y2;
//    var path = "M "  + x1 + " " + y1 + 
//               " C " + hx1 + " " + hy1 
//                     + " "  + hx2 + " " + hy2 
//               + " " + x2 + " " + y2;
//    shape.setAttributeNS(null, "d", path);
//    shape.setAttributeNS(null, "fill", "none");
//    shape.setAttributeNS(null, "stroke", color);
//    this.element_.appendChild(shape);
//}

//Overlay.prototype.fitToSize = function(x,y){
//	this.element_.setAttribute('width', x);
//	this.element_.setAttribute('height', y);
//}

