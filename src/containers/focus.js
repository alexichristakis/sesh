import { connect } from "react-redux";

import Focus from "../components/Focus";

import { fetchGoingUsers, joinMove } from "../redux/actions";

const mapStateToProps = state => {
	const { user, moves, groups, app } = state;
	return {
		// ...state
		user,
		moves,
		groups,
		fetchingGoingUsers: app.fetchingGoingUsers
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchGoingUsers: id => dispatch(fetchGoingUsers(id)),
		joinMove: id => dispatch(joinMove(id))
	};
};

const FocusContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Focus);

export default FocusContainer;
