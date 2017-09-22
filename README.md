## graphQL 服务器


技术栈: Typescript + Thrift + Express + graphQL + MongoDB


### 生成证书

生成thrift需要的key, 证书等

```bash
cd ./cert
openssl genrsa -out ryans-key.pem 2048
openssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem
openssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem
```

### 开发调试

```bash
git clone https://github.com/axetroy/graphQL-example.git
cd ./graphQL-example
yarn && yarn add global ts-node-dev
yarn start
```