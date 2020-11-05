import React from 'react'
import FilmList from './FilmList'
import {StyleSheet, Text, View} from 'react-native'
import {getNewFilmsFromApi} from '../API/TMDB'

class News extends React.Component {

	constructor(props) {
		super(props)
		this.page = 0
		this.totalPages = 0
		this.state = { 
			films: [],
			isLoading: false
		}
		this._loadFilms = this._loadFilms.bind(this)
	}

	_loadFilms() {
		this.setState({ isLoading: true })
		getNewFilmsFromApi(this.page+1).then(data => {
			this.page = data.page
			this.totalPages = data.total_pages
			this.setState({ 
				films: [ ...this.state.films, ...data.results ],
				isLoading: false
			})
		})
 	}

 	_displayLoading() {
 		if (this.state.isLoading) {
 			return (
 				<View style={styles.loading_container}>
 					<ActivityIndicator size='large' />
 				</View>
 			)
 		}
 	}

	render() {
		return (
			<FilmList
			  films={this.state.films}
			  navigation={this.props.navigation}
			  loadFilms={this._loadFilms} 
			  page={this.page}
			  totalPages={this.totalPages}
			  favoriteList={false}
			/>
		)
	}

	componentDidMount() {
		{this._loadFilms()}
	}
}

const styles = StyleSheet.create({

	loading_container: {
	    position: 'absolute',
	    left: 0,
	    right: 0,
	    top: 100,
	    bottom: 0,
	    alignItems: 'center',
	    justifyContent: 'center'
	}
})

export default News