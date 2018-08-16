import React from "react";
import { StyleSheet, DatePickerIOS } from "react-native";

import SuperEllipseMask from "react-native-super-ellipse-mask";

import { BORDER_RADIUS, CARD_GUTTER } from "../../lib/constants";

const DatePicker = ({ chosenDate, currentDate, onDateChange }) => {
  return (
    <SuperEllipseMask style={styles.container} radius={BORDER_RADIUS}>
      <DatePickerIOS
        date={chosenDate}
        minimumDate={currentDate}
        minuteInterval={10}
        onDateChange={onDateChange}
      />
    </SuperEllipseMask>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white", marginVertical: CARD_GUTTER }
});

export default DatePicker;
