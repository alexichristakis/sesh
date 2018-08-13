import { connect } from "react-redux";

import Home from "../components/Home";

import { setMoves, setUser, setLocation } from "../redux/actions";

const mapStateToProps = state => {
	return {
		...state
		// todos: getVisibleTodos(state.todos, state.visibilityFilter)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// dispatch,
		setMoves: moves => {
			dispatch(setMoves(moves));
		},
		setUser: user => {
			dispatch(setUser(user));
		},
		setLocation: location => {
			dispatch(setLocation(location));
		}
		// onTodoClick: id => {
		// 	dispatch(toggleTodo(id));
		// }
	};
};

const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomeContainer;
