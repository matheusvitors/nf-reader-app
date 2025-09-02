import React, { ReactNode } from "react";
import styled from "styled-components/native";

interface ScreenMessageProps {
	message: string;
	Button?: ReactNode
}

export const ScreenMessage: React.FC<ScreenMessageProps> = ({ message, Button }) => {
	return (
		<Container>
			<Message>{message}</Message>
			{Button}
		</Container>
	);
};

const Container = styled.View`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	width: 90%;
`;

const Message = styled.Text`
	color: ${(props) => props.theme.common.text};
	text-align: center;
	font-weight: bold;
	font-size: 16px;
`;
