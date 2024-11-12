import { Stack, Grid, useTheme } from '@mui/system';

export const Home = () => {
	const theme = useTheme();
	return (
		<Stack spacing={theme.spacing(4)}>
			<img src="/images/MainImg.png" alt="메인 이미지" height="90%" />
			<Grid container spacing={theme.spacing(6)} px={theme.spacing(20)}>
				<Grid size={4}>
					<img src="/images/SubImg1.png" alt="메인 이미지" width="100%" />
				</Grid>
				<Grid size={4}>
					<img src="/images/SubImg2.png" alt="메인 이미지" width="100%" />
				</Grid>
				<Grid size={4}>
					<img src="/images/SubImg3.png" alt="메인 이미지" width="100%" />
				</Grid>
			</Grid>
		</Stack>
	);
};
