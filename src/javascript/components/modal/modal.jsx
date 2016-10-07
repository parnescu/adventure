import React from 'react';
import styles from './_modal.scss';
import Avatars from '../../constants/avatars.jsx';

//TODO: move every user-facing text in here to constants;
const defaultProps = {
	isActing: false,
	status: null,
	message: "",
	// failMessage: "",
	// successMessage: "",
	creatureName: null,
	preloader: Avatars.Cage,
	onSave: function(){},
	onClose: function(){}
};

export default class Modal extends React.Component{
	constructor(props){
		super(props);
		this.props = props;
		this.state = props;
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	houseNewCreature(){
		let _n = this.refs.name.value;
		if (_n != ""){
			this.props.onSave(_n);
			this.closeModal();
		}
	}

	handleChange(e){
		this.setState({ creatureName: e.target.value });
	}

	handleKeyPress(e){
		if (e.keyCode === 13){
			this.houseNewCreature();
		}
	}

	closeModal(){
		this.props.onClose();
	}
	render(){
		let _s = this.state.status;
		return(
			<div className={"modal"+(this.state.isActing ? " loading" : "")}>
				<div className={"wrapper "+_s}>
					{_s === null && (
						<div className="defaultMessage">
							<div ref="preloader" className="preloader">
								<img src={this.props.preloader} alt="preloader" ref="preloader"/>
							</div>
							<p ref="preloadMessage" className="preloadMessage">{this.state.message}</p>
						</div>	
					)}

					{ _s === "bad" && (<div className="outcome fail" ref="fail">
						<p className="description">The hunting Gods were not smiling upon you when you set out... Better luck next time hunter!</p>
						<p className="message">Your pray seems to be mocking you while it escapes into the dense forrest</p>
						<button ref="close" onClick={()=>this.closeModal()}>Go back to the village</button>
					</div>
					)}

					{ _s === "good" && (<div className="outcome success" ref="success">
						<p className="description">Your hunting prowess has earned you a new trophy...</p>
						<input
							type="text" 
							ref="name"
							placeholder="What name shall you give it?"
							onChange={(e) =>this.handleChange(e)}
							onKeyDown={(e) => this.handleKeyPress(e)}
						/>
						<button disabled={this.state.creatureName ===""} ref="save" onClick={() => this.houseNewCreature()}>Save this creature</button> 
					</div>
					)}
				</div>
			</div>
		);
	}
}

Modal.defaultProps = defaultProps;