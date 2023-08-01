import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

import './shared/forms/YupTranslations';

import { AppDrawerProvider, AppThemeProvider } from './shared/context';
import { MenuLateral } from './shared/components';

function App() {
  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </AppDrawerProvider>
    </AppThemeProvider>
  );
}

export default App;
