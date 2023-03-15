# APP
GymPAss Style App

# RFs 
- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível o validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia
## RNs
- [] O usuário nao deve poder se cadastrar com email duplicado
- [] O usuário nao pode fazer 2 check-ins no mesmo dia
- [] O usuário nao pode fazer check-in se nao estiver perto (100m) da academia
- [] O check-in só pode ser validado até 20 minutos após criado
- [] o check-in só pode ser validado por administradores
- [] A academia só pode ser cadastrada por Administradores
## RNFs
- [] A senha do usuário precisa estar criptografada
- [] Os dados da Aplicação precisa estar persistidos em um banco PostgreSQL
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [] O usuário deve ser identificado por um JWT

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

## excetue
Ter Node Instalado
`npm install`
`npm run dev` para acessar o aplicativo em desenvolvimento 
`Docker compose up` executar os dockers containers

- partners 