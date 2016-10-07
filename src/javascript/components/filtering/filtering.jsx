import React from 'react';
import styles from './_filtering.scss';

const defaultProps = {
	selectedFilter: null,
	filters: [
		{
			label: "Age",
			filterAttribute: "age"
		},
		{
			label: "Mana",
			filterAttribute: "mana"
		},
		{
			label: "Capture time",
			filterAttribute: "capturedAt"
		}
	],
	filterBy: function(){}
};

export default class Filtering extends React.Component{
	constructor(props){
		super(props);
		this.props = props;
		this.state = props;
	}
	selectFilter(e){
		e.preventDefault();

		let filter = e.target.dataset.ref;
		filter = this.state.selectedFilter === filter ? null : filter;
		this.setState({ selectedFilter: filter});
		this.props.filterBy(filter);
	}

	renderFilter(data,i){
		let _f = data.filterAttribute;
		return (<li key={i} className="wrapper">
			<a 
				className={"filter"+(this.state.selectedFilter === _f ? " selected": "")}
				ref={_f}
				onClick={(e)=>this.selectFilter(e)}
				title={"Filter by "+data.label}
				data-ref={_f}
				href="#"
			>
				{data.label}
			</a>
		</li>);
	}
	render(){
		return(
			<div className="filters">
				<p className="label">Sort creatures by:</p>
				<ul>
					{this.state.filters.map((d,i) => this.renderFilter(d,i))}
				</ul>
			</div>
		);
	}
}

Filtering.defaultProps = defaultProps;