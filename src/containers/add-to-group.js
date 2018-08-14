import { connect } from "react-redux";

import AddToGroup from "../components/Groups/AddToGroup";

const mapStateToProps = state => {
	return {
		...state
	};
};

const mapDispatchToProps = dispatch => {
	return {
		dispatch
	};
};

const AddToGroupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddToGroup);

export default AddToGroupContainer;
