import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, ImageBackground, ActivityIndicator, StatusBar } from 'react-native';
import { Platform } from '@unimodules/core';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : false,
      error: false,
      location: '',
      temperature: 0,
      weather: ''
    }
  }

  componentDidMount(){
    this.handleUpdateLocation('Dhaka');
  }

  handleUpdateLocation = async city => {
    if(!city) return;

    this.setState({ loading : true}, async () => {
      try {
        const locationID = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(locationID);

        this.setState ({
          loading:false,
          error: false,
          location,
          weather,
          temperature
        });
      } catch(e){
        this.setState({
          loading: false,
          error: true
        })
      }
    });
  }
  render(){
    const { loading, error, location, weather, temperature} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content"/>
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large"/>

            {(!loading) && (
              <View>
                {(error) && (<Text style={[styles.textStyle, styles.smallText]}>Could not load, please try with different city</Text>)}
                {(!error) && (
                  <View>
                    <Text style={[styles.textStyle, styles.largeText]}>{location}</Text>
                    <Text style={[styles.textStyle, styles.smallText]}>{weather}</Text>
                    <Text style={[styles.textStyle, styles.largeText]}>{`${Math.round(temperature)}°`}</Text>
                  </View>
                )}
                <SearchInput placeholder="Search any city" onSubmit={this.handleUpdateLocation}/>
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },

  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white'
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
});
