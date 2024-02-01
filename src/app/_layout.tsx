import '../global.css';
import { Slot, Stack } from 'expo-router';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
} from 'expo-location';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocationStore } from 'store/store';

export const queryClient = new QueryClient();

export default function Layout() {
	const [status, requestPermisions] = useForegroundPermissions();
	const setLocation = useLocationStore((state) => state.setLocation);
	console.log(JSON.stringify(status, null, 2));

	let getData = async () => {
		let res = await requestPermisions();
		if (res.status === 'granted') {
			let location = await getCurrentPositionAsync();
			setLocation({
				coords: {
					latitude: location?.coords.latitude,
					longitude: location?.coords?.longitude,
				},
			});
		}
	};
	useEffect(() => {
		AsyncStorage.getItem('location').then((data) => {
			if (data) {
				console.log(JSON.parse(data));
				let location = JSON.parse(data);
				setLocation({
					coords: {
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
					},
				});
			} else {
			}
		});
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: 'fade_from_bottom',
					animationTypeForReplace: 'push',
				}}>
				<Stack.Screen name='index' />
				<Stack.Screen name='forecast' />
				<Stack.Screen name='search' />
			</Stack>
		</QueryClientProvider>
	);
}
