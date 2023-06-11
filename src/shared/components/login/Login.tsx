import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

export const Login = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card sx={{ p: '20px' }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            width="400px"
          >
            <Typography align="center">Registre-se</Typography>
            <TextField fullWidth label="Nome" />
            <TextField fullWidth label="CPF" />
            <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
              <InputLabel id="select-helper-label">Mesa</InputLabel>
              <Select label="Mesa" value="mesa" labelId="select-helper-label">
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={() => console.log('login')}
              fullWidth
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
