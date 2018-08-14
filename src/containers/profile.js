import { connect } from "react-redux";

import { leaveGroup } from "../redux/actions";

import Profile from "../components/Profile";

const mapStateToProps = state => {
	return {
		...state
		// user: state.user,
		// numGroups: groups.length,
		// groups: groups
	};
};

const mapDispatchToProps = dispatch => {
	return {
		leaveGroup: (group, user) => {
			dispatch(leaveGroup(group, user));
		}
	};
};

const ProfileContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);

export default ProfileContainer;
