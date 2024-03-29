import { Home } from '@/components/Home';
import useLocation from '@/hooks/useLocation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { queryClient } from './_layout';
import { useForegroundPermissions } from 'expo-location';
import { useLocationStore } from 'store/store';
// import forecastData from '../../forecast.json';

export default function Page() {
	const locationData = useLocationStore((state) => state.location);
	console.log(locationData);

	const coords = `${locationData?.coords?.latitude},${locationData?.coords?.longitude}`;
	const { data, isLoading } = useQuery({
		queryKey: ['weather', coords],
		queryFn: async () => {
			const data = await axios.get(
				`http://api.weatherapi.com/v1/current.json?key=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&q=${coords}&aqi=no`
			);
			return data.data;
		},
	});
	const { data: forecastData } = useQuery({
		queryKey: ['forecast', coords],
		queryFn: async () => {
			const data = await axios.get(
				`http://api.weatherapi.com/v1/forecast.json?key=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&q=${coords}&days=1&aqi=no&alerts=no`
			);
			return data.data;
		},
	});

	if (!location) {
		return (
			<View className='flex-1 items-center justify-center'>
				<ActivityIndicator size={50} />
			</View>
		);
	}

	if (!data || !forecastData || isLoading)
		return (
			<View className='flex-1 items-center justify-center'>
				<ActivityIndicator size={50} />
			</View>
		);

	const current = data?.current;
	const { location: _location } = data;
	const {
		forecastday: [hour],
	} = forecastData?.forecast;

	return (
		<Home
			location={_location.name + ', ' + _location.region}
			current={current}
			hourData={hour?.hour}
		/>
	);
}
