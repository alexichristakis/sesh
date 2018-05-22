import React, { Component } from "react";

import { Navigation } from "react-native-navigation";
import { registerScreens } from "./screens";

import { UserAuthenticated } from "./api";

import { Colors } from "./lib/styles";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module RCTImageLoader"]);

registerScreens();
Navigation.events().registerAppLaunchedListener(async () => {
	/* get user object if authenticated */
	Navigation.setDefaultOptions({
		// customTransition: { duration: 0.1 },
		popGesture: false,
		// modalPresentationStyle: "popover",
		topBar: {
			visible: false,
		},
	});
	let user = await UserAuthenticated();
	console.log(user);
	if (user) {
		Navigation.setRoot({
			stack: {
				children: [
					{
						component: {
							name: "sesh.Home",
							passProps: {
								user: user._user,
							},
						},
					},
				],
			},
		});
	} else {
		Navigation.setRoot({
			stack: {
				children: [
					{
						component: {
							name: "sesh.Register",
						},
					},
				],
			},
		});
	}
});
