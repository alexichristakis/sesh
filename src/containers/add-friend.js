import { connect } from "react-redux";

import { sendFriendRequest } from "../redux/actions";

// import AddFriend from "../components/Profile/AddFriend";
import AddFriend from "../components/AddFriend";

const mapStateToProps = state => {
	return {
		...state
	};
};

const mapDispatchToProps = dispatch => {
	return {
		sendFriendRequest: uid => dispatch(sendFriendRequest(uid))
	};
};

const AddFriendContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddFriend);

export default AddFriendContainer;
