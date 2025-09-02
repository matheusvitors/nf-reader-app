import React from 'react';
import { KeyboardTypeOptions, ReturnKeyTypeOptions, Text } from 'react-native';
import styled from 'styled-components/native';

interface TextFieldProps {
	label: string;
    value?: string;
	autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
    placeholder?: string;
	numberOfLines?: number;
	multiline?: boolean;
    returnKeyType?: ReturnKeyTypeOptions;
	secureTextEntry?: boolean;
	width?: string;
	required?: boolean;
	bottomText?: string;
    onChangeText: (text: string) => void;
    onSubmitEditing?: () => void;
    onKeyPress?: () => void;
}

//TODO: Criar TextInput animado: https://bilir.me/blog/creating-an-animated-textfield-with-react-native
//TODO: Keyboard handle https://www.freecodecamp.org/news/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580/

/**
 * ReturnKeyTypeOptions
 * 'default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call'
 */

export const TextInput: React.FC<TextFieldProps> = ({ label, value, autoCapitalize, keyboardType, maxLength, placeholder, numberOfLines, multiline, returnKeyType, width, bottomText, onChangeText, onSubmitEditing, onKeyPress, secureTextEntry, required }) => {
	return (
		<Container width={width}>
			<Label>{label ? label : ''}{required && '*'}</Label>
			<Input
				autoCapitalize={autoCapitalize || 'sentences'}
				value={value}
				onChangeText={onChangeText}
				numberOfLines={numberOfLines}
				multiline={multiline}
				keyboardType={keyboardType? keyboardType : 'default'}
				maxLength={maxLength? maxLength : undefined}
				placeholder={placeholder ? placeholder : undefined}
				returnKeyType={returnKeyType? returnKeyType : 'default'}
				onSubmitEditing={onSubmitEditing}
				onKeyPress={onKeyPress}
				secureTextEntry={secureTextEntry ? true : false}
			/>
			{bottomText && <Text>{bottomText}</Text>}
		</Container>
	);
}

const Container = styled.View<{ width?: string;}>`
	width: ${props => props.width || '95%'};
	margin-bottom: 20px;
	min-height: 80px;

	/* border: 1px solid red; */
`;

const Label = styled.Text`
	color: ${props => props.theme.textInput.text};
	font-size: 16px;
	margin-bottom: 5px;
`;

const Input = styled.TextInput`
	font-size: 18px;
	color: ${props => props.theme.textInput.text};

	width: 100%;
	height: 45px;
	padding-left: 10px;

	border: 1px solid ${props => props.theme.textInput.border};
	border-radius: 5px;

	border-bottom-width: 1px;
	border-bottom-color: ${props => props.theme.textInput.border};
`
