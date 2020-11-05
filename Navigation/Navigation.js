import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator  } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import Test from '../Components/Test'
import News from '../Components/News'

const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: FilmDetail
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: { 
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const NewsStackNavigator = createStackNavigator({
  News: { 
    screen: News,
    navigationOptions: {
      title: 'Les Derniers Films'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
    	tabBarIcon: () => {
    		return <Image
    		  source={require('../Images/ic_search.png')}
    		  style={styles.icon}/>
    	}
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/is_favorite.png')}
          style={styles.icon}/>
      }
  	}
  },
  News: {
    screen: NewsStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/ic_fiber_new.png')}
          style={styles.icon}/>
      }
    }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
    showLabel: false, // On masque les titres
    showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

const AppContainer = createAppContainer(MoviesTabNavigator)
export default AppContainer