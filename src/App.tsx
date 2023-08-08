import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

import './shared/forms/YupTranslations';

import {
  AppDrawerProvider,
  AppThemeProvider,
  AuthProvider,
} from './shared/context';
import { MenuLateral } from './shared/components';

function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <AppDrawerProvider>
          <BrowserRouter>
            <MenuLateral>
              <AppRoutes />
            </MenuLateral>
          </BrowserRouter>
        </AppDrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;
