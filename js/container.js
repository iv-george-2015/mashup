/**
 * Container class defines the element and its properties that wraps the diagram .
 */

function Container(id, opt_data) {

	this.id_ = id;

	this.element_ = null;

	this.overlay_ = null;

	this.nodeList_ = [];

	this.dataModeller_ = opt_data != null ? new DataModeller(opt_data)
			: new DataModeller({});

}

Container.prototype.create = function() {
	// Append 'DIV' element if no such DIV element exist .
	// Add CSS property to it .
	var x = defTemplateConfig.getConfig('container').element;
	this.element_ = $('#' + this.id_);
	if (!this.element_.is(x)) {
		this.element_ = $("<div></div>").attr("id", this.id_).appendTo(
				document.body);
	}

	this.element_.addClass("container");
	this.setOverlay_();
	this.drawActivityDiagram();
	$( window ).resize(function() {
		  this.redraw();
	}.bind(this));
}

Container.prototype.createLevels_ = function(level) {
	if (this.element_ != null) {
		for (var i = 0; i < level; i++)
			$("<div></div>").addClass("level").appendTo(this.element_);
	}
}

Container.prototype.addNode = function(level, node) {
	var selector = "div.level:eq(" + level + ")";
	$("<div></div>").attr("id", this.id_ + '-' + node['activity-name'])
			.addClass("node").appendTo(this.element_.find(selector));
	this.setOverlay_();
}

Container.prototype.setOverlay_ = function() {
	var x = this.element_.width();
	var y = this.element_.height();
	var id = this.id_;
	if (this.overlay_ == null) {
		this.overlay_ = new Overlay(x, y, this.id_)
		this.element_.append(this.overlay_.getElement());
	} else {
		this.overlay_.fitToSize(x, y);
	}

}

//Container.prototype.getOverlay = function() {
//	return this.overlay_;
//}

Container.prototype.getNode_ = function(nodeId) {
	return $('#' + this.id_ + '-' + nodeId).get([ 0 ]);
}

Container.prototype.drawNodeEndpoints_ = function(nodeName) {

	var connectorPts = this.getCircleDrawPoint_(nodeName,2);
	this.overlay_.drawCircle_(connectorPts.rightEndPtX,
			connectorPts.rightEndPtY,5, '#FAEBD7');
}

Container.prototype.getNodeEndPoints_ = function(nodeName) {
	var nodeMargin = 20;
	var nodeWidth = 100;
	var nodeHeight = 30;
	var nodeBoder = 2;

	var node = this.getNode_(nodeName);
	var nodePos = $(node).position();

	var nodePosLeft = nodePos.left;
	var nodePosTop = nodePos.top;

	var containerMarginLeft = 2;
	var containerMarginTop = 2;

	var overlayPos = $(this.overlay_.getElement()).position();

	var overlayLeft = overlayPos.left;
	var overlayTop = overlayPos.top;

	var relativeXRight = nodePosLeft - overlayLeft + nodeMargin + nodeWidth + 2
			* nodeBoder;
	var relativeYRight = nodePosTop - overlayTop + nodeMargin + nodeHeight / 2
			+ 2 * nodeBoder;

	var relativeXLeft = nodePosLeft - overlayLeft + nodeMargin;
	var relativeYLeft = nodePosTop - overlayTop + nodeMargin + nodeHeight / 2
			+ 2 * nodeBoder;

	return {
		rightEndPtX : relativeXRight,
		rightEndPtY : relativeYRight,
		leftEndPtX : relativeXLeft,
		leftEndPtY : relativeYLeft
	};
}

Container.prototype.getCircleDrawPoint_ = function(nodeName,radius) {
	var nodeMargin = 20;
	var nodeWidth = 100;
	var nodeHeight = 30;
	var nodeBoder = 2;

	var node = this.getNode_(nodeName);
	var nodePos = $(node).position();

	var nodePosLeft = nodePos.left;
	var nodePosTop = nodePos.top;

	var containerMarginLeft = 2;
	var containerMarginTop = 2;

	var overlayPos = $(this.overlay_.getElement()).position();

	var overlayLeft = overlayPos.left;
	var overlayTop = overlayPos.top;

	var relativeXRight = nodePosLeft - overlayLeft + nodeMargin + nodeWidth + 2
			* nodeBoder+radius/2;
	var relativeYRight = nodePosTop - overlayTop + nodeMargin + nodeHeight / 2
			+ 2 * nodeBoder;

	var relativeXLeft = nodePosLeft - overlayLeft + nodeMargin;
	var relativeYLeft = nodePosTop - overlayTop + nodeMargin + nodeHeight / 2
			+ 2 * nodeBoder;

	return {
		rightEndPtX : relativeXRight,
		rightEndPtY : relativeYRight,
		leftEndPtX : relativeXLeft,
		leftEndPtY : relativeYLeft
	};
}

Container.prototype.drawActivityDiagram = function() {
	this.createLevels_(this.dataModeller_.getLevels_());
	this.drawLevelTree_();
}

Container.prototype.drawLevelTree_ = function() {
	var levelTree = this.dataModeller_.getLevelsTree();
	for (level in levelTree) {
		for (node in levelTree[level]) {
			this.addNode(level, levelTree[level][node]);
		}
	}
	var activityList = this.dataModeller_.getData();
	this.connectNodes_(activityList);
}

Container.prototype.connectNodes_ = function(activityList) {
	for (idx in activityList) {
		if (activityList[idx]['predecessor'] != '') {
			var startNode = activityList[idx]['predecessor'];
			var endNode = activityList[idx]['activity-name'];
			
			var node1ConntorPts1 = this.getNodeEndPoints_(startNode);
			var node2ConntorPts2 = this.getNodeEndPoints_(endNode);
			this.drawNodeEndpoints_(activityList[idx]['activity-name']);
			this.drawNodeEndpoints_(activityList[idx]['predecessor']);
			this.overlay_.drawCurvedline_(node1ConntorPts1.rightEndPtX,
					node1ConntorPts1.rightEndPtY, node2ConntorPts2.leftEndPtX,
					node2ConntorPts2.leftEndPtY, '#FAEBD7', 0.1);
		}
	}
}

Container.prototype.redraw = function(){
	this.element_.empty();
	this.overlay_=null;
	this.setOverlay_();
	this.drawActivityDiagram();
}
