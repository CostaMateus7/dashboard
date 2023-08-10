Projeto "Dashboard" em React com TypeScript e Material UI
Bem-vindo ao repositório do projeto "Dashboard"! Este é um aplicativo desenvolvido usando as tecnologias React, TypeScript e Material UI. Ele foi projetado para oferecer uma interface intuitiva e eficiente para gerenciamento de informações relacionadas a cidades e pessoas. O projeto utiliza o JSON Server para simular uma API e fornecer dados fictícios.

Funcionalidades Principais
Login : O aplicativo possui um sistema de autenticação que permite aos usuários realizar o login com segurança, protegendo o acesso às funcionalidades principais.

CRUD de Cidades : O Dashboard oferece a capacidade de criar, ler, atualizar e excluir informações sobre cidades. Os usuários podem adicionar detalhes como nome da cidade, população e informações relevantes.

CRUD de Pessoas : Além das cidades, o aplicativo permite o gerenciamento de informações pessoais. Os usuários podem executar operações CRUD (criar, ler, atualizar e excluir) para manter um registro detalhado de pessoas.

Relacionamento entre Cidades e Pessoas : O projeto também oferece a funcionalidade de relacionar pessoas a cidades. Isso permite que os usuários associem indivíduos a locais específicos, fornecendo insights valiosos para análises.

Como Iniciar
Instalação : Certifique-se de ter o Node.js instalado em seu sistema. Clone este repositório para sua máquina local e navegue até o diretório do projeto via terminal. Execute o comando npm installpara instalar conforme as dependências necessárias.

Iniciar o Servidor JSON : Antes de iniciar o aplicativo, você precisa iniciar o servidor JSON simulado para fornecer dados fictícios. No terminal, execute o comando `npx json-server --watch -p 3000 ./mock/database.json`
para iniciar o servidor na porta 3000.

Iniciar o Aplicativo : Com o servidor JSON em execução, abra outro terminal na pasta do projeto e execute o comando npm run dev para iniciar o aplicativo. O aplicativo estará disponível em http://localhost:5173/.

Login : Ao acessar o aplicativo, você será direcionado para a página de login. Use as credenciais fornecidas para acessar o painel principal.
