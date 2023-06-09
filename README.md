# APP
GymPAss Style App

# RFs 
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o numero de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias próximas até 10km
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível o validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia
## RNs
- [x] O usuário nao deve poder se cadastrar com email duplicado
- [x] O usuário nao pode fazer 2 check-ins no mesmo dia
- [x] O usuário nao pode fazer check-in se nao estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após criado
- [x] o check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por Administradores
## RNFs
- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da Aplicação precisa estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT

## Tech Utilizadas
- NodeJS
- Typescript
- SQL (PostgreSQL)
- fastify
- zod
- prisma ORM
- docker
## tests
- vitest
- testes unitários
- testes E2E
- testes de integração
- TDD

## excetue
Ter Node Instalado
`npm install`
`npm run dev` para acessar o aplicativo em desenvolvimento 
`Docker compose up` executar os dockers containers
