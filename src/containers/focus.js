import { connect } from "react-redux";

import Focus from "../components/Focus";

const mapStateToProps = state => {
	console.log("focus state: ", state);
	return {
		...state
		// todos: getVisibleTodos(state.todos, state.visibilityFilter)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		dispatch
		// onTodoClick: id => {
		// 	dispatch(toggleTodo(id));
		// }
	};
};

const FocusContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Focus);

export default FocusContainer;
