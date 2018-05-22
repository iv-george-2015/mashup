/**
 * Defines all the common config objects . 
 * Needs to be added common for all 
 */

var defTemplateConfig = {
		"activity-node":{
			element : "DIV",
			cssClass : "activity-node" 
		},
		"container" :{
			element : "DIV",
			cssClass : "container"
		},
		getConfig : function (name){
			return this[name];
		},
		getTag : function (){
			return '';
		}
}