import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useAuthContext } from '../../context';
import { useState } from 'react';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).required(),
});

interface IChildrenLoginProps {
  children: React.ReactNode;
}

export const Login = ({ children }: IChildrenLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { isAuthenticated, login } = useAuthContext();

  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dataValidated) => {
        login(dataValidated.email, dataValidated.password).then(() =>
          setIsLoading(false),
        );
      })
      .catch((erros: yup.ValidationError) => {
        setIsLoading(false);
        erros.inner.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
  };
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card>
          <CardContent>
            <Box width="250px" display="flex" flexDirection="column" gap={2}>
              <Typography textAlign="center" variant="h6">
                Identifique-se
              </Typography>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                label="Email"
                error={!!emailError}
                helperText={emailError}
                type="email"
                onKeyDown={() => setEmailError('')}
                disabled={isLoading}
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                label="Senha"
                error={!!passwordError}
                helperText={passwordError}
                type="password"
                onKeyDown={() => setPasswordError('')}
                disabled={isLoading}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
                endIcon={
                  isLoading ? (
                    <CircularProgress
                      variant="indeterminate"
                      size={20}
                      color="inherit"
                    />
                  ) : undefined
                }
              >
                Entrar
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    );
  }
};
