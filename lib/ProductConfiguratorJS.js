function ProductConfiguratorJSComponent()
{
    // private data

    var _container = null;
    
    var __construct = function(containerid) {
	this._container = containerid;
	return this;
    }();

    /**
     * Internal test function of the class
     * @return true if everything is fine
     */
    this.ok = function() { return true; }

    /**
     * Build a html form, which is then returned as jquery object
     * @return object JQuery object, which holds all the controls
     */
    this.getForm = function() {
	var body = $("form");
	body.attr('id', this._container);
	console.log( "return body: " + body );
	return body;
    }
    
    this.update = function() {
    }

    this.addOption = function(option, position) {
	if ( position === null ) {
	    position = 'last';
	}
	var opt = $("input").attr('id', option.id)
	    .attr('value', option.value);
	

	this._container.append(
	    $("input")
	);
	return true;
    }
    this.delOption = function(option) {
	$( option.id ).remove();
	return true;
    }
}

function ProductConfiguratorJS()
{
    // private properties
    var _engine = null;
    var _form = null;
    var _model = null;   
    
    var __construct = function(containerid, model) {
	if ( model === null ) {
	    this._model = {};
	} else {
	    this._model = model;
	}
	this._form = new ProductConfiguratorJSComponent( containerid );
    }();

    /**
     * Internal test function of the class
     * @return true if everything is fine
     */
    this.ok = function() { return true; }
    
    this.setModel = function(model)
    {
	if ( typeof model != 'ProductConfiguratorJSModel' ) {
	    return false;
	}
	this._model = model;
	return true;
    }

    this.getEngine = function()
    {
	return this._engine;
    }

    this.getFormHandle = function()
    {
	return this._form;
    }
    // singular
}



function ProductConfiguratorJSModel()
{
}

ProductConfiguratorJSModel.prototype.loadModel = function(resource)
{
    return false;
}
