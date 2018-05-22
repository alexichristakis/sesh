import React, { Component } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

export default class Waves extends Component {
	componentDidMount() {
		this.animation.play();
	}

	render() {
		const wrapperSize = this.props.size || 500;
		const animationSize = wrapperSize * 3;

		return (
			<View
				style={[
					{
						position: "absolute",
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
						source={require("../../assets/animations/waves_.json")}
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

Waves.propTypes = {
	size: PropTypes.number,
};
