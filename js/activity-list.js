/**
 * Define the node for each activity and its properties .
 */
var Node = function() {
		this.predecessors = [];
		this.followers = [];
		this.est_ = 0;
		this.eft_ = 0;
		this.lst_ = 0;
		this.lft_ = 0;
		this.duration_;
}

function ActivityLinkedList(dataModeller) {

	this.activitiesMap_ = new Map();

	this.dataModeller_ = dataModeller;

//	this.init_();

	this.criticalActivityList_ = [] ;
	
	var init_ = function() {
		var data = this.dataModeller_.getData();
		for (idx in data) {
			var node = new Node();
			node.duration_ = data[idx]['duration'];
			this.activitiesMap_.set(data[idx]['activity-name'], node);
//			this.container_.getNode_(data[idx]['activity-name']).innerText = node.duration_+'/' ;
		}
		this.activitiesMap_.forEach(function(value, key) {
			for (idx in data) {
				if (data[idx]['activity-name'] == key
						&& data[idx]['predecessor'] != '') {
					value['predecessors'].push(data[idx]['predecessor']);
					this.activitiesMap_.get(data[idx]['predecessor'])['followers']
							.push(data[idx]['activity-name']);
				}

			}
		}.bind(this));
	}
	
	var forwardPass_ = function() {
		// iterating the list of activities that are available by levels
		// so that the previous activities are evaluated before hand .
		var levelTree = this.dataModeller_.getLevelsTree();
		for (level in levelTree) {
			for (node in levelTree[level]) {
				var value = this.activitiesMap_
						.get(levelTree[level][node]['activity-name']);
				var preActDurationArray = [];
				for (x in value['predecessors']) {
					preActDurationArray.push(this.activitiesMap_
							.get(value['predecessors'][x]).eft_);
				}
				if(preActDurationArray.length != 0){
					value.est_ = Math.max(...preActDurationArray);	
				}
				value.eft_ = value.duration_ + value.est_;
//				var existTxt = this.container_.getNode_(levelTree[level][node]['activity-name']).innerText;
//				this.container_.getNode_(levelTree[level][node]['activity-name']).innerText = existTxt+''+value.est_+'-'+value.eft_+'/' ;
			}
		}

	}
	
	var backwardPass_ = function() {
	    
		var levelTreeR = this.dataModeller_.getLevelsTree();
		var level = this.dataModeller_.getLevels();
		level = level -1;
		for (;level>=0;level--) {
			for (node in levelTreeR[level]) {
				
				var value = this.activitiesMap_
						.get(levelTreeR[level][node]['activity-name']);
				var follActDurationArray = [];
				for (x in value['followers']) {
					follActDurationArray.push(this.activitiesMap_
							.get(value['followers'][x]).lst_);
				}

				if(follActDurationArray.length == 0){
					value.lft_ = value.eft_;
				}else{
					value.lft_ = Math.min(...follActDurationArray);
				}
				value.lst_ = value.lft_ - value.duration_;
				
				if(value.est_==value.lst_ && value.eft_== value.lft_){
					this.criticalActivityList_.push(levelTreeR[level][node]['activity-name']);
//					this.container_.getNode_(levelTreeR[level][node]['activity-name']).style.backgroundColor = '#e4c3e6';
//					this.container_.getNode_(levelTreeR[level][node]['activity-name']).style.borderColor = '#f70d22';
				}
//				var existTxt = this.container_.getNode_(levelTreeR[level][node]['activity-name']).innerText;
//				this.container_.getNode_(levelTreeR[level][node]['activity-name']).innerText = existTxt+''+value.lst_+'-'+value.lft_ ;
			}
		}
	}
	
	this.getCriticalPath = function(){
		forwardPass_.call(this);
		backwardPass_.call(this);
		return Object.assign({}, this.criticalActivityList_);
	}

	init_.call(this);
}

//ActivityLinkedList.prototype.init_ = function() {
//	var data = this.dataModeller_.getData();
//	for (idx in data) {
//		var node = new Node();
//		node.duration_ = data[idx]['duration'];
//		this.activitiesMap_.set(data[idx]['activity-name'], node);
////		this.container_.getNode_(data[idx]['activity-name']).innerText = node.duration_+'/' ;
//	}
//	this.activitiesMap_.forEach(function(value, key) {
//		for (idx in data) {
//			if (data[idx]['activity-name'] == key
//					&& data[idx]['predecessor'] != '') {
//				value['predecessors'].push(data[idx]['predecessor']);
//				this.activitiesMap_.get(data[idx]['predecessor'])['followers']
//						.push(data[idx]['activity-name']);
//			}
//
//		}
//	}.bind(this));
//}

//ActivityLinkedList.prototype.forwardPass_ = function() {
//	// iterating the list of activities that are available by levels
//	// so that the previous activities are evaluated before hand .
//	var levelTree = this.dataModeller_.getLevelsTree();
//	for (level in levelTree) {
//		for (node in levelTree[level]) {
//			var value = this.activitiesMap_
//					.get(levelTree[level][node]['activity-name']);
//			var preActDurationArray = [];
//			for (x in value['predecessors']) {
//				preActDurationArray.push(this.activitiesMap_
//						.get(value['predecessors'][x]).eft_);
//			}
//			if(preActDurationArray.length != 0){
//				value.est_ = Math.max(...preActDurationArray);	
//			}
//			value.eft_ = value.duration_ + value.est_;
////			var existTxt = this.container_.getNode_(levelTree[level][node]['activity-name']).innerText;
////			this.container_.getNode_(levelTree[level][node]['activity-name']).innerText = existTxt+''+value.est_+'-'+value.eft_+'/' ;
//		}
//	}
//
//}

//ActivityLinkedList.prototype.backwardPass_ = function() {
//    
//	var levelTreeR = this.dataModeller_.getLevelsTree();
//	var level = this.dataModeller_.getLevels();
//	level = level -1;
//	for (;level>=0;level--) {
//		for (node in levelTreeR[level]) {
//			
//			var value = this.activitiesMap_
//					.get(levelTreeR[level][node]['activity-name']);
//			var follActDurationArray = [];
//			for (x in value['followers']) {
//				follActDurationArray.push(this.activitiesMap_
//						.get(value['followers'][x]).lst_);
//			}
//
//			if(follActDurationArray.length == 0){
//				value.lft_ = value.eft_;
//			}else{
//				value.lft_ = Math.min(...follActDurationArray);
//			}
//			value.lst_ = value.lft_ - value.duration_;
//			
//			if(value.est_==value.lst_ && value.eft_== value.lft_){
//				this.criticalActivityList_.push(levelTreeR[level][node]['activity-name']);
////				this.container_.getNode_(levelTreeR[level][node]['activity-name']).style.backgroundColor = '#e4c3e6';
////				this.container_.getNode_(levelTreeR[level][node]['activity-name']).style.borderColor = '#f70d22';
//			}
////			var existTxt = this.container_.getNode_(levelTreeR[level][node]['activity-name']).innerText;
////			this.container_.getNode_(levelTreeR[level][node]['activity-name']).innerText = existTxt+''+value.lst_+'-'+value.lft_ ;
//		}
//	}
//}

//ActivityLinkedList.prototype.getCriticalPath = function(){
//	forwardPass_.call(this);
//	backwardPass_.call(this);
//	return Object.assign({}, this.criticalActivityList_);
//}