import React, { useCallback } from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { ForecastCard } from './ForecastCard';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router } from 'expo-router';

export function ForecastSection({ hour }: { hour: Hour[] }) {
	const _renderItem = useCallback(
		({ item }) => <ForecastCard item={item} />,
		[hour.length]
	);
	const newtime = +dayjs(new Date()).format('H');
	let filtedHour = hour.filter((item) => {
		const time = new Date(item.time_epoch * 1000);
		let timeStamp = +dayjs(time).format('H');
		// console.log(newtime, timeStamp);
		return timeStamp >= newtime;
	});
  
	return (
		<View className='items-start -top-10'>
			<View className='max-h-68'>
				<View className='flex-row justify-between'>
					<Text className='px-10 text-xl font-bold text-slate-900 py-6'>
						Today
					</Text>
					<TouchableOpacity
						className='flex-row items-center justify-start'
						onPress={() => {
							router.push('/forecast');
						}}>
						<Text className='text-xl font-bold text-slate-900 py-6 items-center'>
							Next 7 Days{' '}
						</Text>
						<Ionicons
							name='chevron-forward'
							size={24}
							color='black'
						/>
					</TouchableOpacity>
				</View>
				<FlatList
					horizontal
					data={filtedHour}
					contentContainerStyle={{ paddingHorizontal: 24, columnGap: 24 }}
					keyExtractor={(item) => item.time}
					showsHorizontalScrollIndicator={false}
					renderItem={_renderItem}
				/>
			</View>
		</View>
	);
}
