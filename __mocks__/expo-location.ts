export const requestForegroundPermissionsAsync = jest.fn().mockResolvedValue({ status: 'granted' });
export const getCurrentPositionAsync = jest.fn().mockResolvedValue({ coords: { latitude: 0, longitude: 0 } });
