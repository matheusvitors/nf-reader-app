import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Feather from '@react-native-vector-icons/feather';
import { Loader } from '@/components';

interface IconButtonProps {
	icon: any;
	loading?: boolean;
	backgroundColor?: string;
	textColor?: string;
	disabled?: boolean;
	size?: number;
	onPress: () => any;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, loading, backgroundColor, textColor, size, onPress }) => {

	const theme = useTheme();

	return (
		<Container onPress={onPress} size={size || 30} backgroundColor={backgroundColor}>
			{loading ?
				<Loader color={textColor || theme.button.text} />
			:
				<Feather name={icon} size={size || 30} color={textColor || theme.button.text} />
			}
		</Container>
	);
}

const Container = styled.TouchableOpacity<{ backgroundColor?: string; size?: number; }>`
	display: flex;
	align-items: center;
	justify-content: center;

	height: ${props => props.size ? props.size + 10 : 50 }px;
	width: ${props => props.size ? props.size + 10 : 50 }px;

	margin-left: 5px;
	margin-right: 5px;

	background-color: ${props => props.backgroundColor || props.theme.button.background};

	border-radius: 25px;
`
