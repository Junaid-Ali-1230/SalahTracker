// renderCheckboxes.js
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const RenderCheckboxes = ({ count }) => {
  const checkboxes = [];

  for (let i = 1; i <= count; i++) {
    checkboxes.push(
      <BouncyCheckbox
        key={i}
        size={30}
        fillColor="#fcd400"
        unfillColor="#0A9396"
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
      />
    );
  }

  return checkboxes;
};

export default RenderCheckboxes;
