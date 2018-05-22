import React, { Component } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

export default class LoadingCircle extends Component {
	componentDidMount() {
		this.animation.play();
	}

	render() {
		const wrapperSize = this.props.size || 20;
		const animationSize = wrapperSize * 3;

		const color = this.props.color || "white";
		const animationSource = require("../../assets/animations/loading.json");

		return (
			<View
				style={[
					{
						position: "relative",
						height: wrapperSize,
						width: wrapperSize,
					},
					this.props.style || {},
				]}>
				<View
					style={{
						position: "absolute",
						left: wrapperSize * -1,
						top: wrapperSize * -1,
						height: animationSize,
						width: animationSize,
					}}>
					<LottieView
						ref={animation => {
							this.animation = animation;
						}}
						source={animationSource}
						style={{
							height: animationSize,
							width: animationSize,
						}}
						loop={true}
						autoplay={true}
					/>
				</View>
			</View>
		);
	}
}

LoadingCircle.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
};
