import { StyleSheet } from "react-native";
import * as Utils from "@utils";

export default StyleSheet.create({
    contain: {
        flexDirection: "column"
    },
    contentRate: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    image: {
        width: Utils.scaleWithPixel(270),
        height: Utils.scaleWithPixel(130),
        borderRadius: 8
    }
});
