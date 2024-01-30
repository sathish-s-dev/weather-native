import { View, Text } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import { Image, ImageBackground } from 'expo-image';
import { cloud, mask } from '@/assets/images';
const image = require('@/assets/images/card_bg.png');

const TopSection = ({ temp, condition, location }) => {
	return (
		<View className='justify-center items-center flex-[1.3] relative'>
			<Text className='text-2xl py-2 top-14 absolute text-primary'>
				{location}
			</Text>
			<BlurView
				intensity={50}
				style={{ elevation: 4 }}
				className='justify- items-center relative rounded-[50px] overflow-hidden'>
				<ImageBackground
					source={image}
					contentFit='fill'
					className='w-full h-full'>
					<View className='p-6 justify-center items-center'>
						<Image
							source={cloud}
							style={{ width: 200, height: 200 }}
							contentFit='cover'
						/>
						<Text className='text-7xl font-bold text-secondary'>{temp}°</Text>
						<Text className='text-xl font-bold text-secondary'>
							{condition}
						</Text>
					</View>
				</ImageBackground>
			</BlurView>
		</View>
	);
};

export default TopSection;
