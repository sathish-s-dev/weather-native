import { ForecastSection } from '@/components/ForecastSection';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import TopSection from './TopSection';
import { WeatherContentList } from './WeatherContentList';
import { SearchBar } from 'react-native-screens';

type HomeProps = {
	current: Current;
	hourData: Hour[];
	location: string;
};

export function Home({ current, hourData, location }: HomeProps) {
	return (
		<LinearGradient
			start={{ x: 0, y: 0.5 }}
			end={{ x: 0.8, y: 0 }}
			colors={['#c9c5e7', '#c9c5e7']}
			className='flex-1 items-center'>
			<TopSection
				location={location}
				temp={current.temp_c}
				condition={current.condition.text}
			/>
			<BlurView
				intensity={80}
				className='w-full items-center flex-1 rounded-[150px]'>
				<WeatherContentList current={current} />
				<ForecastSection hour={hourData} />
			</BlurView>
		</LinearGradient>
	);
}
