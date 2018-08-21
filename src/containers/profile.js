import { connect } from "react-redux";

import { leaveGroup, acceptFriend, deleteRequest } from "../redux/actions";

import Profile from "../components/Profile";

const mapStateToProps = state => {
	return {
		...state.friends,
		groups: state.groups,
		user: state.user
		// numGroups: groups.length,
		// groups: groups
	};
};

const mapDispatchToProps = dispatch => {
	return {
		leaveGroup: (group, user) => {
			dispatch(leaveGroup(group, user));
		},
		acceptFriend: uid => {
			dispatch(acceptFriend(uid));
		},
		deleteRequest: uid => {
			dispatch(deleteRequest(uid));
		}
	};
};

const ProfileContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);

export default ProfileContainer;
