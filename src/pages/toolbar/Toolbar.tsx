import {
  Box,
  Button,
  Icon,
  // InputAdornment,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';

interface IToolbarProps {
  searchText?: string;
  showInputSearch?: boolean;
  changeTextSearch?: (newText: string) => void;
  textNewButton?: string;
  showNewButton?: boolean;
  clickInNew?: () => void;
}

export const Toolbar = ({
  searchText = '',
  showInputSearch = false,
  changeTextSearch,
  textNewButton = 'novo',
  showNewButton = true,
  clickInNew,
}: IToolbarProps) => {
  const theme = useTheme();
  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      gap={1}
      component={Paper}
    >
      {showInputSearch && (
        <TextField
          InputProps={{
            startAdornment: (
              // <InputAdornment position="start">
              <Icon>search</Icon>
              // </InputAdornment>
            ),
          }}
          value={searchText}
          size="small"
          placeholder="Pesquisar..."
          onChange={(e) => changeTextSearch?.(e.target.value)}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            endIcon={<Icon>add</Icon>}
            onClick={clickInNew}
          >
            {textNewButton}
          </Button>
        )}
      </Box>
    </Box>
  );
};
