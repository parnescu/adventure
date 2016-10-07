import { createStore } from 'redux';
import Actions from '../actions/index';
import Avatars from '../constants/avatars.jsx';
import Texts from '../constants/texts.jsx';
import FluxHelper from '../utils/flow.jsx';
import Hunt from '../utils/hunt.jsx';
import Stats from '../utils/stats.jsx';
import EmptyCage from '../constants/emptyCage.jsx';

let MAX_CREATURES = 2;
let SET_CREATURES = 0;

let store = createStore((state, action)=>{
	// console.log("STORE:: ",action.type);
	let payload = action.payload, _c, _s;
	let makeState = (overrides) => {
		return Object.assign({}, state, overrides);
	}

	switch(action.type){
		// when clicking the "go on a hunt" button, prepare the stage
		case Actions.START_HUNTING:
			setTimeout(()=> {
				FluxHelper.callAction(Actions.GENERATE_HUNT);
			},0);
			return makeState({
				showModal: true,
				modal: {
					status: null,
					message: Texts.START_THE_HUNT
				}
			});

		// when going on a hunt, generate what happens
		case Actions.GENERATE_HUNT:
			Hunt.generateHunt();
			return state;

		// when the hunt failed, notify the user
		case Actions.HUNT_FAIL:
			return makeState({
				modal: {
					status: "bad"
				}
			});

		// the hunt was a success... give a name to the creature
		case Actions.HUNT_SUCCESS:
			return makeState({
				_temp: payload,
				modal: {
					status: "good"
				}
			});

		// the creature was named, put it into a cage
		// if cage is available fill it, else add new cage
		case Actions.SAVE_HUNT:
			_c = state.creatures;
			
			let added = false;
			let _o = state._temp;
			_o.name = payload.name;
			
			_c = state.creatures.map((creature)=>{
				if (creature.occupier === null && !added){
					added = true;
					creature = Object.assign({}, EmptyCage);
					creature.occupier = _o;
				}
				return creature;
			});

			if(!added){
				_c.push(Object.assign({},EmptyCage,{ occupier: _o}));
			}

			_s = Stats.parseItems(_c, state.setCreatures+1, state.maxCreatures);

			return makeState({
				creatures: _c,
				setCreatures: state.setCreatures+1,
				stats: _s,
				temp: null
			});

		// the hunt is done, close the modal window
		case Actions.HUNT_FINISHED:
			return makeState({
				showModal: false
			});

		// a creature has it's details updated
		case Actions.UPDATE_CREATURE:
			_c = state.creatures.map((creature,i)=> {
				if (i === payload.cageId-1){
					creature = Object.assign({}, creature, payload);
				}
				return creature;
			});
			return makeState({ creatures: _c });

		// release one of your dear creatures
		case Actions.RELEASE_CREATURE:
			_c = state.creatures.map((creature,i)=> {
				if (i === payload.cageId-1){
					creature.occupier = null;
					creature.isReleasing = false;
					creature.countdown = null;
				}
				return creature;
			});

			_s = Stats.parseItems(_c, state.setCreatures-1, state.maxCreatures);

			return makeState({
				setCreatures: state.setCreatures-1,
				creatures: _c,
				stats: _s,
			});

		// after entering a hunter name, move on to the next screen
		case Actions.SUBMIT_HUNTER:
			return makeState({
				hunter: payload.name,
				isStarted: true
			});

		// when selecting a filter, must display data
		case Actions.SET_FILTERING:
			return makeState({
				isFiltered: payload.filter != null,
				activeFilter: payload.filter
			})

		default:
			return state;
	}
}, 
{	// INITIALISING STORE WITH THE DEFAULT APPLICATION STATE
	maxCreatures: MAX_CREATURES,
	setCreatures: SET_CREATURES,
	creatures: [
		// {
		// 	occupier: {
		// 		name: "Antharas",
		// 		capturedAt: +new Date,
		// 		type: "Phoenix",
		// 		age: 21,
		// 		mana: 1542
		// 	}
		// },
		// {
		// 	occupier: {
		// 		name: "Kuzuri",
		// 		capturedAt: +new Date,
		// 		type: "Creature",
		// 		age: 321,
		// 		mana: 3542,
		// 	}
		// }
	],
	showModal: false,
	isFiltered: false,
	isStarted: false,
	hunter: "",
	hunterAvatar: Avatars.Hunter,
	modal: {
		status: ""
	},
	stats: Stats.parseItems(null, SET_CREATURES, MAX_CREATURES),
	_temp: null
});

export default store;

