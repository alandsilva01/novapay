# NovaPay

> Aplicacao bancaria simulada desenvolvida como desafio tecnico.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss)

---

## Funcionalidades

- Login com validacao e persistencia de sessao
- Dashboard com saldo e extrato de transacoes
- Transferencia com validacao de formulario e saldo insuficiente
- Protecao de rotas autenticadas via PrivateRoute
- Toast de feedback apos transferencia
- Hook customizado useTransfer separando logica do componente

---

## Como rodar

bash
npm install
npm run dev


Acesse: http://localhost:5173

Credenciais de acesso:
- Email: user@novapay.com
- Senha: novapay123

---

## Stack

| Tecnologia | Uso |
|---|---|
| React + TypeScript | Base da aplicacao |
| Vite | Bundler e dev server |
| Tailwind CSS + CVA | Estilizacao utilitaria |
| shadcn/ui + Radix | Componentes acessiveis |
| React Router | Navegacao entre paginas |
| React Query | Camada de dados (pronto para API real) |
| Zustand | Estado global (auth + transacoes) |
| React Hook Form + Zod | Formularios e validacao |
| Axios | Cliente HTTP |
| Vitest | Testes unitarios |

---

## Estrutura do projeto

src/
  components/     # Componentes reutilizaveis (PrivateRoute, shadcn/ui)
  hooks/          # Hooks customizados (useTransfer)
  lib/            # Configuracoes (queryClient, utils)
  pages/          # Login, Dashboard, Transfer
  schemas/        # Schemas Zod de validacao
  store/          # Stores Zustand (auth, transactions)
  test/           # Testes Vitest


---

## Decisoes tecnicas

**Zustand com persist**: o authStore usa o middleware persist para salvar a sessao no localStorage, mantendo o usuario logado apos reload. O transactionStore nao persiste pois em producao os dados viriam de uma API REST.

**React Hook Form + Zod**: o Zod define o contrato de validacao como schema reutilizavel e tipado via z.infer. O RHF gerencia o estado do formulario com minimo de re-renders. Validacoes de negocio como saldo insuficiente sao tratadas no onSubmit ou em hooks customizados.

**PrivateRoute**: componente wrapper que verifica autenticacao antes de renderizar qualquer rota protegida, evitando acesso direto via URL sem login.

**useTransfer hook**: logica de transferencia extraida do componente para um hook customizado, seguindo o principio de separacao de responsabilidades e facilitando testes futuros.

**React Query**: configurado com staleTime de 5 minutos e retry 1, pronto para substituir os dados mock por chamadas reais sem alterar os componentes.

---

## Seguranca

Em producao, o app seria protegido por:

**Engenharia reversa**
- Minificacao e ofuscacao do bundle via Vite build
- Variaveis de ambiente via .env nunca expostas no cliente
- Code splitting para dificultar analise do codigo

**Vazamento de dados**
- Tokens JWT em httpOnly cookies (nunca localStorage)
- HTTPS obrigatorio em todas as rotas
- Headers de seguranca via helmet no backend
- Refresh token rotation com invalidacao no logout
- Logout automatico por inatividade (idle timeout)
- Rate limiting nas rotas de autenticacao

---

## Testes

bash
npm run test


3 testes unitarios cobrindo o fluxo de autenticacao:
- Estado inicial sem usuario autenticado
- Login atualiza estado corretamente
- Logout limpa o estado

---

## Melhorias futuras

- Integracao com API real substituindo os mocks
- Autenticacao JWT completa com refresh token
- Paginacao e filtros no extrato
- Testes de integracao com Testing Library
- PWA para uso mobile
- Internacionalizacao (i18n)
