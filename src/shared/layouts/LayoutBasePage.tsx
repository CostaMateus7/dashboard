import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAppDrawerContext } from '../context';

interface ILayoutBasePageProps {
  title: string;
  children: React.ReactNode;
}
export const LayoutBasePage = ({ children, title }: ILayoutBasePageProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { toogleDrawer } = useAppDrawerContext();
  return (
    <Box height="100%" gap={1} display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        height={theme.spacing(12)}
        gap={1}
      >
        {smDown ? (
          <IconButton onClick={toogleDrawer}>
            <Icon>menu</Icon>
          </IconButton>
        ) : (
          ''
        )}
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box>Barra de Ferramentas</Box>
      <Box>{children}</Box>
    </Box>
  );
};
