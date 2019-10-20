# eng-zap-challenge-javascript

Dado o desafio em (https://grupozap.github.io/cultura/challenges/engineering.html), foi desenvolvido uma SPA de acordo com as regras propostas. 

### Pré-requisitos

* [Node.JS](https://nodejs.org/en/)

Sinta-se livre para usar comandos npm ou [yarn](https://yarnpkg.com/lang/en/)

### Configuração do projeto
```
yarn install
```

### Rode o projeto no modo de denvolvimento com hot-reload
```
yarn run serve
```

### Compile o projeto minificado para o modo de produção
```
yarn run build
```

### Rode o projeto no modo de produção
```
serve dist
```

### Rode testes de unidade
Abra o arquivo rulesImmobiles.spec.js, defina um ID em getImmobile(ID) para testar as regras de negócio

```
yarn run test:unit
```