import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Catalogue from '../screens/Catalogue';
import PantCatalogue from '../screens/PantCatalogue';
import ShirtCatalogue from '../screens/ShirtCatalogue';

export const StackNavigator = createStackNavigator({
    Catalogue:{
        screen:Catalogue,
        navigationOptions:{
            headerShown:false
        }
    },
    ShirtCatalogue:{
        screen:ShirtCatalogue,
        navigationOptions:{
            title:'Shirt',
            headerStyle:{alignSelf:"center",backgroundColor:'#90A5A9'}
        }
    },
    PantCatalogue:{
        screen:PantCatalogue,
        navigationOptions:{
            title:'Pant',
            headerStyle:{alignSelf:"center",backgroundColor:'#90A5A9'}
        }
    }
}
)