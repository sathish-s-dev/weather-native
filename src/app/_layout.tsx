import '../global.css';
import { Slot, Stack } from 'expo-router';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';

export const queryClient = new QueryClient();

export default function Layout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack screenOptions={{headerShown: false}}>

			</Stack>
		</QueryClientProvider>
	);
}
