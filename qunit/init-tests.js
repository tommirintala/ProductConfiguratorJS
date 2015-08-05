brokenModels = {
    'Empty model, only with label': function() {
	return {
	    label: 'broken model 1'
	};
    },
    'Model with root node that has only ID': function() {
	return {
	    label: 'broken model 2',
	    options: [
		{
		    label: 'root node without ID'
		}
	    ]
	};
    }
};

testingModel = function() {
    return {
	label: 'testing object',
	options: [
	    {
		id: 0x100,
		enabled: true,
		label: 'Number list',
		type: 'list',
		values: {
		    0: 'None',
		    1: 'One',
		    2: 'Two'
		},
		rules: {
		},
		price: 3.00
	    },
	    {
		id: 0x101,
		enabled: true,
		label: 'Boolean option',
		type: 'boolean',
		name: 'opt_boolean',
		price: 1.00,
		rules: {
		    true: {
			enable: 'module1',
		    },
		    false: {
			disable: 'module1',
		    }
		}	    		
	    },
	    {
		label: 'module',
		enabled: true,
		id: 'module1',
		type: 'module',
		min: 0,
		max: 4,
		price: 7.07
	    },
	    {
		label: 'value field',
		enabled: true,
		id: 0x300,
		type: 'value',
		minlength: 0,
		maxlength: 255
	    },
	    {
		label: 'parent',
		enabled: true,
		id: 0x200,
		options: [
		    {
			label: 'child1',
			id: 0x201,
			enabled: true,
			type: 'boolean',
			price: 1
		    },
		    {
			label: 'child2',
			id: 0x202,
			enabled: true,
			price: 1,
			options: [
			    {
				label: 'subchild1',
				id: 0x2021,
				enabled: true,
				price: 1
			    }
			]
		    }
		]
	    }
	]
    };
};


QUnit.log(function( details ) {
    if ( details.result !== true ) {
	console.log("Log: ", details.result, details.message );
    }
});

