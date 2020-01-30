import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import LocationsScreen from '../screens/LocationsScreen';
import MetersScreen from '../screens/MetersScreen';
import MeterDataScreen from '../screens/MeterDataScreen';
import MeterDataDetailScreen from '../screens/MeterDataDetailScreen';
import MapScreen from '../screens/MapScreen';
import colors from '../constants/colors';

const MetersNavigator = createStackNavigator({
  LocationsScreen: LocationsScreen,
  MetersScreen: MetersScreen,
  MeterDataScreen: MeterDataScreen,
  MeterDataDetailScreen: MeterDataDetailScreen
},{
  defaultNavigationOptions: {
    headerStyle:{
      backgroundColor: colors.purple5
    },
    headerTintColor: colors.white
  }
});

const MapStack = createStackNavigator({
  Maps: MapScreen,
  MapMeterDataScreen: MeterDataScreen,
  MapMeterDataDetailScreen: MeterDataDetailScreen
},{
  defaultNavigationOptions: {
    headerStyle:{
      backgroundColor: colors.purple1
    },
    headerTintColor: colors.white
  }
})
// Top Tabs too confusing with bottom tabs ..?
// Using pills like things instead!
// const MapTabs = createMaterialTopTabNavigator({
//   ShowAll: {
//     screen: MapStack
//   },
//   Nearby: {
//     screen: MapScreen,
//    navigationOptions: {
//       title:'mytitle',
//       tabBarOnPress: ({ navigation, defaultHandler }) => {
//         console.log('onPress:', navigation.state.routeName);
//         defaultHandler()
//       },
//     }
//   }, 
//   Favourites: {
//     screen: MapScreen
//   }
// },{
//   tabBarOptions: {
//     activeTintColor: 'red'
//   }

// })
const MetersTabNavigator = createBottomTabNavigator({
  Lists: MetersNavigator,
  Maps: MapStack
});


//export default createAppContainer(MetersNavigator);
export default createAppContainer(MetersTabNavigator);