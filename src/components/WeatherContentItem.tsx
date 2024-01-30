import { Image } from 'expo-image';
import { Text, View } from 'react-native';

export function WeatherContentItem({ icon, value, title }) {
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
