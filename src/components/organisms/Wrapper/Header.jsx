import { Stack, useTheme } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import { Logo, TextButton, Button } from '../../atoms/index.js';

export const Header = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const handleLocationClick = (path) => () => {
		navigate(path);
	};

	return (
		<Stack
			compoennt="header"
			direction="row"
			justifyContent="space-between"
			px={theme.spacing(2)}
			sx={{ height: '80px' }}
		>
			<Link to="/">
				<Logo />
			</Link>
			<Stack direction="row" spacing={theme.spacing(2)} alignItems="center">
				<TextButton onClick={handleLocationClick('/service-info')}>서비스 안내</TextButton>
				<TextButton onClick={handleLocationClick('/consulting')}>컨설팅</TextButton>
				<Button onClick={handleLocationClick('/login')}>Login</Button>
			</Stack>
		</Stack>
	);
};
