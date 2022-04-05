# grpc-nest-order-svc

A microservice for order

## package

```shell
yarn add @nestjs/microservices @nestjs/typeorm @nestjs/jwt @nestjs/passport passport passport-jwt typeorm pg class-transformer class-validator bcrypt @hapi/joi
yarn add -D @types/node ts-proto @types/bcrypt @types/hapi__joi
```

## add script

```json
{
  "proto:install": "yarn add git+https://github.com/yuanyu90221/grpc-nest-proto.git",
  "proto:order": "protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./node_modules/grpc-nest-proto/proto --ts_proto_out=src/order/proto/ node_modules/grpc-nest-proto/proto/order.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb",
  "proto:product": "protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./node_modules/grpc-nest-proto/proto --ts_proto_out=src/order/proto/ node_modules/grpc-nest-proto/proto/product.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb",
  "proto:all": "npm run proto:order && npm run proto:product"
}
```

## entity

```mermaid
erDiagram
  Order {
    number id
    decimal price
    integer productId
    integer userId
  }
```