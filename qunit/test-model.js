QUnit.test("Test model handling functions/events for ProductConfiguratorJS", function( assert ) {
    assert.expect(2);
    // parse model

    
    var engine = new ProductConfiguratorJS('testcombo', testingModel());
    assert.equal(typeof engine, 'object', "Check that we had an object");
    assert.ok( engine.ok(), "check that the object still exists" );
    assert.ok( engine.validateModel(), "validate the model" );
    
    // 
});
