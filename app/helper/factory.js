
class APIFactory {
	static mergeActionsAndCommands (actions, commands) {
		if (!Array.isArray(actions)) console.log(Error('API Factory Error: Actions ' + actions.dispatch + ' is not of type array'))
		if (!actions) console.log(Error('API Factory Error: Actions are not defined'));
		if (!commands) console.log(Error('API Factory Error: Commands are not defined'));
		return actions.map((act) => {

			if (['get', 'put', 'post', 'delete'].indexOf(act.method) === -1) {
				console.log(Error('API Factory Error: Action method is not defined'));
			}

			if (!act.route) console.log(Error('API Factory Error: Action route is not defined'));
			if (!commands[act.dispatch]) console.log(Error('API Factory Error: Action dispatch is not found for ' + act.dispatch))
			if (!commands[act.dispatch]) console.log(Error('API Factory Error: Action command is not found'))
			act.dispatch = commands[act.dispatch];
			return act;
		});
	}

	static initialize(app, apis) {
		apis.forEach((api) => {
			app[api.method](api.route, api.dispatch);
		});		
	}
}
module.exports = APIFactory;