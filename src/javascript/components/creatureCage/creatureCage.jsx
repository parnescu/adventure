import React from 'react';
import styles from './_creatureCage.scss';
import CreatureDisplay from '../creatureDisplay/creatureDisplay.jsx';
import Avatars from '../../constants/avatars.jsx';

const defaultProps = {
	occupier: null,
	isReleasing: false,
	releaseTime: 5, 
	countdown: null,
	cageId: NaN,
	cageAvatar: Avatars.Cage,
	release: function(){},
	update: function(){}
}
export default class CreatureCage extends React.Component{
	constructor(props){
		super(props);

		this.props = props;
		this.state = props;
		this.timer = null;
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	releaseOccupier(){
		if (this.state.isReleasing){
			return;
		}

		let passedSeconds = 0,
			release = this.props.releaseTime,
			updateInfo = {
				isReleasing: true,
				countdown: this.state.releaseTime,
				cageId: this.props.cageId
			};

		this.props.update(updateInfo);
		
		this.timer = setInterval(()=> {
			passedSeconds++;
			if(passedSeconds >= release){
				clearInterval(this.timer);
				this.props.release(this.state);
			}else{
				updateInfo = {
					countdown: release-passedSeconds,
					cageId: this.state.cageId
				}
				this.props.update(updateInfo);
			}
		}, 1000);
	}

	generateOccupier(){
		return (
			<div className={"occupier"+(this.state.isReleasing ? " releasing" : "")} ref="occupier">
				<div className="wrapper">
					<CreatureDisplay {...this.state.occupier} />
				</div>
				<button 
					className="release btn"
					ref="release"
					onClick={() => this.releaseOccupier()}
				>
					Release
				</button>
			</div>
		);
	}

	render(){
		let _c = this.state.occupier;
		return(
			<li ref="wrapper" className={"cage "+(this.state.occupier ? "full" : "empty")}>
				{_c && this.generateOccupier(_c)}
				{this.state.isReleasing && 
					<p className="timerMessage">
						Releasing {_c.type} in...
						<span className="timer" ref="timer">{this.state.countdown}</span>
					</p>
				}
				{this.state.occupier === null && <img src={this.props.cageAvatar} alt="cage" ref="bkg"/>}
			</li>
		);
	}
}

CreatureCage.defaultProps = defaultProps;