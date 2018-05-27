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
			MoveComponent: this.props.MoveComponent,
			onReturn: null,
			sourceDimension: {
				height: 0,
				width: 0,
				pageX: 0,
				pageY: 0
			}
		};
	}

	componentWillReceiveProps(nextProps) {
		const { MoveComponent } = nextProps;
		this.setState({ MoveComponent: MoveComponent });
	}

	openCard = (source, onReturn, data, props) => {
		this.props.clearScreen();
		this.setState({
			open: true,
			onReturn: onReturn,
			sourceDimension: {
				height: source.height,
				width: source.width,
				x: source.x,
				y: source.y,
				pageX: source.pageX,
				pageY: source.pageY
			}
		});
		Animated.timing(this.openProgress, {
			toValue: 1,
			duration: 200,
			easing: Easing.poly(0.25),
			useNativeDriver: true
		}).start(() => {
			this.props.onPressPushTo(
				this.props.destinationPage,
				{
					...props,
					cardHeight: this.state.sourceDimension.height,
					data: data,
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
		setTimeout(() => {
			this.state.onReturn();
		}, 190);
		Animated.timing(this.openProgress, {
			toValue: 0,
			duration: 200,
			easing: Easing.poly(0.25),
			useNativeDriver: true
		}).start(() => {
			// this.props.transitionFinished();
			this.setState({ open: false });
		});
	};

	render() {
		const { height, width, x, y, pageX, pageY } = this.state.sourceDimension;

		if (this.state.open) {
			let cardAnimatedStyle = {
				position: "absolute",
				backgroundColor: "white",
				borderRadius: 15,
				left: 10,
				right: 10,
				// left: x,
				// right: x,
				padding: 10,
				paddingRight: 12,
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
					inputRange: [0, 0.7, 1],
					outputRange: [0, 1, 1],
					extrapolate: "clamp"
				})
			};

			return (
				<View style={styles.container}>
					<Animated.View style={[styles.cover, opacityStyle]} />
					<Animated.View style={cardAnimatedStyle}>{this.state.MoveComponent}</Animated.View>
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
