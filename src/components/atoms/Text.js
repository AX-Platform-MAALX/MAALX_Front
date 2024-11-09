import styled from '@emotion/styled';

export const Text = styled.p`
	color: ${({ color }) => color || '#000'};
	${({bold}) => bold && 'font-weight: bold;'} 
`;