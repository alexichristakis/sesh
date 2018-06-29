import React from "react";
import { StyleSheet, DatePickerIOS } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import { BORDER_RADIUS, CARD_GUTTER } from "../../lib/constants";

DatePicker = props => {
  return (
    <SuperEllipseMask
      style={{ backgroundColor: "white", marginBottom: CARD_GUTTER }}
      radius={BORDER_RADIUS}
    >
      <DatePickerIOS
        date={props.chosenDate}
        minimumDate={props.currentDate}
        onDateChange={props.onDateChange}
      />
    </SuperEllipseMask>
  );
};

export default DatePicker;
