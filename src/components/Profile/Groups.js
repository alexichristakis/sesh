import React, { Component } from "react";
import { Animated, View, Text } from "react-native";

// import Group from "../Groups/Group";
import GroupWrapper from "./GroupWrapper";
// import TouchableScale from "../global/TouchableScale";

import { TextStyles } from "../../lib/styles";
import { ShowGroupFocus } from "../../lib/navigation";

class Groups extends Component {
	render() {
		const { groups } = this.props;
		return (
			<>
				<Text style={TextStyles.headerWhite}>MY GROUPS</Text>
				{groups.map(group => (
					<GroupWrapper key={group.id} group={group} />
				))}
			</>
		);
	}
}

export default Groups;
