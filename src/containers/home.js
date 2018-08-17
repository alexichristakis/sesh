import { connect } from "react-redux";

import Home from "../components/Home";

import {
	attachListeners,
	setMoves,
	setUser,
	setLocation,
	setGroups,
	setFriends
} from "../redux/actions";

const mapStateToProps = state => {
	return {
		...state
		// todos: getVisibleTodos(state.todos, state.visibilityFilter)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setMoves: moves => {
			dispatch(setMoves(moves));
		},
		setUser: user => {
			dispatch(setUser(user));
		},
		setLocation: location => {
			dispatch(setLocation(location));
		},
		// setGroups: groups => {
		// 	dispatch(setGroups(groups));
		// },
		// setFriends: friends => {
		// 	dispatch(setFriends(friends));
		// },
		attachListeners: () => {
			dispatch(attachListeners());
		}
	};
};

const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomeContainer;
