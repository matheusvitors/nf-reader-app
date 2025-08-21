import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Material from '@react-native-vector-icons/material-design-icons';
import { Loader } from '@/components';

interface IconButtonProps {
	// icon: any;
	loading?: boolean;
	backgroundColor?: string;
	textColor?: string;
	disabled?: boolean;
	size?: number;
	onPress: () => any;
}

export const QRCodeButton: React.FC<IconButtonProps> = ({ loading, backgroundColor, textColor, size, onPress }) => {

	const theme = useTheme();

	return (
		<Container onPress={onPress} size={size || 30} backgroundColor={backgroundColor}>
			{loading ?
				<Loader color={textColor || theme.button.text} />
			:
				<Material name='qrcode-scan' size={size || 25} color={textColor || theme.button.text} />
			}
		</Container>
	);
}

const Container = styled.TouchableOpacity<{ backgroundColor?: string; size?: number; }>`
	display: flex;
	align-items: center;
	justify-content: center;

	height: 50px;
	width: 50px;

	margin-left: 5px;
	margin-right: 5px;

	background-color: ${props => props.backgroundColor || props.theme.button.background};

	border-radius: 25px;
`
