import { connect } from "react-redux";

import Focus from "../components/Focus";

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

const FocusContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Focus);

export default FocusContainer;
