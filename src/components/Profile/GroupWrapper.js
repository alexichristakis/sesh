import React, { Component } from "react";
import { View, Animated } from "react-native";

import TouchableScale from "../global/TouchableScale";
import Group from "../Groups/Group";

import { CARD_GUTTER } from "../../lib/constants";
import { ShowGroupFocus } from "../../lib/navigation";

class GroupWrapper extends Component {
	opacity = new Animated.Value(1);

	handleTransition = () => {
		// console.log("group: ", group);
		const { group } = this.props;
		this.onLeave();
		this.view.measure((x, y, width, height, pageX, pageY) => {
			const dimensions = { x, y, width, height, pageX, pageY };
			// this.props.transition(dimensions, this.onReturn, {
			// 	...this.props.move,
			// 	photo: photo.uri !== "" ? photo : null
			// });

			ShowGroupFocus({
				props: {
					...dimensions,
					onReturn: this.onReturn,
					cardData: group
				}
			});
		});
	};

	onLeave = () => {
		Animated.timing(this.opacity, {
			toValue: 0,
			delay: 45,
			duration: 25,
			useNativeDriver: true
		}).start();
	};

	onReturn = () => {
		return new Promise(resolve => {
			Animated.timing(this.opacity, {
				toValue: 1,
				duration: 5,
				useNativeDriver: true
			}).start(() => resolve(true));
		});
	};

	render() {
		const { group } = this.props;
		return (
			<View ref={view => (this.view = view)}>
				<TouchableScale
					animatedStyle={{ opacity: this.opacity, marginBottom: CARD_GUTTER }}
					onPress={this.handleTransition}
				>
					<Group card data={group} />
				</TouchableScale>
			</View>
		);
	}
}

export default GroupWrapper;
