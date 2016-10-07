import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Component from './modal.jsx';

let rendered, props, node;

define("Modal window", function(){
	props = { 
		status: null,
		onClose: function(){ 
			expect(true).toBeTruthy();
		} 
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

	it("can render the modal properly", function(){
		expect(rendered).not.toBeNull();
	});

	it("can show a preloading message", function(){
		rendered.setState({ status: null, message: "something in here" });
		expect(rendered.refs.preloader).toBeDefined();
		expect(rendered.refs.preloadMessage).toBeDefined();
	});

	it("can show a failed hunt", function(){
		rendered.setState({ status: "bad" });
		expect(rendered.refs.preloader).not.toBeDefined();
		expect(rendered.refs.preloadMessage).not.toBeDefined();
		expect(rendered.refs.fail).toBeDefined();
	});

	it("can show a successful hunt", function(){
		rendered.setState({ status: "good" });
		expect(rendered.refs.preloader).not.toBeDefined();
		expect(rendered.refs.preloadMessage).not.toBeDefined();
		expect(rendered.refs.fail).not.toBeDefined();
		expect(rendered.refs.success).toBeDefined();
	});

	it("you can close the modal, if your hunt wasn't successful", function(){
		rendered.setState({ status: "bad" });
		expect(rendered.refs.close).toBeDefined();
		rendered.refs.close.click();
	});

	it("allows you to name and save your successful hunt", function(){
		rendered.setState({ status: "good" });
		expect(rendered.refs.name).toBeDefined();

		let spy = spyOn(rendered, 'houseNewCreature').and.callThrough()
		let changeSpy = spyOn(rendered, 'handleChange').and.callThrough();
		let enterSpy = spyOn(rendered, 'handleKeyPress').and.callThrough();
		let input = rendered.refs.name;
		input.value = "something";
		
		ReactTestUtils.Simulate.change(input, { target: { value: input.value}});
		ReactTestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
		
		expect(spy).toHaveBeenCalled();
		expect(changeSpy).toHaveBeenCalled();
		expect(enterSpy).toHaveBeenCalled();
	});	
});