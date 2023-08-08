import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAppDrawerContext } from '../context';
import React from 'react';

interface ILayoutBasePageProps {
  title: string;
  children: React.ReactNode;
  toolbar?: React.ReactNode;
}
export const LayoutBasePage = ({
  children,
  title,
  toolbar,
}: ILayoutBasePageProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { toogleDrawer } = useAppDrawerContext();
  return (
    <Box height="100%" gap={1} display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        gap={1}
      >
        {smDown ? (
          <IconButton onClick={toogleDrawer}>
            <Icon>menu</Icon>
          </IconButton>
        ) : (
          ''
        )}
        <Typography
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        >
          {title}
        </Typography>
      </Box>
      {toolbar && <Box>{toolbar}</Box>}
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
