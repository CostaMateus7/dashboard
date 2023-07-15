import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAppDrawerContext, useAppThemeContext } from '../../context';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
interface IChildrenReact {
  children: React.ReactNode;
}
interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onclick: (() => void) | undefined;
}

export const ListItemLink = ({
  to,
  icon,
  label,
  onclick,
}: IListItemLinkProps) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });
  const handleClick = () => {
    onclick?.();
    navigate(to);
  };
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral = ({ children }: IChildrenReact) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toogleDrawer, drawerOptions } = useAppDrawerContext();
  const { toogleTheme } = useAppThemeContext();
  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toogleDrawer}
      >
        <Box width={theme.spacing(28)} display="flex" flexDirection="column">
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://avatars.githubusercontent.com/u/99267038?v=4"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  icon={drawerOption.icon}
                  key={drawerOption.path}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onclick={smDown ? toogleDrawer : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toogleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alterar Tema" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box marginLeft={smDown ? theme.spacing(0) : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
