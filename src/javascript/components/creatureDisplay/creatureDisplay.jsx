import React from 'react';
import styles from './_creatureDisplay.scss';
import CreatureType from '../../constants/creatures.jsx';
import Avatars from '../../constants/avatars.jsx';
import moment from 'moment';

const defaultProps = {
	type: CreatureType.UNKNOWN,
	name: "default name",
	age: null,
	mana: null,
	capturedAt: null
}

const propTypes = {
	name: React.PropTypes.string.isRequired
}
export default class CreatureDisplay extends React.Component{
	constructor(props){
		super(props);
		this.props = props;
		this.state = props;
	}

	render(){
		let _p = this.props;
		return(
			<div className={"creature "+_p.type.toLowerCase()}>
				<div className="wrapper">
					<img src={Avatars.Creatures[_p.type]} alt="creature avatar" ref="pic"/>
					<p className="stat capture">Captured on <strong>{moment(_p.capturedAt).format("dddd HH:mm")}</strong></p>
				</div>
				<p className="info">
					<span className="race">{Avatars.Description[_p.type]+" "+_p.type}</span>
					<span className="name">{_p.name}</span>
				</p>
				{_p.age && <p className="stat age">Age: <strong>{_p.age}</strong></p>}
				{_p.mana && <p className="stat mana">Mana: <strong>{_p.mana}</strong></p>}
			</div>
		);
	}
}

CreatureDisplay.defaultProps = defaultProps;
CreatureDisplay.propTypes = propTypes;