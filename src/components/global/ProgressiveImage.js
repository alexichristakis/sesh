import React, { Component } from "react";
import { Animated, Image, View } from "react-native";
import { BlurView } from "react-native-blur";
import PropTypes from "prop-types";

class ProgressiveImage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			thumbnailOpacity: new Animated.Value(0),
			imageOpacity: new Animated.Value(1),
		};
	}

	onLoad = () => {
		Animated.parallel([
			Animated.timing(this.state.thumbnailOpacity, {
				toValue: 0,
				duration: 1000,
			}).start(),
			Animated.timing(this.state.imageOpacity, {
				toValue: 0,
				duration: 1000,
			}).start(),
		]);
	};

	onThumbnailLoad = () => {
		Animated.timing(this.state.thumbnailOpacity, {
			toValue: 1,
			duration: 500,
		}).start();
	};

	render() {
		return (
			<View style={styles.container}>
				<Animated.Image
					resizeMode="cover"
					style={[{ flex: 1 }, this.props.style]}
					source={this.props.source}
					onLoad={this.onLoad}
				/>
				<Animated.View style={[styles.blur, { opacity: this.state.imageOpacity }]}>
					<Animated.Image
						resizeMode="cover"
						style={[{ opacity: this.state.thumbnailOpacity, flex: 1 }, this.props.style]}
						source={this.props.thumbnail}
						onLoad={this.onThumbnailLoad}
					/>
					<BlurView blurType="dark" style={styles.blur} blurAmount={10} />
				</Animated.View>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	blur: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
};

ProgressiveImage.propTypes = {
	style: PropTypes.object.isRequired,
	source: PropTypes.object.isRequired,
	thumbnail: PropTypes.object.isRequired,
};

export default ProgressiveImage;
