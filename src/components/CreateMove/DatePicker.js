import React from "react";
import { StyleSheet, DatePickerIOS } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import { BORDER_RADIUS, CARD_GUTTER } from "~/lib/constants";

const DatePicker = props => {
  return (
    <SuperEllipseMask style={styles.container} radius={BORDER_RADIUS}>
      <DatePickerIOS
        date={props.chosenDate}
        minimumDate={props.currentDate}
        minuteInterval={10}
        onDateChange={props.onDateChange}
      />
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white", marginBottom: CARD_GUTTER }
});

export default DatePicker;
