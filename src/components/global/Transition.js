import React, { Component } from "react";
import {
	Animated,
	Easing,
	LayoutAnimation,
	Dimensions,
	StyleSheet,
	View,
	Image,
	Text
} from "react-native";
import PropTypes from "prop-types";

import { Navigation } from "react-native-navigation";

import { Colors, shadow } from "../../lib/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Transition extends Component {
	constructor(props) {
		super(props);

		this.openProgress = new Animated.Value(0);

		this.state = {
			open: false,
			sourceDimension: {
				height: 0,
				width: 0,
				pageX: 0,
				pageY: 0
			}
		};
	}

	componentWillReceiveProps(nextProps) {
		const { from, data, MoveComponent } = nextProps;

		if (MoveComponent) {
			this.setState({ open: true });
			this.setState({
				sourceDimension: {
					height: from.height,
					width: from.width,
					x: from.x,
					y: from.y,
					pageX: from.pageX,
					pageY: from.pageY
				}
			});
			this.openCard();
		}
	}

	openCard = () => {
		console.log(this.props.data);
		this.props.clearScreen();
		Animated.timing(this.openProgress, {
			toValue: 1,
			duration: 200,
			easing: Easing.poly(0.25),
			useNativeDriver: true
		}).start(() => {
			this.props.onPressPushTo(
				this.props.destinationPage,
				{
					cardHeight: this.state.sourceDimension.height,
					move: this.props.data,
					closeCard: this.closeCard,
					statusBarHeight: this.props.statusBarHeight
				},
				{
					customTransition: { animations: [], duration: 0 }
				}
			);
		});
	};

	closeCard = () => {
		this.props.returnScreen();

		Animated.timing(this.openProgress, {
			toValue: 0,
			duration: 200,
			easing: Easing.poly(0.25),
			useNativeDriver: true
		}).start(() => {
			this.props.onReturn();
			this.props.transitionFinished();
			this.setState({ open: false });
		});
	};

	render() {
		const { height, width, x, y, pageX, pageY } = this.state.sourceDimension;

		if (this.state.open) {
			let backgroundStyle = {
				position: "absolute",
				backgroundColor: "white",
				borderRadius: 15,
				left: x,
				right: x,
				padding: 10,
				transform: [
					{
						translateY: this.openProgress.interpolate({
							inputRange: [0, 1],
							outputRange: [pageY, this.props.statusBarHeight + 10]
						})
					}
				],
				...shadow
			};

			let opacityStyle = {
				opacity: this.openProgress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolate: "clamp"
				})
			};

			return (
				<View style={styles.container}>
					<Animated.View style={[styles.cover, opacityStyle]} />
					<Animated.View style={backgroundStyle}>{this.props.MoveComponent}</Animated.View>
				</View>
			);
		}
		return <View />;
	}
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: "transparent"
	},
	cover: {
		flex: 1,
		backgroundColor: Colors.lightGray
	}
});

Transition.propTypes = {
	// MoveComponent: PropTypes.ReactElement.isRequired,
	transitionFinished: PropTypes.func,
	clearScreen: PropTypes.func.isRequired,
	returnScreen: PropTypes.func.isRequired,
	onPressPushTo: PropTypes.func.isRequired
};

export default Transition;
