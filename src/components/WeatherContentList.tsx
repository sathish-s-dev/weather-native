import { icons } from "@/assets/images";
import { View } from "react-native";
import { WeatherContentItem } from "./WeatherContentItem";


export function WeatherContentList({ current }) {
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
	return (
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
	);
}
