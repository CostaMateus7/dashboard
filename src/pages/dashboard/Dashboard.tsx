import { DetailTools } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBasePage
      title="Página Inicial"
      toolbar={<DetailTools showSaveAndCloseButton />}
    >
      Testando
    </LayoutBasePage>
  );
};
