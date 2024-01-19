import * as Location from 'expo-location';



// let isLocationAccessed = false;

export const getLocationPermission = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            isLocationAccessed = true;
            return await Location.getCurrentPositionAsync({});
        } else {
            console.log('Location permission denied');
            return null;
        }
    } catch (error) {
        console.error('Error requesting location permission:', error);
        return null;
    }
};

export const isLocationAccessed = () => {
    return isLocationAccessed;
};