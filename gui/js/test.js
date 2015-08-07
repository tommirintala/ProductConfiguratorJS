var testModel = {
    label: 'Testing model',
    options: [
	{
	    id: 'item-text',
	    type: 'text',
	    label: 'Testing text field'
	},
	{
	    id: 'item-select',
	    type: 'list',
	    label: 'Select value',
	    values: [
		1,2,3,4,5
	    ]
	},
	{
	    id: 'item-url',
	    type: 'url',
	    label: 'URL field',
	    required: 'true'
	},
	{
	    id: 'item-boolean',
	    type: 'boolean',
	    label: 'First yes/no'
	},
	{
	    id: 'item-email',
	    type: 'email',
	    label: 'Email address'
	}
    ]
};

jQuery(document).ready(function() {
    var engine = new ProductConfiguratorJS('#control-div', testModel);
    $("button").click(function() {
	console.log("Refresh the model");
	console.log("  validateModel: " + JSON.stringify(engine.validateModel()));
	// console.log("  inserting code: " + engine.getForm() );
	// $("#control-div").html( engine.getForm() );
	engine.createForm();
    });
});

