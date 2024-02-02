import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationStore } from 'store/store';

const Search = () => {
	const [search, setSearch] = React.useState('');

	const value = useDebounce(search, 500);
	console.log(value);

	const { data, error, isError } = useQuery({
		queryKey: ['places', value],
		enabled: !!value,
		queryFn: async (): Promise<LocationResponse> => {
			const options = {
				method: 'GET',
				url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/places',
				params: {
					namePrefix: value,
					minPopulation: '100000',
					limit: 10,
				},
				headers: {
					'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
					'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
				},
			};
			let res = await axios.request(options);
			return res.data;
		},
	});

	const setLocation = useLocationStore((state) => state.setLocation);

	console.log(data);

	return (
		<SafeAreaView>
			<View className='w-full justify-center items-center py-10 px-6  '>
				<TextInput
					placeholder='start typing to search...'
					className='border p-3 px-6 mx-auto w-full border-slate-500 rounded-lg'
					value={search}
					onSubmitEditing={() => console.log(search)}
					onChangeText={setSearch}
					autoFocus
				/>
				{isError && (
					<Text className='self-start text-slate-400'>{error.message}</Text>
				)}
			</View>
			<View className='gap-4'>
				{data?.data.map((item) => (
					<Button
						key={item.name + item.countryCode + Math.random().toLocaleString()}
						onPress={() => {
							setLocation({
								coords: {
									latitude: item.latitude,
									longitude: item.longitude,
								},
							});

							router.back();
						}}
						className='w-full max-w-md mx-auto p-2 bg-white text-primary rounded-lg'
						mode='outlined'
						textColor='gray'>
						{item.name}, {item.region} - {item.countryCode}
					</Button>
				))}
			</View>
		</SafeAreaView>
	);
};

export default Search;
