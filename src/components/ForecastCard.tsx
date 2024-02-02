import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';

export function ForecastCard({ item }) {
	const time = new Date(item.time_epoch * 1000);
	let timeStamp = dayjs(time).format('hh:mm a');
	return (
		<TouchableOpacity onPress={() => console.log(item.time)} style={{ elevation: 4 }}>
			<View className='p-4 w-36 h-48 justify-center items-center rounded-[40px] bg-white'>
				<Text className='text-lg font-bold text-primary'>{timeStamp}</Text>
				<Image
					source={require('../assets/images/sun_cloud_midrain.svg')}
					contentFit='contain'
					style={{ width: 75, height: 75 }}
				/>
				<Text className='text-2xl font-bold text-primary/80'>
					{item.temp_c}°
				</Text>
			</View>
		</TouchableOpacity>
	);
}
