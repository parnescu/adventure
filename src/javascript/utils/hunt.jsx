import T from '../constants/creatures.jsx';
import FluxHelper from './flow.jsx';
import Actions from '../actions/index';

class HuntHelper{
	constructor(){
		this.age = [0,500];
		this.mana = [1000,10000];
		this.types = [T.PHOENIX, T.MEDUSA, T.HIPPOGRIFF, T.UNKNOWN];
	}

	getRandomFromInterval(max, min){
		return Math.floor(min + Math.random()*(max-min));
	}

	// flip a coin.. if heads you fail.. tails you get a new creature
	generateHunt(){
		setTimeout(()=>{
			if (Math.random() < .4){
				FluxHelper.callAction(Actions.HUNT_FAIL);
			}else{
				let creature = {
					type: this.types[this.getRandomFromInterval(4,0)],
					name: null,
					age: this.getRandomFromInterval(this.age[1],this.age[0]),
					mana: this.getRandomFromInterval(this.mana[1],this.mana[0]),
					capturedAt: +new Date
				}
				FluxHelper.callAction(Actions.HUNT_SUCCESS, creature);
			}
		}, Math.floor(this.getRandomFromInterval(4000,2500)));
	}
}

export default new HuntHelper();