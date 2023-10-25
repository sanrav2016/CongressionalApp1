import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 30,
    gap: 20
  },
  link: {
    fontFamily: FONT.regular,
    color: "white",
    fontSize: 40,
    fontWeight: 200
  }
});

export default styles;
