
# NovaPay

App bancario simulado desenvolvido como desafio tecnico.

## Como rodar

npm install

npm run dev

Acesse: http://localhost:5173

Credenciais: user@novapay.com / novapay123

## Stack

- React + TypeScript + Vite

- Tailwind CSS + CVA

- shadcn/ui + Radix

- React Router

- React Query

- Zustand

- React Hook Form + Zod

- Axios

- Vitest

## Decisoes tecnicas

Zustand foi escolhido pelo estado global simples e sem boilerplate. O authStore usa persist para manter a sessao apos reload. O transactionStore nao persiste pois em producao os dados viriam de uma API.

React Hook Form + Zod separam responsabilidades: o Zod define o contrato de validacao em schema reutilizavel, o RHF gerencia o formulario com minimo de re-renders. Validacoes de negocio como saldo insuficiente ficam no onSubmit.

PrivateRoute protege rotas autenticadas redirecionando para login caso o usuario nao esteja autenticado, evitando acesso direto pela URL.

React Query configurado com staleTime de 5 minutos e retry 1, pronto para substituir os dados mock por chamadas reais de API.

## Seguranca

Em producao, o app seria protegido por:

Engenharia reversa: minificacao e ofuscacao do bundle via Vite build, variaveis de ambiente via .env nunca expostas no cliente.

Vazamento de dados: tokens JWT armazenados em httpOnly cookies e nao localStorage, HTTPS obrigatorio, headers de seguranca via helmet no backend, refresh token rotation, logout automatico por inatividade.

## Melhorias futuras

- Integrar API real substituindo os mocks

- Adicionar autenticacao JWT completa

- Paginacao no extrato

- Filtros por data e tipo de transacao

- Testes de integracao com Testing Library

- PWA para uso mobile

## Testes

npm run test

3 testes unitarios cobrindo o fluxo de autenticacao: login, logout e estado inicial.

