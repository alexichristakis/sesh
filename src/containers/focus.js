import { connect } from "react-redux";

import Focus from "../components/Focus";

import { fetchGoingUsers, joinMove, leaveMove } from "../redux/actions";

const mapStateToProps = state => {
	const { user, moves, groups } = state;

	// const goingUsers = moves.find(move => move.id === cardData.id).going;

	return {
		// ...state
		user,
		moves,
		groups
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchGoingUsers: id => dispatch(fetchGoingUsers(id)),
		joinMove: id => dispatch(joinMove(id)),
		leaveMove: id => dispatch(leaveMove(id))
	};
};

const FocusContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Focus);

export default FocusContainer;
