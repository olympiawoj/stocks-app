import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: '100%'
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    height: 25,
    justifyContent: 'space-between',
    marginRight: 55
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,

  },
  textLabel: {
    color: colors.gunsmokeGrey,
    fontWeight: "bold",
    fontSize: 12,
    paddingRight: 25,
    // backgroundColor: 'pink'
  }
});
