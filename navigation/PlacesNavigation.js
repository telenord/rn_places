import { createStackNavigator, createAppContainer } from 'react-navigation';
import PlaceListScreen from '../screens/PlaceListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import isAndroid from '../constants/isAndroid';
import Colors from '../constants/Colors';


const PlacesNavigator = createStackNavigator({
  Places: PlaceListScreen,
  PlaceDetail: PlaceDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: isAndroid ? Colors.primary : ''
    },
    headerTintColor: isAndroid ? 'white' : Colors.primary
  }
});

export default createAppContainer(PlacesNavigator);