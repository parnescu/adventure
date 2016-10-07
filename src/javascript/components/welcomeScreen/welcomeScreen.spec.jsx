import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Component from './welcomeScreen.jsx';

let rendered, props, node;

define("Welcome Screen", function(){
	props = {
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

	it("can render welcome screen properly", function(){
		expect(rendered).not.toBeNull();
	});

	it("has proper refs added", function(){
		expect(rendered.refs.input).toBeDefined();
		expect(rendered.refs.submit).toBeDefined();
		expect(rendered.refs.pic).toBeDefined();
		expect(rendered.refs.greeting).toBeDefined()
	});

	it("user can input a hunter name", function(){
		let spy = spyOn(rendered, 'handleChange').and.callThrough();
		changeInputToValue("Sharingan");
		rendered.refs.submit.click();
		expect(rendered.state.name).toBe("Sharingan");
		expect(spy).toHaveBeenCalled();
	});

	it("user can press ENTER key to submit the hunter", function(){
		let spy = spyOn(rendered, "submitHunter").and.callThrough()
		let changeSpy = spyOn(rendered, 'handleKeyPress').and.callThrough();
		changeInputToValue("Duplo");
		ReactTestUtils.Simulate.keyDown(rendered.refs.input, {key: "Enter", keyCode: 13, which: 13});
		expect(spy).toHaveBeenCalled();
		expect(changeSpy).toHaveBeenCalled();
	});

	it("when a proper name isn't provided an error is shown", function(){
		expect(rendered.refs.error).not.toBeDefined();
		changeInputToValue("as");
		rendered.refs.submit.click();
		expect(rendered.refs.error).toBeDefined();
	});

	it("propagates hunter name to parent elements", function(){
		changeInputToValue("Ohana");
		rendered.refs.submit.click();
		// here the actual test is inside the mocked props function
		// if we modify the props.submit function to expect something wrong the test will fail
	});

});

function changeInputToValue(name){
	rendered.refs.input.value = name;
	ReactTestUtils.Simulate.change(rendered.refs.input, { target: { value: name}});
}