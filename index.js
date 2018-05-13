import { AppRegistry } from 'react-native';
import codePush        from "react-native-code-push";


import App from './src/App';

AppRegistry.registerComponent('animalparty', () => codePush(App));
