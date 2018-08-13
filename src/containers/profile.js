import { connect } from "react-redux";

import Profile from "../components/Profile";

const mapStateToProps = state => {
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

const ProfileContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);

export default ProfileContainer;
