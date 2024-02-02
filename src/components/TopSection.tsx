import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import { Image, ImageBackground } from 'expo-image';
import { cloud, mask } from '@/assets/images';
const image = require('@/assets/images/card_bg.png');
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { IconButton } from 'react-native-paper';

const TopSection = ({ temp, condition, location }) => {
	return (
		<View className='justify-center w-full items-center flex-[1.3] relative'>
			<IconButton
				style={{
					position: 'absolute',
					top: 50,
					right: 20,
					elevation: 5,
					backgroundColor: 'white',
				}}
				mode='contained'
				iconColor='rgb(75 62 174)'
				icon={'magnify'}
				size={32}
				onPress={() => {
					router.push('/search');
				}}
			/>
			<Text className='text-lg my-2 top-14 absolute text-primary bg-white px-4 skew-x-12 rounded-tr-2xl rounded-bl-2xl pb-1  '>
				{location}
			</Text>
			<BlurView
				intensity={50}
				style={{ elevation: 4 }}
				className='justify- items-center relative rounded-[50px] overflow-hidden top-4'>
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
