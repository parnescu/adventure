import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Component from './creatureDisplay.jsx';

let rendered, props, node;

define("Creature Display", function(){
	props = {
		type: "Creature",
		name: "Dumbkopf"
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

	it("can render creature display properly", function(){
		expect(rendered).not.toBeNull();
	});
});
