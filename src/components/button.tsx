import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import IconComponent from '@react-native-vector-icons/feather';
import { Loader } from '@/components';


interface ButtonProps {
	label: string;
    disabled?: boolean;
    width?: string;
	loading?: boolean;
	opacity?: number;
	noMargin?: boolean;
	backgroundColor?: string;
	textColor?: string;
	type?: 'filled' | 'outline' | 'transparent';
	rightIcon?: any;
	leftIcon?: any;
    onPress: () => any;
}

interface ButtonContainerProps {
	width: string;
	disabled?: boolean;
	noMargin?: boolean;
	backgroundColor?: string;
	textColor?: string;
	border?: string;
}

export const Button: React.FC<ButtonProps> = ({ label, width, disabled, loading, opacity, noMargin, backgroundColor, textColor, type, leftIcon, rightIcon, onPress }) => {

	const theme = useTheme();

	const types: any = {
		'filled': {
			backgroundColor: backgroundColor || undefined,
			textColor: textColor || undefined,
			border: undefined,
			underlayColor: theme.colors.accent
		},

		'outline': {
			backgroundColor: 'transparent',
			textColor: backgroundColor || theme.button.background,
			border: backgroundColor || theme.button.background,
			underlayColor: theme.colors.accent,
		},

		'transparent': {
			backgroundColor: 'transparent',
			textColor: backgroundColor || theme.button.background,
			border: textColor || theme.button.text,
			underlayColor: theme.colors.accent,
		},
	}

	const buttonType = type ? types[type] : types['filled'];

	return (
		<>{ !loading ?
				<Container
					onPress={disabled ? () => {} : onPress}
					activeOpacity={opacity}
					width={width || '100%'}
					disabled={disabled}
					noMargin={noMargin}
					backgroundColor={buttonType.backgroundColor}
					textColor={buttonType.textColor}
					border={buttonType.border}
					underlayColor={buttonType.underlayColor || theme.colors.accent}
				>
					<Content>
						{leftIcon && leftIcon.length > 0 && <IconComponent name={leftIcon} size={24} color={textColor || buttonType.textColor} />}
						<Label textColor={buttonType.textColor}>
							{label}
						</Label>
						{rightIcon && rightIcon.length > 0 && <IconComponent name={rightIcon} size={24} color={textColor || buttonType.textColor} />}
					</Content>
				</Container>
			:
				<LoadingContainer width={width || '100%'}>
					<Loader color={theme.button.text} />
				</LoadingContainer>
		}</>
	);
}

const Container = styled.TouchableHighlight<ButtonContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${props => props.width} ;
    height: 50px;
    margin-top: ${props => props.noMargin ? '0px' : '10px'};
    margin-bottom: ${props => props.noMargin ? '0px' : '10px'};

	background-color: ${props => props.backgroundColor || props.theme.button.background};
	color: ${props => props.textColor || props.theme.button.text};

    border-radius: 25px;
	border: ${props => props.border ? `2px solid ${props.border}` : 'none'};

    opacity: ${props => props.disabled ? 0.6 : 1};
`;

const LoadingContainer = styled.View<ButtonContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${props => props.width} ;
    height: 50px;
    margin-top: ${props => props.noMargin ? '0px' : '10px'};
    margin-bottom: ${props => props.noMargin ? '0px' : '10px'};

    background-color: ${props => props.theme.button.background};

    border-radius: 25px;

`;

const Label = styled.Text<{textColor?: string;}>`
    color: ${props => props.textColor || props.theme.button.text};
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
`;

const Content = styled.View`
	display: flex;
    align-items: center;
    justify-content: center;
	flex-direction: row;
	gap: 10px;
`

