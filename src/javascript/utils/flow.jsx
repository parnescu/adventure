import store from '../stores/store.jsx';

class FluxHelper {
	constructor(){
		// this is a wrapper class to standardise the structure of the actions across the application
	}

	callAction(action, data){
		store.dispatch({ type: action, payload: data || {} });
	}
}

export default new FluxHelper();