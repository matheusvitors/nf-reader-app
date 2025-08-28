import { PermissionsAndroid } from "react-native";

export const permissions = {
	request: async () => {
		const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
		return PermissionsAndroid.RESULTS.GRANTED === result ? true : false;
	},

	verify: async () => {
		return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
	}
}
