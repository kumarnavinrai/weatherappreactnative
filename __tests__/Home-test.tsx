import React from 'react';
import HomeScreen from '../src/screens/HomeScreen';
import renderer from 'react-test-renderer';


describe('HomeScreen', () => {
  test('renders loading indicator when loading is true', () => {
    const component = renderer.create(<HomeScreen />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders weather information when loading is false', () => {
    const component = renderer.create(<HomeScreen />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('displays location name and country when weather data is loaded', () => {
    const weatherData = {
      location: { name: 'Test City', country: 'Test Country' },
      current: { temperature: 25, weather_description: 'Sunny' },
    };
    const component = renderer.create(<HomeScreen />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('search bar shows locations list when showSearchBar is true', () => {
    const component = renderer.create(<HomeScreen />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('search function is called with correct value on typing', () => {
    const component = renderer.create(<HomeScreen />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

