import { weatherImages } from '@/constants';
import useLocation from '@/hooks/useLocation';
import { FlashList } from '@shopify/flash-list';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ForecastPage = () => {
	const { top } = useSafeAreaInsets();
	console.log(top);

	const location = useLocation();

	const coords = `${location?.coords?.latitude},${location?.coords?.longitude}`;

	const { data: forecast } = useQuery({
		queryKey: ['forecast-full', coords],
		queryFn: async (): Promise<ForecastResponse> => {
			const data = await axios.get(
				`http://api.weatherapi.com/v1/forecast.json?key=1b9a89cc87ef435e8da72135230412&q=${coords}&days=7&aqi=no&alerts=no`
			);
			return data.data;
		},
		enabled: !!location,
		placeholderData: keepPreviousData,
	});

	const forecastDay = forecast?.forecast?.forecastday;
	const flatted = forecastDay?.map((item) => item.hour);

	return (
		<View
			style={{ paddingTop: top }}
			className={`bg-violet-200 flex-1 p-4`}>
			<View className='flex-row items-center gap-6'>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons
						name='chevron-back'
						size={24}
						color='rgb(75 62 174)'
					/>
				</TouchableOpacity>
				<Text className={'text-primary text-2xl font-semibold py-4'}>
					Weather Forecast
				</Text>
			</View>
			<FlashList
				data={flatted?.flat(1)}
				contentContainerStyle={{}}
				ListEmptyComponent={() => {
					return (
						<View className='flex-1 h-full items-center justify-center'>
							<ActivityIndicator
								size={'large'}
								color='violet'
							/>
						</View>
					);
				}}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <View className='h-4' />}
				keyExtractor={(item) => item.time_epoch.toString()}
				estimatedItemSize={100}
				directionalLockEnabled
				renderItem={({ item, index }) => {
					return (
						<ForecastItem
							item={item}
							index={index}
						/>
					);
				}}
			/>
		</View>
	);
};

export default ForecastPage;

function ForecastItem({ item, index }: { item: Hour; index: number }) {
	const date = dayjs(item.time).format('DD/MMM HH:mm a');
	console.log(index);
	return (
		<BlurView
			intensity={80}
			className='w-full mx-auto rounded-[24px] overflow-hidden bg-white'>
			<TouchableOpacity
				className='px-8 py-6 bg-white'
				style={{ elevation: 4 }}>
				<View className='flex-row items-center gap-4'>
					<Image
						source={weatherImages[item.condition.text] || 'other'}
						alt='weather'
						contentFit='cover'
						style={{ width: 50, height: 50 }}
					/>
					<View>
						<Text className='text-primary text-2xl font-bold'>
							{item.temp_c} °C
						</Text>
						<Text className='text-primary'>
							{item.condition.text} | {date}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</BlurView>
	);
}
