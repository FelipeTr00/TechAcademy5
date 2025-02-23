DOCKER COMPOSE - FIRST STEPS
---

### Estrutura do APP

```
/meu-projeto
│── /backend         # Aplicação backend (Node.js + Express)
│── /frontend        # Aplicação frontend (React, Vue ou Angular)
│── docker-compose.yml
│── Dockerfile       # Arquivo para criar as imagens
│── .dockerignore
```

### Build
    docker-compose up --build

### Chegar logs
    docker ps

### Acessar o backend: 
    http://localhost:3000

