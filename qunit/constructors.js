QUnit.test("Dummy test - see that QUnit is working", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("create empty ProductConfiguratorJS object", function( assert ) {
    assert.expect( 3 );
    var engine = new ProductConfiguratorJS(null, {});
    assert.ok( engine !== null, "Created ProductConfiguratorJS Engine OK" );
    assert.equal( typeof engine, 'object', 'It is an object');
    assert.ok( engine.ok(), 'Check that engine is created ok' );
});

QUnit.test("create ProductConfiguratorJS object from model", function( assert ) {
    assert.expect( 3 );
    var engine = new ProductConfiguratorJS(null, testingModel());
    assert.ok( engine !== null, "Created ProductConfiguratorJS Engine OK" );
    assert.equal( typeof engine, 'object', 'It is an object');
    assert.ok( engine.ok(), 'Check that engine is created ok' );
});

QUnit.test("create ProductConfiguratorJS object from model with DIV location", function( assert ) {
    assert.expect( 3 );
    var engine = new ProductConfiguratorJS('testing-area', testingModel());
    assert.ok( engine !== null, "Created ProductConfiguratorJS Engine OK" );
    assert.equal( typeof engine, 'object', 'It is an object');
    assert.ok( engine.ok(), 'Check that engine is created ok' );
});

/*
QUnit.test("create model", function( assert ) {
    var model = new ProductConfiguratorJSModel();
    assert.ok( model !== null, "Created ProductConfiguratorJSModel OK");
});
*/

QUnit.test("create a ProductConfiguratorJSComponent object", function( assert ) {
    assert.expect( 3 );
    var component = new ProductConfiguratorJSComponent();
    assert.ok( component !== null, "Created ProductConfiguratorJSComponent OK");
    assert.ok( typeof component === 'object', "Object type");
    assert.ok( component.ok(), 'check that component is ok' );
});

/*
QUnit.test("Engine: load model", function( assert ) {
    var engine = new ProductConfiguratorJS();
    assert.ok( engine !== null, "Created ProductConfiguratorJS Engine OK" );
    var model = engine.createModel();
    assert.ok( model != null, "engine.createModel() success");
});
*/
