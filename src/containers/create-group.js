import { connect } from "react-redux";

// import CreateGroup from "../components/Groups/CreateGroup";
import CreateGroup from "../components/CreateGroup";

import { createGroup } from "../redux/actions";

const mapStateToProps = state => {
	return {
		...state
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createGroup: (name, users) => dispatch(createGroup(name, users))
	};
};

const CreateGroupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateGroup);

export default CreateGroupContainer;
