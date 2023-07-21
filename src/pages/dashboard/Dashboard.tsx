import { Toolbar } from '..';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBasePage
      title="Página Inicial"
      toolbar={<Toolbar showInputSearch />}
    >
      Testando
    </LayoutBasePage>
  );
};
