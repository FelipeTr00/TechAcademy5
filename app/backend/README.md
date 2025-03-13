# RODAR O BACKEND

### .env
```
    DB_HOST=localhost
    DB_PORT=3307
    DB_USER=root
    DB_PASSWD=root
    DATABASE=db
    JWT_SECRET=Ae74Tsdf799Hw92-3f-0-vqd8-99999
    JWT_EXPIRES_IN=7d


```



### docker & mysql
```
    docker compose up -d
```

### iniciar o yarn e instalar deps
```
    yarn init -y
    yarn install
```

### rodar o servidor
```
    yarn dev
```

### se não deu nenhum xabú
```
// terminal:
[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts
[nodemon] starting `tsx src/server.ts`
Servidor: http://localhost:5000/

```