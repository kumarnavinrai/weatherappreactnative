module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^expo-status-bar$': '<rootDir>/__mocks__/expo-status-bar',
    '^@expo/vector-icons$': '<rootDir>/__mocks__/expo-vector-icons',
    '^expo-location$': '<rootDir>/__mocks__/expo-location',
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config',
    '^nativewind$': '<rootDir>/__mocks__/nativewind',
    '^RenderImage$': '<rootDir>/__mocks__/RenderImage',
    '^RenderDay$': '<rootDir>/__mocks__/RenderDay',
  },
  modulePathIgnorePatterns: ['<rootDir>/node_modules'],
};
