# OrderGenerator

**OrderGenerator** é uma aplicação frontend desenvolvida para um processo seletivo que simula a criação de pedidos. Foi construída utilizando os padrões modernos do React e segue uma arquitetura limpa de componentes, sendo uma base sólida para o desenvolvimento de interfaces escaláveis.

## Descrição

Este projeto gera e exibe pedidos simulados, com uma separação clara entre componentes de interface, serviços e lógica da aplicação. Utiliza TypeScript para segurança de tipos e Vite para builds rápidos durante o desenvolvimento. Ideal para demonstrar arquitetura frontend em avaliações técnicas.

## Técnicas Notáveis

- **[React Context API](https://react.dev/learn/passing-data-deeply-with-context)**: Utilizada para gerenciar estado global entre os componentes.
- **[Hooks Personalizados](https://react.dev/learn/reusing-logic-with-custom-hooks)**: Encapsulam lógicas reutilizáveis para interação com API e manipulação de formulários.
- **[CSS Modules](https://github.com/css-modules/css-modules)**: Auxilia no escopo local de estilos para os componentes.
- **[React Router](https://reactrouter.com/en/main/start/tutorial)**: Fornece navegação estruturada no cliente.

## Tecnologias Não Óbvias

- **[Vite](https://vitejs.dev/)**: Servidor de desenvolvimento e ferramenta de build com performance superior a setups tradicionais como Webpack.
- **[Axios](https://axios-http.com/)**: Para requisições HTTP e comunicação com APIs REST.
- **[React Icons](https://react-icons.github.io/react-icons/)**: Biblioteca popular de ícones com acesso a vários conjuntos em um único pacote.
- **[React Toastify](https://fkhadra.github.io/react-toastify/)**: Utilizado para notificações do tipo *toast* de forma não bloqueante e com configuração mínima.

## Estrutura do Projeto

```
OrderGenerator/
├── src/
│   ├── apis/
│   ├── assets/
│   │   └── styles/
│   ├── components/
│   ├── helpers/
│   ├── hooks/
│   ├── interfaces/
│   ├── layouts/
│   ├── models/
│   ├── pages/
│   ├── services/
│   ├── statics/
│   ├── App.tsx
│   ├── Routes.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
```

### Descrição dos Diretórios

- **apis/**: Configuração e lógica do cliente para APIs.
- **assets/styles/**: Estilos globais e específicos de componentes.
- **components/**: Elementos de interface reutilizáveis.
- **helpers/**: Funções utilitárias e constantes.
- **hooks/**: Hooks personalizados do React para padrões comuns.
- **interfaces/**: Interfaces TypeScript compartilhadas.
- **layouts/**: Wrappers de layout da aplicação.
- **models/**: Modelos de dados utilizados no app.
- **pages/**: Componentes baseados em rotas.
- **services/**: Lógica de negócio e camada de serviços.
- **statics/**: Recursos estáticos como imagens e ícones.
