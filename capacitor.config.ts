import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.lunarsolar.puzzle",
	appName: "Lunar Solar Puzzle",
	webDir: "dist",
	server: {
		iosScheme: "ionic",
		cleartext: true
	},
	plugins: {
		LiveUpdates: {
			appId: "com.lunarsolar.puzzle",
			channel: "development",
			autoUpdateMethod: "none"
		}
	}
};

export default config;
