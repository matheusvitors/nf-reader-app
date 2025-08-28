import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus, View } from 'react-native';

export const useAppStateListener = (onForeground?: () => void, onBackground?: () => void) => {

	const appStateRef = useRef(AppState.currentState);
	const onForegroundRef = useRef(onForeground);
	const onBackgroundRef = useRef(onBackground);

	onForegroundRef.current = onForeground;
	onBackgroundRef.current = onBackground;

	useEffect(() => {
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			if(nextAppState === 'active'){
				onForegroundRef.current?.();
			}

			if(nextAppState.match(/inactive|backbround/)) {
				onBackgroundRef.current?.();
			}

			appStateRef.current = nextAppState
		}

		const subscription = AppState.addEventListener('change', handleAppStateChange);

		return () => {
			subscription?.remove && subscription.remove();
		}
	}, [])

	return {
		appState: appStateRef.current
	}
}
