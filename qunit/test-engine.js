QUnit.test( "Events fired from Engine", function( assert ) {
    var done = assert.async();
    assert.expect( 5 );
    var engine = new ProductConfiguratorJS('formdiv', {});
    assert.equal( typeof engine, 'object' );
    var form = engine.getFormHandle();
    assert.ok( form !== null, "Get a form object succeeded");
    
    var data = form.getForm();
    assert.ok( data !== null, "Got actual data");

    // create new option
    assert.ok( form.addOption( {
	id: 'test1',
	value: 'ok'
    }), "Add a new option");
});

QUnit.test( "Test component events", function( assert ) {
    var done = assert.async();
    assert.expect( 2 );

    assert.ok ( 1, "should be fine" );


});
