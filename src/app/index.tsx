import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { cloud, icons, mask } from '@/assets/images';
import data from '../../data.json';
import forecastData from '../../forecast.json';
import { ForecastCard } from '@/components/ForecastCard';
import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync,
} from 'expo-location';

export default function Page() {
	const { current } = data;
	const {
		forecast: {
			forecastday: [hour],
		},
	} = forecastData;

	const getLocation = async () => {
		const { status } = await requestForegroundPermissionsAsync();
		if (status === 'granted') {
			const location = await getCurrentPositionAsync();
			console.log(location);
		}
	};

	const weatherItemData = [
		{
			title: 'humidity',
			value: `${current.humidity} %`,
			icon: icons.humidity,
		},
		{
			title: 'wind',
			value: `${current.wind_kph} km/h`,
			icon: icons.wind,
		},
		{
			title: 'visibility',
			value: `${current.vis_km} km`,
			icon: icons.visibility,
		},
		{
			title: 'pressure',
			value: `${current.pressure_mb}`,
			icon: icons.speedometer,
		},
	];

	useEffect(() => {
		getLocation();
	}, []);

	console.log(typeof hour);
	return (
		<LinearGradient
			start={{ x: 0, y: 0.5 }}
			end={{ x: 0.8, y: 0 }}
			colors={['#c9c5e7', '#c9c5e7']}
			className='flex-1 items-center'>
			<View className='justify-center items-center flex-[1.3]'>
				<BlurView
					intensity={50}
					style={{ elevation: 4 }}
					className='justify- items-center relative bg-primary rounded-[50px] overflow-hidden'>
					<View className='absolute w-full h-full bg-primary -z-10' />
					<View className='p-6 justify-center items-center'>
						<Image
							source={cloud}
							style={{ width: 200, height: 200 }}
							contentFit='cover'
						/>
						<Text className='text-7xl font-bold text-secondary'>
							{current.temp_c}°
						</Text>
						<Text className='text-xl font-bold text-secondary'>
							{current.condition.text}
						</Text>
					</View>
				</BlurView>
			</View>
			<BlurView
				intensity={80}
				className='w-full items-center flex-1 rounded-[150px]'>
				<View
					className='bg-white w-full max-w-md -top-20 flex-row p-8 rounded-[36px] justify-between'
					style={{ elevation: 4 }}>
					{weatherItemData.map((item) => (
						<WeatherContentItem
							key={item.title + item.value}
							icon={item.icon}
							value={item.value}
							title={item.title}
						/>
					))}
				</View>
				<View className='items-start -top-10'>
					<View className='max-h-68'>
						<View className='flex-row justify-between'>
							<Text className='px-10 text-xl font-bold text-slate-900 py-6'>
								Today
							</Text>
							<TouchableOpacity
								className='flex-row items-center justify-start'
								onPress={() => {}}>
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
							data={hour.hour}
							contentContainerStyle={{ paddingHorizontal: 24, columnGap: 24 }}
							keyExtractor={(item) => item.time}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item }) => <ForecastCard item={item} />}
						/>
					</View>
				</View>
			</BlurView>
		</LinearGradient>
	);
}

function WeatherContentItem({ icon, value, title }) {
	return (
		<View className='items-center gap-1'>
			<Image
				source={icon}
				style={{ width: 24, height: 24 }}
			/>
			<Text className='text-xl font-bold text-primary/80'>{value}</Text>
			<Text className='text-sm font-bold text-slate-300'>{title}</Text>
		</View>
	);
}
