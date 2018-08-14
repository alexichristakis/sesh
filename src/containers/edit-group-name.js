import { connect } from "react-redux";

import EditGroupName from "../components/Groups/EditName";

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

const EditGroupNameContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditGroupName);

export default EditGroupNameContainer;
