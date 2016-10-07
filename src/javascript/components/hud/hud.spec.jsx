import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Component from './hud.jsx';

let rendered, props, node;

define("Heads-up Display (HUD)", function(){
	props = {
		stats: [
			{
				label: "Total Age",
				type: "age",
				value: 0
			},
			{
				label: "Total Mana",
				type: "mana",
				value: 0
			},
			{
				label: "Empty Cages",
				type: "cages",
				value: 10
			}
		]
	};
	
	beforeEach(function(){
		node = document.createElement('div');
		document.body.appendChild(node);
		rendered = ReactDOM.render(<Component {...props} />, node);
	});

	afterEach(function(){
		document.body.removeChild(node);
		node = null;
	});

	it("can render the hud properly", function(){
		expect(rendered).not.toBeNull();
	});

	it("has necessary elements rendered", function(){
		expect(rendered.refs.filters).toBeDefined();
		expect(rendered.refs.hunter).toBeDefined();
		expect(rendered.refs.stats).toBeDefined();
	});

	it("can render stats", function(){
		let spy = spyOn(rendered, "renderStat").and.callThrough();
		let stats = rendered.state.stats.map((item)=> { return item});
		stats.push({ label: "some label", type: "someType", value:"some value"});
		rendered.setState({ stats: stats});

		expect(spy).toHaveBeenCalled();
	});
	
	it("can act on selecting a filter", function(){
		let spy = spyOn(rendered, "selectFilter").and.callThrough();
		rendered.refs.filters.refs.age.click();
		expect(spy).toHaveBeenCalled();
	});
});