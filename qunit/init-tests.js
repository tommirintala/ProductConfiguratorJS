testingModel = function() {
    return {
	label: 'testing object',
	options: [
	    {
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
	    }
	]
    };
};


QUnit.log(function( details ) {
    if ( details.result !== true ) {
	console.log("Log: ", details.result, details.message );
    }
});
