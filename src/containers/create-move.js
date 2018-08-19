import { connect } from "react-redux";

import CreateMove from "../components/CreateMove";

import { addMove } from "../redux/actions";

const mapStateToProps = state => {
	const { groups, friends, user } = state;
	return {
		user,
		groups,
		friends
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addMove: move => dispatch(addMove(move))
	};
};

const CreateMoveContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateMove);

export default CreateMoveContainer;
