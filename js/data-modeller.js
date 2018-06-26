/**
 * A class that can handle data that is in various formats i.e raw formats and
 * make it to visualizable type .
 */

function DataModeller(data) {
	var data_ = data;
	var levelTree_;
	var nodeLevelMarker_ = {};
		
	/**
	 *  TODO :
	 *  The data may be in any order , only pre-condition is it should have data objects which have activity-name,predecessor,duration as properties .   
	 *	1) Need to identify the start and end nodes from data and form the iterating data from it .
	 *  2) Validate if the data is okay to draw a activity-diagram .
	 */
	function init_(){
		levelTree_ = []; 
		nodeLevelMarker_ = {};
		initNodeLevelMarker_.call(this);
		constructLevelTree_.call(this);
	};
	
	function initNodeLevelMarker_(){
		var dataNodeList = data_['data'];
		for (data in dataNodeList) {
			if (dataNodeList[data]['predecessor'] == '') {
				updateMarker_.call(this,0, dataNodeList[data]['activity-name']);
			} else {
				updateMarker_.call(this,1, dataNodeList[data]['activity-name']);
			}
		}
	}
	
	function constructLevelTree_(){
		var dataList = data_['data'];
		for (idx in dataList) {
			var activityLevel = getActivityLevel_.call(this,dataList[idx]['activity-name']);
			if (activityLevel == 0) {
				addToLevel_.call(this,'0', dataList[idx]['activity-name']);
				updateMarker_(this,0, dataList[idx]['activity-name']);
			} else {
				var nxtLevel = activityLevel + 1;
				var predecessorLvl = getActivityLevel_.call(this,dataList[idx]['predecessor']);
				if (activityLevel > predecessorLvl) {
					addToLevel_.call(this,activityLevel, dataList[idx]['activity-name']);
					updateMarker_.call(this,activityLevel,
							dataList[idx]['activity-name']);
				} else if (activityLevel == predecessorLvl) {
					// When activity-level of the node is same as that of
					// predecessor check if it is already exisiting in the
					// levelTree_ and
					// remove it from that level and add it to new level .
					var removed = removeFromLevel_.call(this,activityLevel,
							dataList[idx]['activity-name']);
					if (removed) {
						addToLevel_(this,nxtLevel, dataList[idx]['activity-name']);
					}
					addToLevel_.call(this,nxtLevel, dataList[idx]['activity-name']);
					updateMarker_.call(this,nxtLevel, dataList[idx]['activity-name']);
				} else if (activityLevel < predecessorLvl) {
					var predNxtLevel = predecessorLvl + 1;
					addToLevel_.call(this,predNxtLevel, dataList[idx]['activity-name']);
					updateMarker_.call(this,predNxtLevel,
									dataList[idx]['activity-name']);
				} else {
					throw new Error(dataList[idx]);
				}
			}
		}
		adjustNodesInLevelTree_.call(this);
	}
	
	function adjustNodesInLevelTree_(){
		var activityList = data_['data'];
		for (idx in activityList) {
			var predecessorActivityName = activityList[idx]['predecessor'];
			var predecessorActivityLevel = nodeLevelMarker_[predecessorActivityName];
			var activityLevel = nodeLevelMarker_[activityList[idx]['activity-name']];

			if (predecessorActivityLevel == undefined) {
				continue;
			}

			if ((activityLevel - predecessorActivityLevel) > 1) {
				// Remove the node from current level and move it to [activityLevel
				// - 1] level
				// Marker should be updated when the node is moved to another level
				// .
				removeFromLevel_.call(this,predecessorActivityLevel,
						predecessorActivityName);
				addToLevel_.call(this,activityLevel - 1, predecessorActivityName);
				updateMarker_.call(this,activityLevel - 1, predecessorActivityName);

			}
		}
	}
	
	function getActivityLevel_(activityName) {
		return nodeLevelMarker_[activityName];
	}
	
	/**
	 * Removes an activity from a level in levelTree_ . If the activity was
	 * available in the level it will not add it will return false els it will add
	 * and return true
	 */
	function addToLevel_(markerLevel, activityName) {
		var x = parseInt(markerLevel, 10);
		if (levelTree_[x] == undefined) {
			levelTree_[x] = [];
		}
		if (!levelContains_.call(this,markerLevel, activityName)) {
			levelTree_[x].push({
				'activity-name' : activityName
			});
			return true;
		}
		return false;

	}
	
	function levelContains_(level, activityName) {
		for (x in levelTree_[level]) {
			if (levelTree_[level][x] != undefined
					&& levelTree_[level][x]['activity-name'] == activityName)
				return true;
		}
		return false;
	}
	
	/**
	 * Removes an activity from a level in levelTree_ . If the activity was
	 * available in the level it will return true else it will return false
	 */
	function removeFromLevel_(level, activityName) {
		var y = null;
		for (x in levelTree_[level]) {
			var itrVal = levelTree_[level][x]['activity-name'];
			if (itrVal == activityName) {
				levelTree_[level].splice(x, 1);
				return true;
			}
		}
		return false;
	}
	
	function updateMarker_(level, activityName) {
		nodeLevelMarker_[activityName] = level;
	}
	
	//////////////////////////////////////////////////////////// PUBLIC-METHODS //////////////////////////////////////////////
	
	this.getLevels = function(){
		return levelTree_.length;
	}
	
	this.setData = function(data){
		data_ = data;
		init_.call(this);	
	}
	
	this.getLevelsTree = function() {
		return Object.assign({}, levelTree_);
	}
	
	this.getData = function() {
		return Object.assign({}, data_['data']);
	}
    ///////////////////////////////////////////////////////////////// Initialize //////////////////////////////////////////////////////////
	
	init_.call(this);
}
	


//DataModeller.prototype.init_ = function() {
//	
//	/**
//	 *  TODO :
//	 *  The data may be in any order , only pre-condition is it should have data objects which have activity-name,predecessor,duration as properties .   
//	 *	1) Need to identify the start and end nodes from data and form the iterating data from it .
//	 *  2) Validate if the data is okay to draw a activity-diagram .
//	 */
//	this.levelTree_ = []; 
//	this.nodeLevelMarker_ = {};
//	this.initNodeLevelMarker_();
//	this.constructLevelTree_();
//}

//DataModeller.prototype.constructLevelTree_ = function() {
//	var dataList = this.data_['data'];
//	for (idx in dataList) {
//		var activityLevel = this
//				.getActivityLevel_(dataList[idx]['activity-name']);
//		if (activityLevel == 0) {
//			this.addToLevel_('0', dataList[idx]['activity-name']);
//			this.updateMarker_(0, dataList[idx]['activity-name']);
//		} else {
//			var nxtLevel = activityLevel + 1;
//			var predecessorLvl = this
//					.getActivityLevel_(dataList[idx]['predecessor']);
//			if (activityLevel > predecessorLvl) {
//				this.addToLevel_(activityLevel, dataList[idx]['activity-name']);
//				this.updateMarker_(activityLevel,
//						dataList[idx]['activity-name']);
//			} else if (activityLevel == predecessorLvl) {
//				// When activity-level of the node is same as that of
//				// predecessor check if it is already exisiting in the
//				// levelTree_ and
//				// remove it from that level and add it to new level .
//				var removed = this.removeFromLevel_(activityLevel,
//						dataList[idx]['activity-name']);
//				if (removed) {
//					this.addToLevel_(nxtLevel, dataList[idx]['activity-name']);
//				}
//				this.addToLevel_(nxtLevel, dataList[idx]['activity-name']);
//				this.updateMarker_(nxtLevel, dataList[idx]['activity-name']);
//			} else if (activityLevel < predecessorLvl) {
//				var predNxtLevel = predecessorLvl + 1;
//				this.addToLevel_(predNxtLevel, dataList[idx]['activity-name']);
//				this
//						.updateMarker_(predNxtLevel,
//								dataList[idx]['activity-name']);
//			} else {
//				throw new Error(dataList[idx]);
//			}
//		}
//	}
//	this.adjustNodesInLevelTree_();
//}

/**
 * This method should be called after the levelTree_ has been constructed,
 * in order to re-adjust the node levels if there is a lot of gap between the
 * levels .
 */
//DataModeller.prototype.adjustNodesInLevelTree_ = function() {
//	var activityList = this.data_['data'];
//	for (idx in activityList) {
//		var predecessorActivityName = activityList[idx]['predecessor'];
//		var predecessorActivityLevel = this.nodeLevelMarker_[predecessorActivityName];
//		var activityLevel = this.nodeLevelMarker_[activityList[idx]['activity-name']];
//
//		if (predecessorActivityLevel == undefined) {
//			continue;
//		}
//
//		if ((activityLevel - predecessorActivityLevel) > 1) {
//			// Remove the node from current level and move it to [activityLevel
//			// - 1] level
//			// Marker should be updated when the node is moved to another level
//			// .
//			this.removeFromLevel_(predecessorActivityLevel,
//					predecessorActivityName);
//			this.addToLevel_(activityLevel - 1, predecessorActivityName);
//			this.updateMarker_(activityLevel - 1, predecessorActivityName);
//
//		}
//	}
//}

//DataModeller.prototype.initNodeLevelMarker_ = function() {
//	var dataNodeList = this.data_['data'];
//	for (data in dataNodeList) {
//		if (dataNodeList[data]['predecessor'] == '') {
//			this.updateMarker_(0, dataNodeList[data]['activity-name']);
//		} else {
//			this.updateMarker_(1, dataNodeList[data]['activity-name']);
//		}
//	}
//}

//DataModeller.prototype.getActivityLevel_ = function(activityName) {
//
//	return this.nodeLevelMarker_[activityName];
//}

///**
// * Removes an activity from a level in levelTree_ . If the activity was
// * available in the level it will not add it will return false els it will add
// * and return true
// */
//DataModeller.prototype.addToLevel_ = function(markerLevel, activityName) {
//	var x = parseInt(markerLevel, 10);
//	if (this.levelTree_[x] == undefined) {
//		this.levelTree_[x] = [];
//	}
//	if (!this.levelContains_(markerLevel, activityName)) {
//		this.levelTree_[x].push({
//			'activity-name' : activityName
//		});
//		return true;
//	}
//	return false;
//
//}

//DataModeller.prototype.levelContains_ = function(level, activityName) {
//	for (x in this.levelTree_[level]) {
//		if (this.levelTree_[level][x] != undefined
//				&& this.levelTree_[level][x]['activity-name'] == activityName)
//			return true;
//	}
//	return false;
//}

///**
// * Removes an activity from a level in levelTree_ . If the activity was
// * available in the level it will return true else it will return false
// */
//DataModeller.prototype.removeFromLevel_ = function(level, activityName) {
//	var y = null;
//	for (x in this.levelTree_[level]) {
//		var itrVal = this.levelTree_[level][x]['activity-name'];
//		if (itrVal == activityName) {
//			this.levelTree_[level].splice(x, 1);
//			return true;
//		}
//	}
//	return false;
//}

//DataModeller.prototype.updateMarker_ = function(level, activityName) {
//	this.nodeLevelMarker_[activityName] = level;
//}

//DataModeller.prototype.getLevels_ = function() {
//	return this.levelTree_.length;
//}

//DataModeller.prototype.getLevelsTree = function() {
//	return Object.assign({}, this.levelTree_);
//}

//DataModeller.prototype.getData = function() {
//	return Object.assign({}, this.data_['data']);
//}

//DataModeller.prototype.setData = function(data){
//	this.data_ = data;
//	this.init_();
//}

