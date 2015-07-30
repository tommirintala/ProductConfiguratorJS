QUnit.test( "Test component events", function( assert ) {
    var done = assert.async();
    assert.expect( 2 );

    var engine = new ProductConfiguratorJS('div1', testingModel() );
    
    assert.ok ( 1, "should be fine" );

    
});
