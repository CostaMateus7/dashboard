import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IDetailToolsProps {
  textNewButton?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndCloseButton?: boolean;

  onClickNew?: () => void;
  onClickDelete?: () => void;
  onClickSave?: () => void;
  onClickSaveAndClose?: () => void;
  onClickBack?: () => void;
}

export const DetailTools = ({
  textNewButton = 'Novo',
  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndCloseButton = false,

  onClickNew,
  onClickDelete,
  onClickSave,
  onClickSaveAndClose,
  onClickBack,
}: IDetailToolsProps) => {
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
      {showSaveButton && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={onClickSave}
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>
      )}
      {showSaveAndCloseButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickSaveAndClose}
          startIcon={<Icon>save</Icon>}
        >
          Salvar e Fechar
        </Button>
      )}
      {showDeleteButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickDelete}
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>
      )}
      {showNewButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>add</Icon>}
          onClick={onClickNew}
        >
          {textNewButton}
        </Button>
      )}
      <Divider variant="middle" orientation="vertical" />
      {showBackButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
