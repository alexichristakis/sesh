import React from "react";
import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../../lib/styles";

class Background extends React.PureComponent {
  render() {
    return (
      <LinearGradient
        style={{ flex: 1 }}
        locations={[0.5, 1]}
        colors={[Colors.mediumGray, Colors.mediumGray]}
      >
        {this.props.children}
      </LinearGradient>
    );
  }
}

export default Background;
