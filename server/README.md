
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Database installation

- Esse projeto está utilizando Docker com docker-compose. Para executar subir o banco de dados deve-se:

Na raiz do projeto executar para montar o banco de dados
```bash
$ docker-compose -f ./docker/docker-compose.yml up
```

Para desmontar o banco de dados
```bash
$ docker-compose -f ./docker/docker-compose.yml down
```

Ainda dentro da pasta .docker existe um script `(init.sql)` para adicionar produtos que são pré-carregados já no momento que o docker-compose constrói o container.

## Server Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
