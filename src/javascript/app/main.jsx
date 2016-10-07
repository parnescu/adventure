import React from 'react';
import styles from '../../scss/main.scss';
import Welcome from '../components/welcomeScreen/welcomeScreen.jsx';
import Cage from '../components/creatureCage/creatureCage.jsx';
import Hud from '../components/hud/hud.jsx';
import Modal from '../components/modal/modal.jsx';
import Store from '../stores/store.jsx';
import Actions from '../actions/index';
import FluxHelper from '../utils/flow.jsx';

const defaultProps = {
	showModal: false,
	modal: {},
	stats: [],
	creatures: [],
	maxCreatures: 10,
	setCreatures: 0,
	isFiltered: false,
	isStarted: false,
	activeFilter: null,
	hunter: ""
};
const propTypes = {};

export default class App extends React.Component{
	constructor(props){
		super(props);

		this.props = props;
		this.state = props;
	}

	componentWillMount(){
		this.setState(Store.getState());
		this.unlisten = Store.subscribe(()=> {
			let _s = Store.getState();
			this.setState(_s);
		});
	}

	componentWillUnmount(){
		this.unlisten();
	}

	handleFiltering(filter){
		FluxHelper.callAction(Actions.SET_FILTERING, { filter: filter});
	}

	handleHunterSubmit(name){
		FluxHelper.callAction(Actions.SUBMIT_HUNTER, { name: name});
	}

	handleUpdateCreature(info){
		FluxHelper.callAction(Actions.UPDATE_CREATURE, info);
	}

	handleReleaseCreature(creatureData){
		FluxHelper.callAction(Actions.RELEASE_CREATURE, creatureData);
	}

	handleNewCreature(name){
		FluxHelper.callAction(Actions.SAVE_HUNT, { name: name });
	}

	handleModalClose(){
		FluxHelper.callAction(Actions.HUNT_FINISHED);
	}

	handleHuntInit(){
		FluxHelper.callAction(Actions.START_HUNTING);
	}

	generateCreature(data, i){
		return <Cage
			key={i}
			{...data}
			cageId={i+1}
			release={this.handleReleaseCreature}
			update={this.handleUpdateCreature}
		/>;
	}

	getFilteredItems(items, filter){
		return items
			.map((i)=>{ return i})
			.sort((a,b)=>{
				let o1 = a.occupier;
				let o2 = b.occupier;

				if (o1 && o2){
					return o1[filter] < o2[filter]
				}else{
					return false;
				}
			});
	}

	render(){
		let _s = this.state;
		let _creatures = _s.isFiltered ? this.getFilteredItems(_s.creatures, _s.activeFilter) : _s.creatures;
		return(
			<div className="appHolder">
				{!_s.isStarted ?
					<Welcome 
						submit={(e)=> this.handleHunterSubmit(e)}
						avatar={_s.hunterAvatar}
					/> :
					(<div className="separator">
						<Hud 
							hunter={_s.hunter}
							avatar={_s.hunterAvatar}
							stats={_s.stats}
							allowHunting={(_s.maxCreatures - _s.setCreatures) > 0}
							onStartHunt={()=>this.handleHuntInit()}
							onSelectFilter={(f)=>this.handleFiltering(f)}
						/>
						<ul className="creatures">
							{_creatures.map((d,i) => this.generateCreature(d,i))}
						</ul>
					</div>)
				}
				{_s.showModal && <Modal 
					onSave={(n) => this.handleNewCreature(n)}
					onClose={() => this.handleModalClose()}
					{..._s.modal}
				/>}
			</div>
		);
	}
}
App.defaultProps = defaultProps;
App.propTypes = propTypes;