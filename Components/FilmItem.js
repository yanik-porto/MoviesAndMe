import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import {getImageFromApi} from '../API/TMDB'

class FilmItem extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			positionLeft: new Animated.Value(Dimensions.get('window').width)
		} 
	}

	componentDidMount() {
		Animated.spring(
			this.state.positionLeft,
			{
				toValue: 0,
				useNativeDriver: false
			}
		).start()
	}

	_displayFavoriteImage() {
	  if (this.props.isFilmFavorite) {
	    // Film dans nos favoris
		return (
			<Image
			style={styles.favorite_image}
			source={require('../Images/is_favorite.png')}
			/>
  		)
	  }
	}	

	render() {
		const { film, displayDetailForFilm } = this.props
		return (
			<Animated.View
			style={{ left: this.state.positionLeft }}>
				<TouchableOpacity 
					style={styles.main_container}
					onPress={() => displayDetailForFilm(film.id)}>
					<Image
						style={styles.image_container}
					    source={{uri: getImageFromApi(film.poster_path)}}
					/>
					<View style={styles.content_container}>
						<View style={styles.header_container}>
							{this._displayFavoriteImage()}
							<Text style={styles.title_text}>{film.title}</Text>
							<Text style={styles.vote_text}>{film.vote_average}</Text>
						</View>
						<View style={styles.description_container}>
							<Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
						</View>
						<View style={styles.date_container}>
							<Text style={styles.date_text}>Sorti le {film.release_date}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		height: 190,
		flexDirection: 'row'
	},
	content_container: {
		flexDirection: 'column',
		flex: 2
	},
	header_container: {
		flexDirection: 'row',
		flex: 2,
		margin: 5
	},
	title_text: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 18,
		flexWrap: 'wrap',
		paddingRight: 5
	},
	vote_text: {
		fontSize: 24,
		color: '#666666',
		fontWeight: 'bold',
	},
	description_container: {
		flex: 7
	},
	description_text: {
		fontStyle: 'italic',
		color: '#666666',
		margin: 5
	},
	date_container: {
		flex: 1,
		margin: 5
	},
	date_text: {
		textAlign: 'right',
		fontSize: 14
	},
	image_container: {
	    width: 120,
	    height: 180,
	    margin: 5,
	    backgroundColor: 'gray'
	},
	favorite_image: {
      width: 20,
      height: 20
  	}
})


export default FilmItem