import React, { Component } from "react";
import {
	StyleSheet,
	Easing,
	Animated,
	Keyboard,
	TouchableOpacity,
	View,
	Text,
	TextInput,
	Image
} from "react-native";

import Interactable from "react-native-interactable";
import SuperEllipseMask from "react-native-super-ellipse-mask";
import Icon from "react-native-vector-icons/Feather";
import { Navigation } from "react-native-navigation";
import { BlurView, VibrancyView } from "react-native-blur";

import ColorButton from "../global/ColorButton";

import { FacebookLogout, Test } from "../../api";
import { SignOutPop } from "../../lib/navigation";
import { Colors, FillAbsolute } from "../../lib/styles";
import { SB_HEIGHT, SCREEN_HEIGHT, BORDER_RADIUS } from "../../lib/constants";

class EditName extends Component {
	constructor(props) {
		super(props);

		this.deltaY = new Animated.Value(SCREEN_HEIGHT);
	}

	componentDidMount() {
		setTimeout(() => {
			this.interactable.snapTo({ index: 1 });
		}, 5);
	}

	dismiss = () => {
		Keyboard.dismiss();
		this.interactable.snapTo({ index: 0 });
	};

	handleOnSnap = event => {
		const { index } = event.nativeEvent;
		if (index === 0) {
			Navigation.dismissModal(this.props.componentId);
		}
	};

	render() {
		let animatedOpacity = {
			opacity: this.deltaY.interpolate({
				inputRange: [SCREEN_HEIGHT / 2 - 100, SCREEN_HEIGHT],
				outputRange: [1, 0]
			})
		};

		return (
			<View style={styles.container}>
				<TouchableOpacity style={FillAbsolute} activeOpacity={0.9} onPress={this.dismiss}>
					<Animated.View style={[styles.background, animatedOpacity]} />
				</TouchableOpacity>

				<Interactable.View
					animatedNativeDriver
					// verticalOnly
					ref={Interactable => (this.interactable = Interactable)}
					snapPoints={[
						{ y: SCREEN_HEIGHT, damping: 0.5, tension: 600 },
						{ y: SCREEN_HEIGHT / 2 - 100, damping: 0.5, tension: 600 }
					]}
					onSnap={this.handleOnSnap}
					initialPosition={{ y: SCREEN_HEIGHT }}
					animatedValueY={this.deltaY}
				>
					<SuperEllipseMask style={styles.interactable} radius={20}>
						<TextInput
							autoCapitalize={"none"}
							onChangeText={this._onChangeText}
							placeholder={this.props.group.name}
							style={styles.name}
							returnKeyType="go"
							autoFocus
							placeholderTextColor={Colors.primary}
							selectionColor={Colors.primary}
							maxLength={15}
							onSubmitEditing={this._getSubmitAction}
						/>
						<ColorButton
							textStyle={styles.textStyle}
							title={"change name"}
							color={Colors.primary}
							onPress={this.handleOnPressSignOut}
						/>
						<TouchableOpacity
							style={{ alignSelf: "center", paddingTop: 10 }}
							onPress={this.dismiss}
						>
							<Text style={{ color: Colors.primary, fontSize: 16 }}>cancel</Text>
						</TouchableOpacity>
					</SuperEllipseMask>
				</Interactable.View>
			</View>
		);
	}
}

/*
<Interactable.View
						animatedNativeDriver
						verticalOnly
						ref={Interactable => (this.interactable = Interactable)}
						snapPoints={[
							{ y: SCREEN_HEIGHT, damping: 0.5, tension: 600 },
							{ y: SCREEN_HEIGHT / 2 - 100, damping: 0.5, tension: 600 }
						]}
						onSnap={this.handleOnSnap}
						initialPosition={{ y: SCREEN_HEIGHT }}
						animatedValueY={this.deltaY}
					>
					</Interactable.View>
					*/

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 50
	},
	keyboardAvoiding: {
		alignSelf: "center",
		position: "absolute",
		bottom: 20,
		paddingBottom: 30
	},
	background: {
		...FillAbsolute,
		backgroundColor: "rgba(130,130,130,0.4)"
	},
	interactable: {
		// alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		padding: 20,
		paddingHorizontal: 40
	},
	name: {
		alignSelf: "center",
		color: Colors.primary,
		fontSize: 20,
		marginBottom: 10
	},
	textStyle: {
		fontSize: 14
	}
});

export default EditName;
