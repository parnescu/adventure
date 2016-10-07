import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Component from './filtering.jsx';

let rendered, props, node;

define("Creature filtering", function(){
	props = {
		filterBy: function(){ expect(false).toBeFalsy()}
	}
	beforeEach(function(){
		node = document.createElement('div');
		document.body.appendChild(node);
		rendered = ReactDOM.render(<Component {...props} />, node);
	});

	afterEach(function(){
		document.body.removeChild(node);
		node = null;
	});

	it("can render the filters properly", function(){
		expect(rendered).not.toBeNull();
	});

	it("has default filters in place", function(){
		expect(rendered.refs.mana).toBeDefined();
		expect(rendered.refs.age).toBeDefined();
		expect(rendered.refs.capturedAt).toBeDefined();
	});		

	it("can render a filter", function(){
		let spy = spyOn(rendered, "renderFilter").and.callThrough();
		let filters = rendered.state.filters.map((item)=> { return item});
		filters.push({ label: "some filter", filterAttribute: "time"});
		rendered.setState({ filters: filters});

		expect(spy).toHaveBeenCalled();
	});	

	it("when selecting a filter UI updates and data propagates", function(){
		let spy = spyOn(rendered, "renderFilter").and.callThrough();
		rendered.refs.mana.click();
		expect(spy).toHaveBeenCalled();
		expect(rendered.refs.mana.classList).toContain("selected");
	});	
});