import { connect } from "react-redux";

import Home from "../components/Home";

import { setMoves, setUser, setLocation, setGroups, setFriends } from "../redux/actions";

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
		setGroups: groups => {
			dispatch(setGroups(groups));
		},
		setFriends: friends => {
			dispatch(setFriends(friends));
		}
	};
};

const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomeContainer;
