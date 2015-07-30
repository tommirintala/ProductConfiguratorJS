QUnit.test( "Test price calculation(s)", function( assert ) {
    var engine = new ProductConfiguratorJS(null, testingModel());
    var price = engine.calculatePrice();
    var assume = 11.07;
    assert.equal(price, assume, "We get real price: " + assume);
});
