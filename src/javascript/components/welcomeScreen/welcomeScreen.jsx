import React from 'react';
import styles from './_welcomeScreen.scss';
import Avatars from '../../constants/avatars.jsx';

const defaultProps = {
	name: "",
	avatar: Avatars.Hunter,
	isValid: null
}
export default class WelcomeScreen extends React.Component{
	constructor(props){
		super(props);

		this.props = props;
		this.state = props;
	}

	handleChange(e){
		this.setState({ name: e.target.value });
	}

	handleKeyPress(e){
		if (e.keyCode === 13){
			this.submitHunter();
		}
	}

	submitHunter(){
		let _v = this.state.name;
		if (_v != "" && _v.length > 2){
			this.setState({ isValid: true});
			this.props.submit(_v);
		}else{
			this.setState({ isValid: false});
		}
	}

	render(){
		return (
			<div className="welcome">
				<p ref="greeting" className="greeting">
					<span className="preText">A long long time ago the Earth was full of mythological creatures. Catching them gave unbelievable power to the <strong>hunters</strong>.</span><br/>And so our story begins...</p>
				<div className="avatar">
					<img ref="pic" src={this.props.avatar} title="Your hunter's avatar" />
				</div>
				<input 
					ref="input"
					type="text"
					value={this.state.name}
					onChange={(e) => this.handleChange(e)}
					onKeyDown={(e) => this.handleKeyPress(e)}
					placeholder="Do you have a name, hunter?"
				/>
				<button ref="submit" onClick={(e) => this.submitHunter(e)} className="btn">Start the adventure</button>
				{this.state.isValid === false && <p ref="error" className="error">Give us your name hunter, so we can start!</p>}
			</div>
		);
	}
}
WelcomeScreen.defaultProps = defaultProps;