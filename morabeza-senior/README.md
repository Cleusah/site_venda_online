# Morabeza Senior — Loja Virtual (Frontend)

Frontend completo em React + Material UI para a loja **Morabeza Senior**, especializada em produtos
para idosos acamados e apoio a cuidadores. Este pacote contém **apenas o frontend**, com dados de
exemplo (mock) — sem backend/API real.

## Como executar

Requisitos: [Node.js](https://nodejs.org) 18 ou superior.

```bash
npm install
npm run dev
```


Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Contas de demonstração

- **Backoffice (admin):** `admin@morabezasenior.cv` / `admin123`
- **Cliente:** pode criar uma conta nova em "Criar Conta", ou entrar como **Cleu Andrade**
  (crie a conta com o nome exato "Cleu Andrade" para ver um histórico de encomendas de exemplo).

## Estrutura principal

```
src/
  data/            → produtos, categorias, encomendas e clientes (mock)
  context/         → Carrinho, Autenticação e Acessibilidade (React Context)
  components/
    layout/        → Header, Footer, Layout público e Layout do backoffice
    product/       → Cartão de produto, filtros de categoria/preço
  pages/           → Home, Loja, Produto, Carrinho, Checkout, Login, Registo, Conta
  pages/admin/     → Painel, Produtos/Stock, Encomendas, Clientes, Relatórios
```

## Funcionalidades incluídas

- Catálogo com filtros por categoria, preço e pesquisa
- Página de produto com quantidade, especificações e "comprar agora"
- Carrinho persistente (localStorage) e checkout em 3 passos (entrega, pagamento, confirmação)
- Login/Registo com sessão persistente e conta de utilizador com histórico de encomendas
- Painel administrativo (backoffice) protegido por login de admin:
  - Gestão de produtos e stock (criar, editar, remover, atualizar stock)
  - Gestão de encomendas com alteração de estado
  - Listagem de clientes
  - Relatórios de vendas com gráficos (Recharts)
- Design acessível: botões e áreas de toque grandes, alto contraste, controlo de tamanho de
  texto no cabeçalho (A- / A+), navegação por teclado com foco visível
- Totalmente responsivo (mobile first)

## Próximos passos (backend)

Este projeto usa dados mock em `src/data/` e `localStorage` para simular sessão e carrinho.
Para produção, estes pontos devem ser ligados a uma API real:
- Autenticação (login/registo) e proteção de rotas admin
- Catálogo de produtos e stock
- Criação e gestão de encomendas
- Pagamentos (gateway real: Vinti4/Multibanco, cartão, etc.)
