import { AppRegistry } from "react-native";
import App from "./app/index";
import bgMessaging from "./bgMessaging";
AppRegistry.registerComponent('uniatm', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);