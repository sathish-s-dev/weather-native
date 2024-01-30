import {
  LocationAccuracy,
  LocationObject,
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
} from 'expo-location';
import { useEffect, useState } from 'react';

const useLocation = () => {
	const [location, setLocation] = useState<LocationObject | null>(null);
	const getLocation = async () => {
		try {
			const { granted } = await getForegroundPermissionsAsync();
			if (!granted) {
				alert('Permission to access location was denied');
			}
			const data = await getCurrentPositionAsync({
				accuracy: LocationAccuracy.BestForNavigation,
			});
			console.log(data);
			setLocation(data);
		} catch (error) {
			console.warn(error);
		}
	};

	useEffect(() => {
		getLocation();
	}, []);

	return location;
};

export default useLocation;
