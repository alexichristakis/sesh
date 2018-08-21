import { connect } from "react-redux";

import GroupSettings from "../components/Groups/Settings";

import { leaveGroup, changeGroupName } from "../redux/actions";

const mapStateToProps = state => {
	return {
		...state
	};
};

const mapDispatchToProps = dispatch => {
	console.log(dispatch);
	return {
		leaveGroup: (group, user) => {
			dispatch(leaveGroup(group, user));
		},
		changeGroupName: (group_id, group_name) => {
			dispatch(changeGroupName(group_id, group_name));
		}
	};
};

const GroupSettingsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupSettings);

export default GroupSettingsContainer;
