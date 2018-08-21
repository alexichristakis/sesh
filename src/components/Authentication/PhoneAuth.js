import React, { Component } from "react";

import {
	AppRegistry,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Platform,
	Alert
} from "react-native";

import firebase from "react-native-firebase";

// import CountryPicker from "react-native-country-picker-modal";
import TouchableScale from "../global/TouchableScale";

import { SetUserPhone } from "../../api";
import { Colors } from "../../lib/styles";

const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 20;

// if you want to customize the country picker
const countryPickerCustomStyles = {};

class PhoneAuth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			enterCode: false,
			spinner: false,
			country: {
				cca2: "US",
				callingCode: "1"
			},
			confirmResult: null,
			phoneNumber: "",
			verificationCode: ""
		};
	}

	_getCode = () => {
		const { phoneNumber } = this.state;
		this.setState({ spinner: true }, () => {
			firebase
				.auth()
				.signInWithPhoneNumber(`+1${phoneNumber}`)
				.then(confirmResult => {
					this.setState({ confirmResult, enterCode: true }, () => {
						SetUserPhone(phoneNumber, this.props.user.uid);
					});
				})
				.catch(error => console.log(error));
		});
	};

	_verifyCode = () => {
		this.setState({ spinner: true });
		const { confirmResult, verifcationCode } = this.state;
		console.log(verificationCode);

		confirmResult.confirm(verifcationCode).then(user => console.log("we're logged in"));

		// this.state
		// 	.confirmResult(this.state.verifcationCode)
		// 	.then(user => {
		// 		// Navigation.push(this.props.componentId);
		// 		console.log("we're logged in!");
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});
	};

	_onChangeText = val => {
		if (!this.state.enterCode) this.setState({ phoneNumber: val });
		else {
			this.setState({ verifcationCode: val });
			if (val.length === MAX_LENGTH_CODE) this._verifyCode();
		}
	};

	_tryAgain = () => {
		this.refs.form.refs.textInput.setNativeProps({ text: "" });
		this.refs.form.refs.textInput.focus();
		this.setState({ enterCode: false });
	};

	_getSubmitAction = () => {
		this.state.enterCode ? this._verifyCode() : this._getCode();
	};

	_changeCountry = country => {
		this.setState({ country });
		this.refs.form.refs.textInput.focus();
	};

	_renderFooter = () => {
		if (this.state.enterCode)
			return (
				<View>
					<Text style={styles.wrongNumberText} onPress={this._tryAgain}>
						Enter the wrong number or need a new code?
					</Text>
				</View>
			);

		return (
			<View>
				<Text style={styles.disclaimerText}>
					By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone
					number. Message &amp; data rates may apply.
				</Text>
			</View>
		);
	};

	_renderCountryPicker = () => {
		if (this.state.enterCode) return <View />;

		return (
			<CountryPicker
				ref={"countryPicker"}
				closeable
				style={styles.countryPicker}
				onChange={this._changeCountry}
				cca2={this.state.country.cca2}
				styles={countryPickerCustomStyles}
				translation="eng"
			/>
		);
	};

	_renderCallingCode = () => {
		if (this.state.enterCode) return <View />;

		return (
			<View style={styles.callingCodeView}>
				<Text style={styles.callingCodeText}>+{this.state.country.callingCode}</Text>
			</View>
		);
	};

	render() {
		let headerText = `What's your ${this.state.enterCode ? "verification code" : "phone number"}?`;
		let buttonText = this.state.enterCode ? "Verify confirmation code" : "Send confirmation code";
		let textStyle = this.state.enterCode
			? {
					height: 50,
					textAlign: "center",
					fontSize: 40,
					fontWeight: "bold",
					fontFamily: "Courier"
			  }
			: {};

		return (
			<View style={styles.container}>
				<Text style={styles.header}>{headerText}</Text>

				<View style={{ flexDirection: "row" }}>
					{this._renderCallingCode()}
					{this.state.enterCode && (
						<TextInput
							name={"code"}
							type={"TextInput"}
							autoCapitalize={"none"}
							autoCorrect={false}
							onChangeText={this._onChangeText}
							placeholder={"_ _ _ _ _ _"}
							keyboardType={"number-pad"}
							style={[styles.textInput, textStyle]}
							returnKeyType="go"
							autoFocus
							placeholderTextColor={Colors.primary}
							selectionColor={Colors.primary}
							maxLength={6}
							onSubmitEditing={this._getSubmitAction}
						/>
					)}
					{!this.state.enterCode && (
						<TextInput
							name={"code"}
							type={"TextInput"}
							autoCapitalize={"none"}
							autoCorrect={false}
							onChangeText={this._onChangeText}
							placeholder={"Phone Number"}
							keyboardType={"number-pad"}
							style={[styles.textInput, textStyle]}
							returnKeyType="go"
							autoFocus
							placeholderTextColor={Colors.primary}
							selectionColor={Colors.primary}
							maxLength={20}
							onSubmitEditing={this._getSubmitAction}
						/>
					)}
				</View>

				<TouchableScale style={styles.button} onPress={this._getSubmitAction}>
					<Text style={styles.buttonText}>{buttonText}</Text>
				</TouchableScale>

				{this._renderFooter()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	countryPicker: {
		alignItems: "center",
		justifyContent: "center"
	},
	container: {
		flex: 1,
		padding: 20
	},
	header: {
		textAlign: "center",
		marginTop: 60,
		fontSize: 22,
		margin: 20,
		color: "#4A4A4A"
	},
	form: {
		margin: 20
	},
	textInput: {
		padding: 0,
		margin: 0,
		flex: 1,
		fontSize: 20,
		color: Colors.primary
	},
	button: {
		marginTop: 20,
		height: 50,
		backgroundColor: Colors.primary,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5
	},
	buttonText: {
		color: "#fff",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontWeight: "bold"
	},
	wrongNumberText: {
		margin: 10,
		fontSize: 14,
		textAlign: "center"
	},
	disclaimerText: {
		marginTop: 30,
		fontSize: 12,
		color: "grey"
	},
	callingCodeView: {
		alignItems: "center",
		justifyContent: "center"
	},
	callingCodeText: {
		fontSize: 20,
		color: Colors.primary,
		fontFamily: "Helvetica",
		fontWeight: "bold",
		paddingRight: 10
	}
});

export default PhoneAuth;
