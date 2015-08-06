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
		id: 0x10,
		comment: 'node 1',
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
		id: 0x20,
		enabled: true,
		comment: 'node 2',
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
		comment: 'node 3',
		id: 'module1',
		type: 'module',
		min: 0,
		max: 4,
		price: 7.07
	    },
	    {
		label: 'value field',
		enabled: true,
		comment: 'node 4',
		id: 0x30,
		type: 'text',
		minlength: 0,
		maxlength: 255
	    },
	    {
		label: 'parent',
		enabled: true,
		id: 0x40,
		type: 'range',
		comment: 'node 5',
		options: [
		    {
			label: 'child1 (email)',
			id: 0x401,
			type: 'email',
			enabled: true,
			type: 'boolean',
			comment: 'node 6',
			price: 1
		    },
		    {
			label: 'child2 (color)',
			id: 0x402,
			enabled: true,
			price: 1,
			type: 'color',
			comment: 'node 7',
			options: [
			    {
				label: 'subchild1 (url)',
				id: 0x4021,
				enabled: true,
				price: 1,
				type: 'url',
				comment: 'node 8'
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

