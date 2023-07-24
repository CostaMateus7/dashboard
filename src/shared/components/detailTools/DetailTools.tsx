import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Icon,
  MenuItem,
  MenuList,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

interface IDetailToolsProps {
  textNewButton?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndCloseButton?: boolean;

  showNewButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndCloseButtonLoading?: boolean;

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

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndCloseButtonLoading = false,

  onClickNew,
  onClickDelete,
  onClickSave,
  onClickSaveAndClose,
  onClickBack,
}: IDetailToolsProps) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToogleButtonMenu: () => void = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };
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
      {mdDown && (
        <ButtonGroup>
          <Button>Selecionar Opções</Button>
          <Button onClick={handleToogleButtonMenu}>
            {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </Button>
        </ButtonGroup>
      )}

      {isOpen && !!mdDown && (
        <Box
          marginTop={32}
          marginLeft={-31}
          zIndex={5}
          width={theme.spacing(30)}
          gap={2}
        >
          <Paper>
            <MenuList>
              <MenuItem onClick={onClickSave}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Icon>save</Icon>
                  <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    Salvar
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={onClickSaveAndClose}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Icon>save</Icon>
                  <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    Salvar e Fechar
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={onClickDelete}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Icon>delete</Icon>
                  <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    Apagar
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={onClickNew}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Icon>add</Icon>
                  <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    {textNewButton}
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={onClickBack}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Icon>arrow_back</Icon>
                  <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    Voltar
                  </Typography>
                </Box>
              </MenuItem>
            </MenuList>
          </Paper>
        </Box>
      )}
      {showSaveButton && !showSaveButtonLoading && !mdDown && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={onClickSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && !mdDown && <Skeleton width={100} height={60} />}
      {showSaveAndCloseButton && !showSaveAndCloseButtonLoading && !mdDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickSaveAndClose}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar e Fechar
          </Typography>
        </Button>
      )}
      {showSaveAndCloseButtonLoading && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {showDeleteButton && !showDeleteButtonLoading && !mdDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {showDeleteButtonLoading && !mdDown && (
        <Skeleton width={100} height={60} />
      )}

      {showNewButton && !showNewButtonLoading && !mdDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>add</Icon>}
          onClick={onClickNew}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textNewButton}
          </Typography>
        </Button>
      )}
      {showNewButtonLoading && !mdDown && <Skeleton width={100} height={60} />}

      {!mdDown && <Divider variant="middle" orientation="vertical" />}
      {showBackButton && !showBackButtonLoading && !mdDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {showBackButtonLoading && !mdDown && <Skeleton width={100} height={60} />}
    </Box>
  );
};
