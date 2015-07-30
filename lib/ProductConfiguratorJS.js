function ProductConfiguratorJSComponent(containerid)
{
    // private data

    // var _container = null;


    
    var __construct = function() {
	this._containerid = containerid;
	console.log("ProductConfiguratorJSComponent::constructor( " + containerid + " )");
	// return this;
    }();

    /**
     * Internal test function of the class
     * @return true if everything is fine
     */
    this.ok = function() {
	return true;
    };

    /**
     * Build a html form, which is then returned as jquery object
     * @return object JQuery object, which holds all the controls
     */
    this._build = function() {
	this._body = $("form");
	this._body.attr('id', this._containerid);
	console.log( "return body: " + this._body );
	return this._body;
    };

    this.getForm = function() {
	if ( this._body === undefined ) {
	    this._build();
	}
	return this._body;
    };
    
    this.update = function() {
    };

    this.addOption = function(option, position) {
	if ( position === null ) {
	    position = 'last';
	}
	var opt = $("input").attr('id', option.id)
	    .attr('value', option.value);
	

	this._body.append(
	    $("input")
	);
	return true;
    };
    
    this.delOption = function(option) {
	$( option.id ).remove();
	return true;
    };
}

function ProductConfiguratorJS(containerid, model)
{

    // private properties
    /*
    this._engine = null;
    this._form = null;
    this._model = null;
    this._selections = {};
    
    this._containerid = containerid;
    this._model = model;
    */
    

    
    /**
     * The actual constructor. This code is run once for each object, after the new() call
     */
    var __construct = function() {
	this._engine = null;
	this._selections = {};
	this._containerid = containerid;

	console.log("ProductConfiguratorJS::constructor( " + JSON.stringify(containerid) + ", " + JSON.stringify(model));
	if ( model === undefined || model === null) {
	    this._model = {};
	    console.log('Debug: ProductConfiguratorJS initialized with empty model');
	} else {
	    this._model = model;
	    console.log('Initialize with a model');
	}
	console.log("After init form = " + JSON.stringify( this._form ));
	this._form = new ProductConfiguratorJSComponent( containerid );
    }();

    this.calculatePrice = function() {
	var summa = 0;
	console.log("calculate price()");
	for (var i=0;i<this._model.options.length;i++) {
	    var p = this._model.options[i];
	    console.log("  [= " + JSON.stringify( p ));
	    if ( p.enabled === true ) {
		console.log( " - enabled" );
		summa = summa + p.price;
	    } else {
		console.log( " - node disabled" );
	    }
	}
	console.log(" = total: " + summa);
	return summa;
    };
    
    /**
     * Internal test function of the class
     * @return true if everything is fine
     */
    this.ok = function() {
	
	return this._model !== undefined &&
	    this._form !== undefined;
    };

    
    /**
     * Set the Product model
     * @param model The product model (JSON object)
     */
    this.setModel = function(model)
    {
	if ( typeof model != 'object' ) {
	    return false;
	}
	this._model = model;
	return true;
    };
    
    /**
     * Get the internal model object from configurator
     * @return Object the Configurator Model object
     */
    this.getModel = function()
    {
	return this._model;
    };

    /**
     * Get a handle to engine itself (?)
     * @return Object the engine handle
     */
    this.getEngine = function()
    {
	return this._engine;
    };

    /**
     * Get the handle for the form object
     * @return function handler
     */
    this.getFormHandler = function()
    {
	return this._form;
    };
    
    /**
     * Validate the model. Return the status
     * @return boolean wheather model is valid (true/false)
     */
    this.validateModel = function() {
	console.log("validateModel()");
	if ( this._model.label ) {
	    console.log(" - checking for: " + this._model.label );
	}
	return false;
    };
}


/*
function ProductConfiguratorJSModel()
{
}

ProductConfiguratorJSModel.prototype.loadModel = function(resource)
{
    return false;
};
*/
