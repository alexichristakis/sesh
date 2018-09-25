import { connect } from "react-redux";

import { addToGroup } from "../redux/actions";

import AddToGroup from "../components/AddToGroup";

const mapStateToProps = state => {
	return {
		friends: state.friends
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addToGroup: (user, group_id) => dispatch(addToGroup(user, group_id))
	};
};

const AddToGroupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddToGroup);

export default AddToGroupContainer;
