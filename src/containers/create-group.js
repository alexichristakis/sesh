import { connect } from "react-redux";

import CreateGroup from "../components/Groups/CreateGroup";

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

const CreateGroupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateGroup);

export default CreateGroupContainer;
