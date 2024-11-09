import { Stack, useTheme } from '@mui/system';
import { Text } from '../../atoms/index.js';

export const Footer = () => {
	const theme = useTheme();

	return (
		<Stack py={8} px={2} component="footer" sx={{ backgroundColor: '#302F3D' }} spacing={theme.spacing(2)}>
			<Text bold color="white">
				MAALX
			</Text>
			<Text color="white">AI전환플랫폼 B팀 윤현수 최영서 조현정 정은우</Text>
		</Stack>
	);
};
