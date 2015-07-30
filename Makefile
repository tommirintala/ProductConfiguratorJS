JSFILES = $(wildcard lib/*.js) $(wildcard qunit/*.js)
JAVASCRIPT_OPTS = --verbose --show-non-errors

lint:
	jshint $(JAVASCRIPT_OPTS) $(JSFILES)

clean:
	find . -name \*~  -exec rm {} \;
