import { connect } from "react-redux";

import CreateGroup from "../components/Groups/CreateGroup";

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

const CreateGroupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateGroup);

export default CreateGroupContainer;
