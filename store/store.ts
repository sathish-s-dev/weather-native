import { create } from 'zustand';

type Location = {
	coords: {
		latitude: number;
		longitude: number;
	};
};

type LocationStore = {
	location: Location;
	setLocation: (location: Location) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
	location: null,
	setLocation: (location) => set({ location }),
}));
