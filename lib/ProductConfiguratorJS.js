/*
function ProductConfiguratorJSComponent(containerid)
{
    // private data

    // var _container = null;


    
    var __construct = function() {
	this._containerid = containerid;
	console.log("ProductConfiguratorJSComponent::constructor( " + containerid + " )");
	// return this;
    }();

    / **
     * Internal test function of the class
     * @return true if everything is fine
     * /
    this.ok = function() {
	return true;
    };

    / **
     * Build a html form, which is then returned as jquery object
     * @return object JQuery object, which holds all the controls
     * /
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
*/

var ProductConfiguratorJS = function(element, modeldata){
    this._element = element || null;
    this._model = modeldata || { label: 'undefined'};
};

ProductConfiguratorJS.prototype.setElement = function(element) {
    if ( element !== null && element !== undefined ) {
	this._element = element;
	return true;
    }
    return false;
};

/**
   Basic model validation. If object has been created ok and the model check's out, good.
   @return boolean Wheather the object is OK
*/
ProductConfiguratorJS.prototype.ok = function() {
    return this._element !== null &&
	this._element !== undefined &&
	this._model !== null &&
	this._model !== undefined &&
	typeof this._model.label == "string";
};

/**
   Calculate the price for this set of selections, based on the rules of the model
   @return float The price
*/
ProductConfiguratorJS.prototype.calculatePrice = function(root) {
    var summa = 0;
    if ( root === undefined ||
	 root === null ) {
	root = this._model;
    }
    //console.log("calculate price()");
    for (var i=0;i<root.options.length;i++) {
	var p = root.options[i];
	//console.log("  [= " + JSON.stringify( p ));
	if ((p.enabled === true || p.enabled === 1)) {
	    //console.log( " - node enabled");
	    
	    if (p.price !== undefined && p.price !== null) {		
		summa = summa + p.price;
		//console.log("   += " + p.price);
	    } else {
		//console.log("   but price is undefined");
	    }
	    // check for child nodes
	    if ( typeof p.options !== 'undefined' ) {
		summa = summa + this.calculatePrice(p);
	    }	    
	} else {
	    //console.log( " - node disabled" );
	}
    }
    //console.log(" = total: " + summa);
    return summa;
};

ProductConfiguratorJS.prototype.ValueChangedEvent = function(handler, done) {
    return done();
};

ProductConfiguratorJS.prototype.findById = function(id, root) {
    if ( root === undefined || root === null ) {
	root = this._model;
    }
    for (var i=0;i<root.options.length;i++) {
	var p = root.options[i];
	if ( p.id == id ) {
	    return p;
	}
	if ( typeof p.options !== 'undefined' ) {
	    var q = this.findById(id, p);
	    if ( q !== null ) {
		return q;
	    }
	}
    }
    return null;
};

ProductConfiguratorJS.prototype.traverse = function(event, root) {
    console.log("  traverse( " + JSON.stringify(event) + ", " + root.id + " )" );
    if ( root === undefined || root === null ) {
	root = this._model;
    }
    for (var i=0;i<root.options.length;i++) {
	var q = root.options[i];
	if ( typeof q.options !== 'undefined' ) {
	    console.log("  -traverse subtree");
	    var result = this.traverse(event, q);
	    console.log("  =result: " + result);
	}
	
	switch(event) {
	case 'enable':
	    q.enabled = true;
	    break;
	case 'disable':
	    q.enabled = false;
	    break;
	    
	    // no default
	}
    }
    return true;
};

ProductConfiguratorJS.prototype.traverseChange = function(change) {
    console.log("traverseChange( " + JSON.stringify(change) + " )");
    //if ( root === undefined || root === null ) {
    //	root = this._model;
    //  }
    
    /** Check also that change object is valid */
    if ( ! this.isValidChange( change )) {
	return { msg: 'invalid change', status: false};
    }
    var elem = this.findById( change.id );
    console.log("Found element: " + JSON.stringify(elem));
    
    if ( elem !== null ) {
	if ( change.event === 'enabled' ) {
	    if ((change.oldValue === true || change.oldValue === 1) &&
		(change.newValue === false || change.newValue === 0)) {
		// disable child elements
		this.traverse('disable', elem);
	    } else {
		// disable
		this.traverse('enable', elem);
	    }
	} else {
	    switch (elem.type) {
	    case 'amount':
		// if we have more than one of this
	    case 'boolean':
		// we have or not
		break;
	    case 'list':
		// we select from a list of values
		break;
	    }
	}	
    }
    return { msg: 'OK', status: true };
};

ProductConfiguratorJS.prototype.isValidNode = function( node ) {
    if ( node === null || node === undefined ) {
	return {msg: 'NULL node', status: false};
    }
    if ( typeof node.label === undefined ) {
	return {msg: 'Label is undefined', status: false};
    }
    switch(node.type) {
    case 'boolean':
	break;
    case 'value':
	break;
    case 'list':
	if ( typeof node.values === undefined ) {
	    return {msg: 'Missing values from list', status: false};
	}
	break;

    default:
	// what to do?
    }
    return {status: true};
};

ProductConfiguratorJS.prototype.isValidChange = function( change ) {
    if ( typeof change !== 'object' ) {
	console.log("Change object is not object");
	return false;
    }
    if ( change.id === undefined &&
	 change.id === null ) {    
	console.log("Invalid or missing ID in change object; " + JSON.stringify(change));
    }
    if ( this.findById( change.id ) === null ) {
	console.log("ID of change object not found in model: " + change.id);
	return false;
	}
    if ( change.oldValue === undefined ||
	 change.oldValue === null) {
	console.log("Change object is missing oldValue: " + JSON.stringify(change));
	return false;
    }
    if ( change.newValue === undefined ||
	 change.newValue === null ) {
	console.log("Change object is missing newValue: " + JSON.stringify(change));
	return false;
    }
    
    return true;
};

ProductConfiguratorJS.prototype.isValidIdentifier = function(id) {
    for (var i=0;i<this._model.options.length;i++) {
	var p = this._model.options[i];
	if ( p.id == id ) {
	    return true;
	}
    }
    console.log("isValidIdentifer( " + id + " ): could not find from model");
    return false;
};

ProductConfiguratorJS.prototype.handleEvent = function(event, done) {
    if ( this.isValidIdentifier(event.id) ) {
	switch(event.e) {
	case 'ValueChanged':
	    
	    break;
	}
	return done;
    } else {
	return null;
    }
};

ProductConfiguratorJS.prototype.validateModel = function(root) {
    if ( root === undefined ||
	 root === null ) {
	root = this._model;
    }
    if ( root.options === undefined ||
	 root.options === null ) {
	return {msg: 'Invalid model, no data', status: false};
    }
    var flag = true;
    // traverse through model
    for (var i=0;i<root.options.length;i++) {
	var node = root.options[i];
	if ( typeof node.options !== 'undefined' ) {
	    // parse sub-tree
	    var s = this.validateModel(node);
	    if ( !s.status ) {
		flag = false;
	    }
	}
	
    }
    return {msg: 'Model validated', status: flag};
};

/**
 * Validate the model. Return the status
 * @return boolean wheather model is valid (true/false)
 */
/*
ProductConfiguratorJS.prototype.oldvalidateModel = function() {
    console.log("validateModel(): " + typeof this._model.label);
    if ( this._model.label ) {
	console.log(" - checking for: " + this._model.label );
    }
    this.parse();
    return false;
};
*/
/**
   Set the model data for the Configurator. This function does not do any validation, so you should run the {@validateModel()} -function afterwards.

   This function also clears all selections, but not SESSION cache!
*/
ProductConfiguratorJS.prototype.setModel = function(model) {
    this._model = model;
    this._selections = {};
};

ProductConfiguratorJS.prototype.clearSession = function() {
    // What should we do here?
};

ProductConfiguratorJS.prototype.travel = function(node, callback) {
    /*
    var id;
    if ( node === undefined || node === null || typeof node.id === 'undefined' ) {
	id = '[ROOT]';
    } else {
	id = node.id;
    }
    console.log("travel( "
		+ JSON.stringify( id )
		+ ", "
		+ JSON.stringify(callback)
		+ " )");
    */
    if ( typeof callback !== 'function' ) {
	console.log("  callback is not function: " + typeof callback);
    }
    if ( node !== undefined &&
	 node !== null ) {
	for (var i=0;i<node.options.length;i++) {
	    var q = node.options[i];
	    callback.call(this, q, callback);
	    if (typeof q.options !== 'undefined' && q.options !== undefined && q.options !== null ) {
		ProductConfiguratorJS.prototype.travel(q, callback);
	    }
	}
	return true;
    }
    // console.log("Got NULL node, skip");
    return false;
};

ProductConfiguratorJS.prototype.countNodes = function() {
    var _count = 0;
    this.travel(this._model, function(node) {
	/*
	if ( node !== undefined && node !== null ) {
	    console.log("    increment by one : " + node.id);
	} else {
	    console.log("    empty node increment by one");
	}
*/
	_count = _count + 1;
    });
    return _count;
};

ProductConfiguratorJS.prototype.appendElementHtml = function(node) {
    var template = "";
    var template_end = "";
    var row_begin = "<tr>";
    var row_end = "</tr>\n";
    
    if ( node === undefined || node === null ) {
	console.log("appendElementHtml() called with null node");
	return null;
    } else {
	switch(node.type) {
	case 'module':
	    console.log("NOT IMPLEMENTED INPUT TYPE: " + node.type);
	    break;
	case 'boolean':
	    template_end = "></td>";
	    template += '<td>' + node.label+ '</td><td><input type="checkbox" name="' + node.id
		+ '" id="' + node.id + '"';
	    break;
	case 'list':
	    template_end = "></select></td>";
	    template = '<td>' + node.label + '</td><td><select id="' + node.id;
	    break;
	case 'url':
	case 'tel':
	case 'email':
	case 'search':
	case 'number':
	case 'color':
	case 'range':
	case 'datetime':
	case 'datetime-local':
	case 'date':
	case 'time':
	case 'week':
	case 'month':
	case 'text':
	    var keywords = ["pattern","required","min","max","maxlength",
			    "step", "autocomplete", "autofocus", "placeholder"];
	    template = '<td>' + node.label + '</td><td>' +
		'<input type="' + node.type + '"';
	    for (var i=0;i<keywords.length;i++) {
		if ( node.hasOwnProperty(keywords[i]) ) {
		    template += ' ' + keywords[i] + '="' + node[keywords[i]] + '"';
		}
	    }
	    template_end = '></td>';
	    break;
	default:
	    console.log("MISSING input type: '" + node.type + "' for id#'" + node.id);
	}
	if ( node.enabled ) {
	template = template + ' enabled="true"';
	} else {
	    template = template + ' enabled="false"';
	}
	this._form = this._form + row_begin + template + template_end + row_end;
	return row_begin + template + template_end + row_end;
    }
};

ProductConfiguratorJS.prototype.getForm = function() {
    this._form = "<table>";
    this.travel(this._model, this.appendElementHtml);
    this._form = this._form + "</table>";
    return this._form; 
};

// ---------------------------------------



function oldProductConfiguratorJS(modeldata)
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
	// _containerid = containerid;

	// this._form = new ProductConfiguratorJSComponent( containerid );
	// console.log("ProductConfiguratorJS::constructor( " + JSON.stringify(containerid) + ", " + JSON.stringify(model));
	if ( modeldata === undefined || modeldata === null) {
	    this._model = {
		label: 'Undefined empty model',
		options: []
	    };
	} else {
	    this._model = modeldata;
	}
    }();

    
    /**
     * Internal test function of the class
     * @return true if everything is fine
     */
    this.ok = function() {
	console.log("Engine: _model == " + JSON.stringify(this._model));
	console.log("Engine: _form == " + JSON.stringify(this._form));
	//return this._model !== undefined &&
	//  this._form !== undefined;
	return true;
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
    /*
    this.getFormHandler = function()
    {
	return this._form;
    };
    */
    

    /**
       The main event, called from parser
    */
    this.AddNewElement = function(handler, done) {
	return done;
    };
    
    this.DeleteElement = function(event, done) {
	return done;
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


var ProductConfiguratorOrder = function() {
};


ProductConfiguratorOrder.prototype.save = function() {
};

/**
   Find the order data(frame) from the datastorage
   @return boolean Wheather the order was found
*/

ProductConfiguratorOrder.prototype.find = function(id) {
    return false;
};


// exports.ProductConfiguratorJS = ProductConfiguratorJS;
// exports.ProductConfiguratorOrder = ProductConfiguratorOrder;
