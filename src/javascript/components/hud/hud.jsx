import React from 'react';
import styles from './_hud.scss';
import Filters from '../filtering/filtering.jsx';

const defaultProps = {
	avatar: null,
	hunter: "",
	allowHunting: true,
	stats: [],
	onStartHunt: function(){},
	onSelectFilter: function(){}
};
const propTypes = {
	hunter: React.PropTypes.string.isRequired
};

export default class Hud extends React.Component{
	constructor(props){
		super(props);
		this.props = props;
		this.state = props;
	}

	renderStat(data,i){
		return (<li key={i} ref={"stat_"+i+" "+data.type}>
			<span className="label">{data.label}</span>
			<span className="value">{data.value}</span>
		</li>);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	selectFilter(filter){
		this.props.onSelectFilter(filter);
	}

	goHunt(){
		this.props.onStartHunt();
	}
	render(){
		return(
			<div className="hud">
				<div className="hunter">
					<div className="picWrapper">
						{this.state.avatar && <img src={this.props.avatar} alt="the hunter" ref="pic"/>}
					</div>
					<p className="name" ref="hunter"><span className="race">Hunter</span>{this.props.hunter}</p>
				</div>
				<div className="wrapper">
					<ul className="stats" ref="stats">
						{this.state.stats.map((d,i) => this.renderStat(d,i))}
					</ul>
					<Filters ref="filters" filterBy={(f)=>this.selectFilter(f)}/>
					<button 
						ref="hunt"
						disabled={!this.state.allowHunting}
						className="btn cta goHunt"
						onClick={()=> this.goHunt()}
					>
						{this.state.allowHunting ? "Go on a hunt!" : "No empty cages, no hunting!"}
					</button>
				</div>
			</div>
		);
	}
}

Hud.defaultProps = defaultProps;