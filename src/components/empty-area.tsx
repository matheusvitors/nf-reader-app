import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';

export const EmptyArea: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Container>
			{children}
		</Container>
	);
}

const Container = styled.View`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	width: 100%;

	padding-top: 10%;
`;

