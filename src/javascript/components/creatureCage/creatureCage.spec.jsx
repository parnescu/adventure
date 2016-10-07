import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Component from './creatureCage.jsx';

let rendered, props, node;

define("Creature Cage", function(){
	props = {
		cageId: 0,
		submit: function(){ expect(false).toBeFalsy(); }
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

	it("can render a cage properly", function(){
		expect(rendered).not.toBeNull();
	});

	it("can be an empty or occupied cage", function(){
		let spy = spyOn(rendered, 'generateOccupier').and.callThrough();
		expect(rendered.refs.wrapper.classList).toContain("empty");
		rendered.setState({ occupier: {} });

		expect(rendered.refs.wrapper.classList).toContain("full");
		expect(spy).toHaveBeenCalled();
	});

	it("can release the occupier once it's been filled", function(){
		let spy = spyOn(rendered, 'releaseOccupier').and.callThrough();
		rendered.setState({ occupier: {} });
		expect(rendered.refs.occupier).toBeDefined();
		expect(rendered.refs.release).toBeDefined();
		expect(rendered.state.isReleasing).toBeFalsy();

		rendered.refs.release.click();
		expect(spy).toHaveBeenCalled();
	});
});