import { connect } from "react-redux";

import Focus from "../components/Focus";

import { fetchGoingUsers, joinMove, leaveMove, fetchGroupMembers } from "../redux/actions";

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
		/* moves */
		fetchGoingUsers: id => dispatch(fetchGoingUsers(id)),
		joinMove: id => dispatch(joinMove(id)),
		leaveMove: id => dispatch(leaveMove(id)),
		/* groups */
		fetchGroupMembers: id => dispatch(fetchGroupMembers(id))
	};
};

const FocusContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Focus);

export default FocusContainer;
