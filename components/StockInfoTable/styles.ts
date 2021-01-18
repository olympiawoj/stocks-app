import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "flex-start",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    height: 25,
    backgroundColor: 'blue'
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
    marginRight: 50,
    backgroundColor: 'pink'
  }
});
