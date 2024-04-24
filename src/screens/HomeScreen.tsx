import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState, ErrorInfo} from 'react';

import {StatusBar} from 'expo-status-bar';
import {FontAwesome} from '@expo/vector-icons';
import {debounce} from 'lodash';
import * as Location from 'expo-location';
import {LocationData, WeatherData} from '@/types';
import {
  fetchLocations,
  fetchWeatherByLatLong,
  fetchWeatherForecast,
} from '@/api/weather';
import RenderDay from './RenderDay';
import CurrentWeather from './CurrentWeather';
import LocationsList from './LocationsList';
import SearchBar from './SearchBar';

// ErrorBoundary component to catch and handle errors
class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): { hasError: boolean } {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return <p>Something went wrong. Please try again later.</p>;
    }

    // Render children normally if no error occurred
    return this.props.children;
  }
}

export default function HomeScreen() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [weather, setWeather] = useState<WeatherData>({});
  const [loading, setLoading] = useState(true);

  const handelLocation = (loc: {name: string}) => {
    setLocations([]);
    setShowSearchBar(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
    }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => setLocations(data));
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      await Location.getCurrentPositionAsync({}).then(location => {
        fetchWeatherByLatLong(location.coords).then(data => {
          setWeather(data);
          setLoading(false);
        });
      });
    })();
  };

  const handleDebounce = useCallback(debounce(handleSearch, 500), []);
  const {current, location} = weather;
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} className=" bg-slate-500">
      <View className="flex flex-1 bg-slate-500">
        <StatusBar style="light" />
        {/* <ErrorBoundary> Wrap your conditional rendering with ErrorBoundary */}
        {loading ? (
          <View className="flex flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <View className="flex flex-1">
            {/* SEARCH BAR SECTION */}
            <View className=" mx-4 mt-5 relative z-10">
              <SearchBar
                showSearchBar={showSearchBar}
                setShowSearchBar={setShowSearchBar}
                handleDebounce={handleDebounce}
              />
              {locations?.length > 0 && showSearchBar ? (
                
                <LocationsList
                  locations={locations}
                  handleLocation={handelLocation}
                />
               
              ) : null}
              
            </View>

            {/* FORCAST SECTION */}

            {/* {!showSearchBar ? ( */}
            <View className="flex-1 flex justify-around mx-4 mb-2">
              <View className="flex-column items-center justify-center">
                <Text className="text-white text-3xl font-bold items-center justify-center">
                  {location?.name},
                </Text>
                <Text className="text-lg text-white font-semibold items-center justify-center">
                  {' ' + location?.country}
                </Text>
              </View>
              {/*  CURRENT WEATHER  */}
              <CurrentWeather current={current} />

              {/* NEXT DAYS FORCAST */} 
              <View className="flex-row items-center ml-2 my-6">
                <FontAwesome name="calendar" size={30} color="white" />
                <Text className="text-white font-semibold ml-3 text-lg">
                  Hourly Forcast
                </Text>
              </View>
              <View>
                <FlatList
                  data={weather?.forecast?.forecastday[0].hour}
                  renderItem={({item}) => <RenderDay item={item} />}
                  horizontal
                />
              </View>
            </View>
          </View>
        )}
        {/* </ErrorBoundary> */}
      </View>
    </ScrollView>
  );
}
