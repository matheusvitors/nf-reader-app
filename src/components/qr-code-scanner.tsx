import { useAppStateListener } from "@/hooks";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal } from "react-native";
import { Camera, CameraRuntimeError, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import styled from "styled-components/native";

interface QrCodeScannerProps {
	setIsCameraShown: (value: boolean) => void;
	onReadCode: (value: string) => void;
}

export const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ setIsCameraShown, onReadCode }) => {
	const [codeScanned, setCodeScanned] = useState<string>();
	const [isCameraInitialized, setIsCameraInitialized] = useState(false);
	const [flash, setFlash] = useState<'on' | 'off'>('off');
	const [isActive, setIsActive] = useState(false);

	const device = useCameraDevice("back");
	const cameraRef = useRef<Camera>(null);
	const isFocused = useIsFocused();
	const {appState} = useAppStateListener();
	const codeScanner = useCodeScanner({
		codeTypes: ["qr"],
		onCodeScanned(codes, frame) {
			if (codes.length > 0) {
				codes[0].value &&
					setTimeout(() => {
						setCodeScanned(codes[0]?.value);
					}, 500);
			}
		},
	});

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if(isCameraInitialized){
			timeout = setTimeout(() => {
				setIsActive(true);
				setFlash('off');
			}, 0);
		}

		return () => {
			clearTimeout(timeout);
		}
	}, [isCameraInitialized]);

	useEffect(() => {
		codeScanned && onReadCode(codeScanned);
		codeScanned && setIsCameraShown(false);
	}, [codeScanned])

	device === null && Alert.alert("Erro!", "A camera não pode ser iniciada.");

	const onError = (error: CameraRuntimeError) => {
		Alert.alert("Erro!", error.message);
	};

	const onInitialized = () => {
		setIsCameraInitialized(true);
	};

	return (
		<Container>
			<Modal presentationStyle='fullScreen' animationType='slide' onRequestClose={() => setIsCameraShown(false)}>
				{device && isFocused && (
					<Camera
						ref={cameraRef}
						onError={onError}
						photo={false}
						device={device}
						codeScanner={codeScanner}
						isActive={
							isActive &&
							isFocused &&
							appState === 'active' &&
							isCameraInitialized
						}
						torch={flash}
						onInitialized={onInitialized}
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							flex: 1,
							zIndex: 100,
						}}
					/>
				)}
			</Modal>
		</Container>
	);
};

const Container = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
`;
