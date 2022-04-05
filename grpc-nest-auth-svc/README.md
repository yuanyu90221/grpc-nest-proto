# grpc-nest-auth-svc

A microservice for auth

## package

```shell=
yarn add @nestjs/microservices @nestjs/typeorm @nestjs/jwt @nestjs/passport passport passport-jwt typeorm pg class-transformer class-validator bcrypt @hapi/joi
yarn add -D @types/node ts-proto @types/bcrypt @types/hapi__joi
```

## entity

```mermaid
erDiagram
    Auth {
      number id
      string email
      string password
    }
```