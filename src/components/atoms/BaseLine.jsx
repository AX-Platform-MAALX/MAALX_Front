import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';

export const BaseLine = () => {
	return (
		<Global
			styles={css`
				${emotionReset}                     
                @font-face {
                    font-family : 'NoonnuBasicGothicRegular';
                    src : url(/fonts/NoonnuBasicGothicRegular.ttf);
                    font-display: swap;
                }
				*, *::after, *::before {
					box-sizing: border-box;
					-moz-osx-font-smoothing: grayscale;
					-webkit-font-smoothing: antialiased;
					font-smoothing: antialiased;
                    font-family: 'NoonnuBasicGothicRegular', sans-serif;

				}
			`}
		/>
	);
};
