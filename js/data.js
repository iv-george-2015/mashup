/**
 * The file contains object that represents some data models that represent Real
 * time data .
 */

var DURATION_TYPE = {
	'DATE' : 'date',
	'NUMERIC' : 'number'
}

var activity_data = {
	durationType : DURATION_TYPE.NUMERIC,
	data : [ 
	   {
		'activity-name' : 'ST',
		'predecessor' : '',
		'duration' : 0
	},{
		'activity-name' : 'ST',
		'predecessor' : '',
		'duration' : 0
	},{
		'activity-name' : 'a',
		'predecessor' : 'ST',
		'duration' : 5
	}, {
		'activity-name' : 'b',
		'predecessor' : 'ST',
		'duration' : 2
	}, {
		'activity-name' : 'c',
		'predecessor' : 'a',
		'duration' : 3
	}, {
		'activity-name' : 'd',
		'predecessor' : 'b',
		'duration' : 9
	}, {
		'activity-name' : 'e',
		'predecessor' : 'c',
		'duration' : 7
	}, {
		'activity-name' : 'f',
		'predecessor' : 'c',
		'duration' : 5
	}, {
		'activity-name' : 'g',
		'predecessor' : 'd',
		'duration' : 5
	}, {
		'activity-name' : 'g',
		'predecessor' : 'e',
		'duration' : 5
	}, {
		'activity-name' : 'g',
		'predecessor' : 'f',
		'duration' : 5
	}, {
		'activity-name' : 'h',
		'predecessor' : 'g',
		'duration' : 4
	}, {
		'activity-name' : 'i',
		'predecessor' : 'g',
		'duration' : 7
	},{
		'activity-name' : 'j',
		'predecessor' : 'c',
		'duration' : 20
	},{
		'activity-name' : 'h',
		'predecessor' : 'j',
		'duration' : 7
	} ,{
		'activity-name' : 'ED',
		'predecessor' : 'h',
		'duration' : 0
	} ,{
		'activity-name' : 'ED',
		'predecessor' : 'i',
		'duration' : 0
	} ]
}

var activity_data1 = {
		durationType : DURATION_TYPE.NUMERIC,
		data : [{
			'activity-name' : 'ST-ACT',
			'predecessor' : '',
			'duration' : 0
		},{
			'activity-name' : 'FS',
			'predecessor' : 'ST-ACT',
			'duration' : 6
		}, {
			'activity-name' : 'DH',
			'predecessor' : 'FS',
			'duration' : 4
		}, {
			'activity-name' : 'DS',
			'predecessor' : 'FS',
			'duration' : 6
		}, {
			'activity-name' : 'LM',
			'predecessor' : 'FS',
			'duration' : 3
		}, {
			'activity-name' : 'BH',
			'predecessor' : 'DH',
			'duration' : 2
		}, {
			'activity-name' : 'TH',
			'predecessor' : 'BH',
			'duration' : 3
		}, {
			'activity-name' : 'RH',
			'predecessor' : 'TH',
			'duration' : 2
		}, {
			'activity-name' : 'RH',
			'predecessor' : 'DS',
			'duration' : 2
		}, {
			'activity-name' : 'CS',
			'predecessor' : 'TH',
			'duration' : 4
		}, {
			'activity-name' : 'CS',
			'predecessor' : 'DS',
			'duration' : 4
		}, {
			'activity-name' : 'FM',
			'predecessor' : 'LM',
			'duration' : 4
		}, {
			'activity-name' : 'RM',
			'predecessor' : 'FM',
			'duration' : 4
		}, {
			'activity-name' : 'MH',
			'predecessor' : 'RH',
			'duration' : 4
		}, {
			'activity-name' : 'RS',
			'predecessor' : 'CS',
			'duration' : 4
		}, {
			'activity-name' : 'PM',
			'predecessor' : 'RM',
			'duration' : 4
		}, {
			'activity-name' : 'ED-ACT',
			'predecessor' : 'MH',
			'duration' : 0
		}, {
			'activity-name' : 'ED-ACT',
			'predecessor' : 'RS',
			'duration' : 0
		}, {
			'activity-name' : 'ED-ACT',
			'predecessor' : 'PM',
			'duration' : 0
		}]
	}

var activity_data2 = {
		durationType : DURATION_TYPE.NUMERIC,
		data : [{
			'activity-name' : 'ST',
			'predecessor' : '',
			'duration' : 0
		},{
			'activity-name' : 'a',
			'predecessor' : 'ST',
			'duration' : 6
		}, {
			'activity-name' : 'g',
			'predecessor' : 'ST',
			'duration' : 3
		}, {
			'activity-name' : 'd',
			'predecessor' : 'a',
			'duration' : 6
		}, {
			'activity-name' : 'e',
			'predecessor' : 'd',
			'duration' : 6
		},{
			'activity-name' : 'b',
			'predecessor' : 'a',
			'duration' : 3
		}, {
			'activity-name' : 'c',
			'predecessor' : 'b',
			'duration' : 2
		}, {
			'activity-name' : 'j',
			'predecessor' : 'b',
			'duration' : 3
		}, {
			'activity-name' : 'j',
			'predecessor' : 'i',
			'duration' : 3
		}, {
			'activity-name' : 'h',
			'predecessor' : 'g',
			'duration' : 2
		}, {
			'activity-name' : 'i',
			'predecessor' : 'h',
			'duration' : 2
		}, {
			'activity-name' : 'f',
			'predecessor' : 'e',
			'duration' : 4
		}, {
			'activity-name' : 'ED',
			'predecessor' : 'f',
			'duration' : 0
		}, {
			'activity-name' : 'ED',
			'predecessor' : 'c',
			'duration' : 0
		}, {
			'activity-name' : 'ED',
			'predecessor' : 'j',
			'duration' : 0
		}]
	}