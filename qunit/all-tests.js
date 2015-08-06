function isEven(val) {
    return val % 2 === 0;
}

QUnit.module("QUnit Framework");
QUnit.test("Dummy test - see that QUnit is working", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
    assert.ok(isEven(0), 'zero is even number?');
});

QUnit.module("Class constructors");
QUnit.test("create empty ProductConfiguratorJS object", function( assert ) {
    assert.expect( 3 );
    var engine = new ProductConfiguratorJS(null, {});
    assert.ok( engine !== null, "Created ProductConfiguratorJS Engine OK" );
    assert.equal( typeof engine, 'object', 'It is an object');
    assert.ok( !engine.ok(), 'If element is NULL or model is undefined -> failure' );
});

QUnit.test("create ProductConfiguratorJS object from model", function( assert ) {
    assert.expect( 4 );
    var engine = new ProductConfiguratorJS(null, testingModel());
    assert.ok( engine !== null, "Created ProductConfiguratorJS Engine OK" );
    assert.equal( typeof engine, 'object', 'It is an object');
    assert.ok( !engine.ok(), 'Check that engine is created ok - it is not' );
    engine.setElement( 'non-null-element' );
    assert.ok( engine.ok(), 'Check that engine is created ok - it should now' );
});

QUnit.test('Create ProductConfiguratorJS object without model, but with location', function(assert) {
    var engine = new ProductConfiguratorJS('testing-area', null);
    console.log(JSON.stringify(engine));
    assert.ok(engine.ok(), 'This should succeed - remember the failsafe');
});

QUnit.test("create ProductConfiguratorJS object from model with DIV location", function( assert ) {
    assert.expect( 3 );
    var engine = new ProductConfiguratorJS('testing-area', testingModel());
    assert.ok( engine !== null, "Created ProductConfiguratorJS Engine OK" );
    assert.equal( typeof engine, 'object', 'It is an object');
    assert.ok( engine.ok(), 'Check that created engine is ok' );
});


/**

QUnit.module("Class constructors for ProductConfiguratorJSComponent");
QUnit.test("create a ProductConfiguratorJSComponent object", function( assert ) {
    assert.expect( 3 );
    var component = new ProductConfiguratorJSComponent();
    assert.ok( component !== null, "Created ProductConfiguratorJSComponent OK");
    assert.ok( typeof component === 'object', "Object type");
    assert.ok( component.ok(), 'check that component is ok' );
});
*/
/*
QUnit.test("Engine: load model", function( assert ) {
    var engine = new ProductConfiguratorJS();
    assert.ok( engine !== null, "Created ProductConfiguratorJS Engine OK" );
    var model = engine.createModel();
    assert.ok( model != null, "engine.createModel() success");
});
*/

QUnit.module('Helper functions');
QUnit.test('ProductConfiguratorJS helper functions', function( assert ) {
    var engine = new ProductConfiguratorJS('test-div', testingModel());
    var parent = engine.findById(0x40);
    assert.equal(parent.label, 'parent', 'findById() Find parent element starting from root');
    var child = engine.findById(0x402, parent);
    assert.equal(child.label, 'child2', 'findById() find child by starting from parent');

    
});
QUnit.test("testing isValidChange() - function", function(assert) {
    var engine = new ProductConfiguratorJS('test-div', testingModel());
    var broken = {};
    assert.ok (!engine.isValidChange(broken), "Checking failure of empty change object");
    // ------------
    broken.id = 0x40; // set id
    assert.ok (!engine.isValidChange(broken), "Checking failure of broken change object (1)");
    // ------------
    broken.newValue = "valid string";    
    assert.ok (!engine.isValidChange(broken), "Checking failure of broken change object (2)");
    // ------------
    broken.oldValue = "valid string 2";
    assert.ok (engine.isValidChange(broken), "Fixed the change object");
    
    var change = {
	id: 0x40,
	oldValue: false,
	newValue: true
    };
    assert.ok( engine.isValidChange( change ), "Checking that we have a valid change object");
});

QUnit.test("countNodes() -function", function(assert) {
    var engine = new ProductConfiguratorJS('test-div', testingModel());
    assert.ok(engine.ok());
    assert.equal(typeof engine.countNodes, 'function', 'check that countNodes() -function exists');

    assert.equal(engine.countNodes(), 8, 'calculate the nodes in the model');
});

QUnit.test("travel() -function", function(assert) {
    var engine = new ProductConfiguratorJS('test-div', testingModel());
    assert.ok(engine.ok);
    
    assert.expect(engine.countNodes());
    
    engine.travel( this._model, function() { ok(true, "ok"); });
    
    //engine.travel(this._model, function(data) {
    //console.log(" called with: " + JSON.stringify(data));
    //});
    
});

QUnit.module('ProductConfiguratorJS Events');
QUnit.test( "Change something, and test for the events", function( assert ) {
    // load the normal testing model
    var engine = new ProductConfiguratorJS('test-div', testingModel());
    var result = engine.validateModel();
    assert.ok(result.status, 'Validate the testing datamodel');
    
    assert.equal(typeof engine.ValueChangedEvent, 'function', 'Check that event handler for ValueChanged exists');
    var done = assert.async();
    assert.expect(1);

    var event = {
	id: 0x40,
	event: 'enabled',
	oldValue: true,
	newValue: false
    };
    
    // engine.registerEventHandler('ValueChanged', done);
    result = engine.traverseChange(event);
    assert.equal(result.status, true, "Traversing should succeed");
    var pr = engine.calculatePrice();
    assert.equal(pr, 11.07, "When disabling all elements, price is zero");
    
    event.oldValue = false;
    event.newValue = true;
    result = engine.traverseChange(event);
    assert.equal(result.status, true, "Traversing should succeed");
    pr = engine.calculatePrice();
    assert.equal(pr, 14.07, "When enabling all elements, price is not zero");
    
    /*
      var done = assert.async();
      assert.expect( 6 );
      var model = testingModel();
      assert.equal(typeof model, 'object', 'Check that our test model is valid model');
      var engine = new ProductConfiguratorJS(model);
    assert.equal( typeof engine, 'object', 'We got proper ProductConfiguratorJS object' );
    // assert.equal( engine._containerid, 'formdiv', 'The Configurator has right cotainerid');
    
    assert.ok(engine.setModel(model), "Testing model setter");
    assert.equal( typeof engine.getModel, "function", "check that we have getModel() -function");
    assert.deepEqual(model, engine.getModel(), "Comparing the model with model getter");

    assert.equal(typeof engine.AddNewElement, 'function', 'Check AddNewElement -function existance');
    assert.equal(typeof engine.DeleteElement, 'function', 'Check AddNewElement -function existance');
    assert.equal(typeof engine.ElementChanged, 'function', 'Check ElementChanged -function existance');
    */
});



QUnit.module('ProductConfiguratorJSComponent');
QUnit.test( "Test component events", function( assert ) {
    var done = assert.async();
    assert.expect( 2 );

    var engine = new ProductConfiguratorJS('div1', testingModel() );
    
    assert.ok ( 1, "should be fine" );

    
});

QUnit.module('Pricing');
QUnit.test( "Test price calculation(s)", function( assert ) {    
    var engine = new ProductConfiguratorJS('basediv', testingModel());
    assert.equal(typeof engine.calculatePrice, 'function', 'Check that the function exists');
    var price = engine.calculatePrice();
    var assume = 14.07;
    assert.equal(price, assume, "We get real price: " + assume);
});

QUnit.module("Model");
QUnit.test("Test model validation", function( assert ) {
    assert.expect(5);
    // parse model

    
    var engine = new ProductConfiguratorJS('testcombo', testingModel());
    assert.equal(typeof engine, 'object', "Check that we had an object");
    assert.ok( engine.ok(), "check that the object still exists" );
    assert.ok( engine.validateModel(), "validate the model" );

    for (var m in brokenModels) {
	engine.setModel( m );
	console.log('Validating model: ' + m.label);
	var s = engine.validateModel();
	assert.ok( ! s.status, "Should fail for broken model: " + m.label);
    }
    // 
});


QUnit.module("Order");
QUnit.test("Order object constructor test", function(assert) {
    var order = new ProductConfiguratorOrder();
    assert.equal(typeof order, 'object', "Check that creation creates a object");
});

QUnit.module("HTML");
QUnit.test("Test the form output", function(assert) {
    var engine = new ProductConfiguratorJS('testdiv', testingModel());
    assert.ok( engine.ok(), "testing ok");
    assert.ok( engine.validateModel(), 'check that model is ok');


    var output = engine.getForm();
    assert.equal(output, "html", "test form output");
});
