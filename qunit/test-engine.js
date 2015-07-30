QUnit.test( "Events fired from Engine", function( assert ) {
    var done = assert.async();
    assert.expect( 4 );
    var model = testingModel();
    // console.log("Using model: " + JSON.stringify(model));
    var engine = new ProductConfiguratorJS('formdiv', model);
    assert.equal( typeof engine, 'object' );

    assert.ok(engine.setModel(model), "Testing model setter");
    assert.deepEqual(model, engine.getModel(), "Comparing the model with model getter");

    console.log("Our engine = " + JSON.stringify( engine ));

    var form = engine.getFormHandler();

    console.log("Our form = " + JSON.stringify( form ));
    
    var data = engine.getFormHandler().getForm();
    assert.ok( form !== null, "Get a form object succeeded");
    console.log("Got form: " + JSON.stringify( form ));


    // var data = form.getForm();
    assert.ok( data !== null, "Got actual data");
	  
    // create new option
    assert.ok( form.addOption( {
	id: 'test1',
	value: 'ok'
    }), "Add a new option");
    
    
});


