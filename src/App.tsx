import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

import './shared/forms/YupTranslations';

import {
  AppDrawerProvider,
  AppThemeProvider,
  AuthProvider,
} from './shared/context';
import { Login, MenuLateral } from './shared/components';

function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <AppDrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </AppDrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;
