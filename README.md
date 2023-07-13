<img src="https://i.imgur.com/1esyUnT.png"/>

# CodeQuiz

Este repositório contém o código-fonte do projeto CodeQuiz, uma plataforma de criação e jogo de quizzes focados em programação. A aplicação permite que os usuários criem seus próprios quizzes e os compartilhem com seus amigos. Além disso, inclui um sistema de autenticação para garantir que qualquer pessoa possa criar e jogar os quizzes.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Front-end:**
  - [React.js](https://reactjs.org/): Biblioteca JavaScript para a criação de interfaces de usuário.
  - [Styled-components](https://styled-components.com/): Biblioteca para estilização de componentes com CSS-in-JS.
  - [React-router-dom](https://reactrouter.com/): Roteamento e navegação para aplicativos React.
  - [React-hook-form](https://react-hook-form.com/): Biblioteca para gerenciar formulários em React.
  - [React-query](https://react-query.tanstack.com/): Biblioteca para gerenciamento de estado e caching de dados.
  - [Zustand](https://github.com/pmndrs/zustand): Biblioteca para gerenciamento de estado global em React.
  - [TypeScript](https://www.typescriptlang.org/): Linguagem de programação que adiciona tipagem estática ao JavaScript.

- **Back-end:**
  - [Node.js](https://nodejs.org/): Ambiente de execução JavaScript no servidor.
  - [Express.js](https://expressjs.com/): Framework web para Node.js.
  - [MongoDB](https://www.mongodb.com/): Banco de dados NoSQL orientado a documentos.
  - [Hapi Joi](https://hapi.dev/module/joi/): Biblioteca para validação de dados em Node.js.
  - [JWT](https://jwt.io/): JSON Web Tokens para autenticação e geração de tokens.
  - [bcrypt](https://www.npmjs.com/package/bcrypt): Biblioteca para criptografia de senhas em Node.js.
  - [TypeScript](https://www.typescriptlang.org/): Linguagem de programação que adiciona tipagem estática ao JavaScript.

## Funcionalidades

O projeto CodeQuiz possui as seguintes funcionalidades:

- Criação de quizzes:
  - Os usuários podem criar seus próprios quizzes.
  - Eles podem adicionar perguntas, respostas e escolher a resposta correta.

- Autenticação de usuários:
  - Os usuários podem se autenticar para criar e salvar seus quizzes.

- Jogo de quizzes:
  - Os usuários podem jogar os quizzes criados por outras pessoas.

<img src="https://i.imgur.com/deiPMC7.png"/>

# Formulário de Registro Interativo

O CodeQuiz possui um formulário de registro interativo, projetado para fornecer uma experiência de usuário agradável e intuitiva. O formulário de registro é apresentado em uma interface de blocos editáveis de código, proporcionando uma sensação familiar para os desenvolvedores.

Ao preencher o formulário, os usuários são solicitados a inserir informações como nome de usuário, senha e endereço de e-mail. Cada campo de entrada é formatado como um bloco de código editável, com destaque de sintaxe para facilitar a visualização.

### Validação Baseada em Lógica de Programação

Após o preenchimento dos campos do formulário de registro, o CodeQuiz realiza uma validação baseada em lógica de programação. Os usuários são desafiados a resolver um pequeno problema ou responder a uma pergunta lógica antes que o registro seja concluído.

Essa abordagem garante que apenas usuários reais e genuínos sejam registrados no CodeQuiz, ao mesmo tempo em que adiciona um elemento divertido e interativo ao processo de registro.

<img src="https://i.imgur.com/VaSGHsG.png"/>

## Edição da Foto de Perfil

O CodeQuiz oferece a funcionalidade de edição da foto de perfil dos usuários, permitindo que eles personalizem sua imagem de perfil de maneira única. Para tornar o processo mais conveniente, o CodeQuiz fornece uma seleção de imagens pré-selecionadas que são obtidas do backend.

Ao acessar a página de edição de perfil, os usuários podem navegar por uma galeria de imagens pré-selecionadas. Essas imagens podem incluir avatares, ícones ou qualquer outra imagem adequada para um perfil de usuário. Os usuários podem selecionar uma das imagens disponíveis para ser usada como sua foto de perfil.

<img src="https://i.imgur.com/vlEfidK.png"/>
<img src="https://i.imgur.com/j8l2I87.png"/>
<img src="https://i.imgur.com/IE8BUoE.png"/>
<img src="https://i.imgur.com/3BnCWUH.png"/>
<img src="https://i.imgur.com/HS7z5s1.png"/>
<img src="https://i.imgur.com/RN3Mr6P.png"/>

## Página de Criação de um Quiz

A página de criação de um quiz no CodeQuiz permite que os usuários definam as informações gerais do quiz, bem como os detalhes de cada desafio. Essa página é projetada para facilitar a criação de quizzes personalizados e desafiadores.

### Informações Gerais do Quiz

Antes de adicionar os desafios individuais, os usuários podem definir as seguintes informações gerais do quiz:

- Linguagem do Quiz: Os usuários podem selecionar a linguagem do quiz entre as opções disponíveis, como JavaScript, CSS e HTML.

- Nível dos Desafios: Os usuários podem escolher o nível de dificuldade dos desafios, como iniciante, intermediário, avançado ou nível assembly.

- Tempo de Resolução dos Desafios: Os usuários podem definir o tempo máximo de resolução para cada desafio, selecionando uma das opções de tempo disponíveis, como 120s, 90s, 60s ou 30s.

As informações gerais do quiz são salvas localmente no navegador utilizando o LocalStorage, permitindo que os usuários continuem a criação do quiz posteriormente.

### Detalhes de Cada Desafio

Após definir as informações gerais do quiz, os usuários podem adicionar os desafios individuais, seguindo os passos abaixo para cada desafio:

1. Questão: Os usuários devem fornecer uma questão para o desafio.

2. Complemento da Questão: Aqui, os usuários têm a opção de adicionar um bloco de código como complemento à questão. Eles podem selecionar a linguagem de programação apropriada para o bloco de código e utilizar recursos de autocomplete para facilitar a escrita do código.

3. Imagem (Em desenvolvimento): Ainda em desenvolvimento, a opção de adicionar uma imagem relacionada ao desafio estará disponível em breve.

4. Alternativas: Os usuários devem criar as alternativas para a questão, sendo uma delas a resposta correta.

Os usuários podem adicionar quantos desafios desejarem, seguindo o mesmo processo para cada um deles.

Com a página de criação de um quiz do CodeQuiz, os usuários têm total flexibilidade para personalizar os desafios e criar quizzes envolventes e interativos.

Lembre-se de implementar a funcionalidade de salvamento das informações no LocalStorage e finalizar a opção de adicionar imagens relacionadas aos desafios quando estiverem prontas.

<img src="https://i.imgur.com/rNgWbba.png"/>

## Página dos Quizzes

A página dos quizzes no CodeQuiz permite aos usuários explorar os quizzes disponíveis e encontrar os desafios que desejam enfrentar. Essa página fornece opções de filtragem composta para ajudar os usuários a encontrar os quizzes mais relevantes para eles.

### Opções de Filtragem Composta

Na página dos quizzes, os usuários podem utilizar as seguintes opções de filtragem composta:

- Linguagem do Quiz: Os usuários podem selecionar uma linguagem específica, como JavaScript, CSS ou HTML, para encontrar quizzes relacionados a essa linguagem.

- Nível de Dificuldade: Os usuários podem escolher o nível de dificuldade desejado, como iniciante, intermediário, avançado ou nível assembly, para filtrar os quizzes de acordo com sua experiência e conhecimento.

Com essas opções de filtragem composta, os usuários podem refinar a lista de quizzes e encontrar os desafios mais adequados às suas preferências e necessidades.

### Informações Iniciais do Projeto

Além das opções de filtragem, a página dos quizzes também exibe informações iniciais sobre cada projeto, incluindo:

- Data de Criação: A data em que o projeto foi criado, fornecendo informações sobre sua relevância e atualidade.

- Nome e Foto do Criador: O nome e a foto da pessoa que criou o projeto, permitindo que os usuários identifiquem a autoria e acreditem na qualidade do quiz.

Essas informações iniciais ajudam os usuários a ter uma visão geral dos quizzes disponíveis e a fazer escolhas informadas sobre quais desafios explorar.

Lembre-se de implementar a funcionalidade de filtragem composta de acordo com os critérios definidos e exibir corretamente as informações iniciais do projeto, garantindo que estejam atualizadas e refletindo corretamente os dados do quiz.


