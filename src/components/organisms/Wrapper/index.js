import { Container, Stack, useTheme } from '@mui/system';
import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';

export const Wrapper = ({ children }) => {
	const theme = useTheme();

	return (
		<Container maxWidth={false} disableGutters>
			<Header />
			<Stack component="main" py={theme.spacing(4)} sx={{ height: 'calc(100vh)' }}>
				{children}
			</Stack>
			<Footer />
		</Container>
	);
};
