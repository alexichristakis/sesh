import { connect } from "react-redux";

// import AddFriend from "../components/Profile/AddFriend";
import AddFriend from "../components/AddFriend";

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

const AddFriendContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddFriend);

export default AddFriendContainer;
