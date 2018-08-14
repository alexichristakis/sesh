import { connect } from "react-redux";

import GroupSettings from "../components/Groups/Settings";

import { leaveGroup } from "../redux/actions";

const mapStateToProps = state => {
	return {
		...state
	};
};

const mapDispatchToProps = dispatch => {
	return {
		leaveGroup: (group, user) => {
			dispatch(leaveGroup(group, user));
		}
	};
};

const GroupSettingsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupSettings);

export default GroupSettingsContainer;
