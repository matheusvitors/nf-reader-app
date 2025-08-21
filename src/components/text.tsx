import React, { JSXElementConstructor, PropsWithChildren, ReactElement, ReactNode, ReactPortal } from 'react';
import styled from 'styled-components/native';

export const Text: React.FC<PropsWithChildren> = ({children}) => {
	return (<TextField>{children}</TextField>);
}

const TextField = styled.Text`
	color: ${props => props.theme.common.text};
`
