import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	LocationAccuracy,
	LocationObject,
	getCurrentPositionAsync,
	getForegroundPermissionsAsync,
	useForegroundPermissions,
} from 'expo-location';
import { useEffect, useState } from 'react';

const useLocation = () => {
	const [location, setLocation] = useState<LocationObject | null>(null);
	const [status, requestPermisions] = useForegroundPermissions();

	const getLocation = async () => {
		try {
			if (!status?.granted) {
				const res = requestPermisions();
				return;
			}
			const data = await getCurrentPositionAsync({
				accuracy: LocationAccuracy.BestForNavigation,
			});
			// console.log(data);
			setLocation(data);
			AsyncStorage.setItem('location', JSON.stringify(data));
		} catch (error) {
			console.warn(error);
		}
	};
	useEffect(() => {
		AsyncStorage.getItem('location').then((data) => {
			if (data) {
				// console.log(JSON.parse(data));
				setLocation(JSON.parse(data));
			} else {
				getLocation();
			}
		});
	}, [status?.granted]);

	return location;
};

export default useLocation;
