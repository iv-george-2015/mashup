/**
 * Container class defines the element and its properties that wraps the diagram .
 */

function Container(id, opt_data) {

	var id_ = id;

	var containerElement_ = null;

	var overlay_ = null;

	var dataModeller_ = opt_data != null ? new DataModeller(opt_data)
			: new DataModeller({});

	var activityList_ = null;

	function setOverlay_() {
		var x = containerElement_.width();
		var y = containerElement_.height();
		var id = id_;
		if (overlay_ == null) {
			overlay_ = new Overlay(x, y, id_)
			containerElement_.append(overlay_.getElement());
		} else {
			overlay_.fitToSize(x, y);
		}

	}

	function getNode_(nodeId) {
		return $('#' + id_ + '-' + nodeId).get([ 0 ]);
	}

	function getNodeEndPoints_(nodeName) {
		var nodeMargin = 20;
		var nodeWidth = 100;
		var nodeHeight = 30;
		var nodeBoder = 2;

		var node = getNode_.call(this, nodeName);
		var nodePos = $(node).position();

		var nodePosLeft = nodePos.left;
		var nodePosTop = nodePos.top;

		var containerMarginLeft = 2;
		var containerMarginTop = 2;

		var overlayPos = $(overlay_.getElement()).position();

		var overlayLeft = overlayPos.left;
		var overlayTop = overlayPos.top;

		var relativeXRight = nodePosLeft - overlayLeft + nodeMargin + nodeWidth
				+ 2 * nodeBoder;
		var relativeYRight = nodePosTop - overlayTop + nodeMargin + nodeHeight
				/ 2 + 2 * nodeBoder;

		var relativeXLeft = nodePosLeft - overlayLeft + nodeMargin;
		var relativeYLeft = nodePosTop - overlayTop + nodeMargin + nodeHeight
				/ 2 + 2 * nodeBoder;

		return {
			rightEndPtX : relativeXRight,
			rightEndPtY : relativeYRight,
			leftEndPtX : relativeXLeft,
			leftEndPtY : relativeYLeft
		};
	}

	function connectNodes_(activityList) {
		for (idx in activityList) {
			if (activityList[idx]['predecessor'] != '') {
				var startNode = activityList[idx]['predecessor'];
				var endNode = activityList[idx]['activity-name'];

				var node1ConntorPts1 = getNodeEndPoints_.call(this, startNode);
				var node2ConntorPts2 = getNodeEndPoints_.call(this, endNode);
				drawNodeEndpoints_.call(this,
						activityList[idx]['activity-name']);
				drawNodeEndpoints_.call(this, activityList[idx]['predecessor']);
				overlay_.drawCurvedline(node1ConntorPts1.rightEndPtX,
						node1ConntorPts1.rightEndPtY,
						node2ConntorPts2.leftEndPtX,
						node2ConntorPts2.leftEndPtY, '#FAEBD7', 0.1);
			}
		}
	}
	function drawLevelTree_() {
		var levelTree = dataModeller_.getLevelsTree();
		for (level in levelTree) {
			for (node in levelTree[level]) {
				this.addNode(level, levelTree[level][node]);
			}
		}
		var activityList = dataModeller_.getData();
		connectNodes_.call(this, activityList);
	}
	function drawNodeEndpoints_(nodeName) {

		var connectorPts = getCircleDrawPoint_.call(this,nodeName, 2);
		overlay_.drawCircle(connectorPts.rightEndPtX,
				connectorPts.rightEndPtY, 5, '#FAEBD7');
	}
	
	function getCircleDrawPoint_(nodeName, radius) {
		var nodeMargin = 20;
		var nodeWidth = 100;
		var nodeHeight = 30;
		var nodeBoder = 2;

		var node = getNode_.call(this,nodeName);
		var nodePos = $(node).position();

		var nodePosLeft = nodePos.left;
		var nodePosTop = nodePos.top;

		var containerMarginLeft = 2;
		var containerMarginTop = 2;

		var overlayPos = $(overlay_.getElement()).position();

		var overlayLeft = overlayPos.left;
		var overlayTop = overlayPos.top;

		var relativeXRight = nodePosLeft - overlayLeft + nodeMargin + nodeWidth + 2
				* nodeBoder + radius / 2;
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
	
	function markCritical_(cpList) {
		for (x in cpList) {
			getNode_(cpList[x]).style.backgroundColor = '#e4c3e6';
			getNode_(cpList[x]).style.borderColor = '#f70d22';
		}

	}
	
	this.create = function() {
		// Append 'DIV' element if no such DIV element exist .
		// Add CSS property to it .
		var x = defTemplateConfig.getConfig('container').element;
		containerElement_ = $('#' + id_);
		if (!containerElement_.is(x)) {
			containerElement_ = $("<div></div>").attr("id", id_)
					.appendTo(document.body);
		}

		containerElement_.addClass("container");
		setOverlay_();
		$(window).resize(function() {
			this.redraw();
		}.bind(this));
	}
	
	this.createLevels = function(level) {
		if (containerElement_ != null) {
			for (var i = 0; i < level; i++)
				$("<div></div>").addClass("level").appendTo(containerElement_);
		}
	}

	this.addNode = function(level, node) {
		var selector = "div.level:eq(" + level + ")";
		$("<div></div>").attr("id", id_ + '-' + node['activity-name'])
				.addClass("node").appendTo(
						containerElement_.find(selector));
		setOverlay_.call(this);
	}

	this.redraw = function() {
		containerElement_.empty();
		overlay_ = null;
		setOverlay_();
		this.drawActivityDiagram(this.data_);
	}

	this.drawActivityDiagram = function(data) {
		this.data_ = data;
		dataModeller_.setData(data);
		this.createLevels(dataModeller_.getLevels());
		drawLevelTree_.call(this);
		activityList_ = new ActivityLinkedList(dataModeller_);
		markCritical_.call(this,activityList_.getCriticalPath());

	}
}

// Container.prototype.create = function() {
// // Append 'DIV' element if no such DIV element exist .
// // Add CSS property to it .
// var x = defTemplateConfig.getConfig('container').element;
// this.containerElement_ = $('#' + this.id_);
// if (!this.containerElement_.is(x)) {
// this.containerElement_ = $("<div></div>").attr("id", this.id_).appendTo(
// document.body);
// }
//
// this.containerElement_.addClass("container");
// this.setOverlay_();
// $( window ).resize(function() {
// this.redraw();
// }.bind(this));
// }

//Container.prototype.createLevels_ = function(level) {
//	if (this.containerElement_ != null) {
//		for (var i = 0; i < level; i++)
//			$("<div></div>").addClass("level").appendTo(this.containerElement_);
//	}
//}

// Container.prototype.addNode = function(level, node) {
// var selector = "div.level:eq(" + level + ")";
// $("<div></div>").attr("id", this.id_ + '-' + node['activity-name'])
// .addClass("node").appendTo(this.containerElement_.find(selector));
// this.setOverlay_();
// }

// Container.prototype.setOverlay_ = function() {
// var x = this.containerElement_.width();
// var y = this.containerElement_.height();
// var id = this.id_;
// if (this.overlay_ == null) {
// this.overlay_ = new Overlay(x, y, this.id_)
// this.containerElement_.append(this.overlay_.getElement());
// } else {
// this.overlay_.fitToSize(x, y);
// }
//
// }

// Container.prototype.getNode_ = function(nodeId) {
// return $('#' + this.id_ + '-' + nodeId).get([ 0 ]);
// }

// Container.prototype.drawNodeEndpoints_ = function(nodeName) {
//
// var connectorPts = this.getCircleDrawPoint_(nodeName, 2);
// this.overlay_.drawCircle(connectorPts.rightEndPtX,
// connectorPts.rightEndPtY, 5, '#FAEBD7');
// }

// Container.prototype.getNodeEndPoints_ = function(nodeName) {
// var nodeMargin = 20;
// var nodeWidth = 100;
// var nodeHeight = 30;
// var nodeBoder = 2;
//
// var node = getNode_.call(this,nodeName);
// var nodePos = $(node).position();
//
// var nodePosLeft = nodePos.left;
// var nodePosTop = nodePos.top;
//
// var containerMarginLeft = 2;
// var containerMarginTop = 2;
//
// var overlayPos = $(this.overlay_.getElement()).position();
//
// var overlayLeft = overlayPos.left;
// var overlayTop = overlayPos.top;
//
// var relativeXRight = nodePosLeft - overlayLeft + nodeMargin + nodeWidth + 2
// * nodeBoder;
// var relativeYRight = nodePosTop - overlayTop + nodeMargin + nodeHeight / 2
// + 2 * nodeBoder;
//
// var relativeXLeft = nodePosLeft - overlayLeft + nodeMargin;
// var relativeYLeft = nodePosTop - overlayTop + nodeMargin + nodeHeight / 2
// + 2 * nodeBoder;
//
// return {
// rightEndPtX : relativeXRight,
// rightEndPtY : relativeYRight,
// leftEndPtX : relativeXLeft,
// leftEndPtY : relativeYLeft
// };
// }

//Container.prototype.getCircleDrawPoint_ = function(nodeName, radius) {
//	var nodeMargin = 20;
//	var nodeWidth = 100;
//	var nodeHeight = 30;
//	var nodeBoder = 2;
//
//	var node = getNode_.call(this,nodeName);
//	var nodePos = $(node).position();
//
//	var nodePosLeft = nodePos.left;
//	var nodePosTop = nodePos.top;
//
//	var containerMarginLeft = 2;
//	var containerMarginTop = 2;
//
//	var overlayPos = $(this.overlay_.getElement()).position();
//
//	var overlayLeft = overlayPos.left;
//	var overlayTop = overlayPos.top;
//
//	var relativeXRight = nodePosLeft - overlayLeft + nodeMargin + nodeWidth + 2
//			* nodeBoder + radius / 2;
//	var relativeYRight = nodePosTop - overlayTop + nodeMargin + nodeHeight / 2
//			+ 2 * nodeBoder;
//
//	var relativeXLeft = nodePosLeft - overlayLeft + nodeMargin;
//	var relativeYLeft = nodePosTop - overlayTop + nodeMargin + nodeHeight / 2
//			+ 2 * nodeBoder;
//
//	return {
//		rightEndPtX : relativeXRight,
//		rightEndPtY : relativeYRight,
//		leftEndPtX : relativeXLeft,
//		leftEndPtY : relativeYLeft
//	};
//}

// Container.prototype.drawActivityDiagram = function(data) {
// this.data_ = data;
// this.dataModeller_.setData(data);
// this.createLevels_(this.dataModeller_.getLevels());
// drawLevelTree_.call(this);
// this.activityList_ = new ActivityLinkedList(this.dataModeller_);
// this.markCritical_(this.activityList_.getCriticalPath());
//
// }

//Container.prototype.markCritical_ = function(cpList) {
//	for (x in cpList) {
//		this.getNode_(cpList[x]).style.backgroundColor = '#e4c3e6';
//		this.getNode_(cpList[x]).style.borderColor = '#f70d22';
//	}
//
//}

// Container.prototype.drawLevelTree_ = function() {
// var levelTree = this.dataModeller_.getLevelsTree();
// for (level in levelTree) {
// for (node in levelTree[level]) {
// this.addNode(level, levelTree[level][node]);
// }
// }
// var activityList = this.dataModeller_.getData();
// connectNodes_.call(this,activityList);
// }

// Container.prototype.connectNodes_ = function(activityList) {
// for (idx in activityList) {
// if (activityList[idx]['predecessor'] != '') {
// var startNode = activityList[idx]['predecessor'];
// var endNode = activityList[idx]['activity-name'];
//
// var node1ConntorPts1 = getNodeEndPoints_(startNode);
// var node2ConntorPts2 = getNodeEndPoints_(endNode);
// this.drawNodeEndpoints_(activityList[idx]['activity-name']);
// this.drawNodeEndpoints_(activityList[idx]['predecessor']);
// this.overlay_.drawCurvedline(node1ConntorPts1.rightEndPtX,
// node1ConntorPts1.rightEndPtY, node2ConntorPts2.leftEndPtX,
// node2ConntorPts2.leftEndPtY, '#FAEBD7', 0.1);
// }
// }
// }

// Container.prototype.redraw = function() {
// this.containerElement_.empty();
// this.overlay_ = null;
// this.setOverlay_();
// this.drawActivityDiagram(this.data_);
//}
