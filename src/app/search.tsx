import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationStore } from 'store/store';

const Search = () => {
	const [search, setSearch] = React.useState('');
	const [places, setPlaces] = useState([]);

	const value = useDebounce(search, 500);
	console.log(value);

	const { data } = useQuery({
		queryKey: ['places', value],
		enabled: !!value,
		queryFn: async () => {
			const options = {
				method: 'GET',
				url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/places',
				params: {
					namePrefix: value,
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

	return (
		<SafeAreaView>
			<View className='w-full justify-center items-center py-10 px-6  '>
				<TextInput
					placeholder='Search'
					className='border p-2 mx-auto w-full border-slate-500 rounded-lg'
					value={search}
					onSubmitEditing={() => console.log(search)}
					onChangeText={setSearch}
					autoFocus
				/>
			</View>
			<View className='gap-4'>
				{data?.data.map((item) => (
					<Button
						onPress={() => {
							setLocation({
								coords: {
									latitude: item.latitude,
									longitude: item.longitude,
								},
							});

							router.back();
						}}
						className='w-full p-2 bg-white text-primary rounded-lg'
						mode='outlined'
						textColor='gray'>
						{item.name} - {item.countryCode}
					</Button>
				))}
			</View>
		</SafeAreaView>
	);
};

export default Search;

const styles = StyleSheet.create({});
