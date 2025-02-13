# TechAcademy5

# Requisitos

## Autenticação (Backend) - N5
- Login com e-mail e senha
- Senha criptografada no banco
- Validação de e-mail (regex)
- Retorno JWT
- Logar apenas usuário existente

## Cadastro de usuário (Backend) - N5
- Cadastro com os campos obrigatórios:
  - Nome
  - Email
  - Senha
  - CPF
- Validação de CPF
- Validação de nível de senha
- Validação de email

## Edição de usuário (Backend) - N5
- Rota autenticada
- Só pode editar o próprio usuário
- Garantir que todos os campos são obrigatórios
- Validação de CPF
- Validação de nível de senha
- Não permitir que o usuário altere o email

## CRUDS Completos (Backend) - N5
- 3 CRUDS completos
- 3 CRUDS com todas as rotas autenticadas
- Paginação das listagens
- Não editar/deletar recursos que não existem
- Ao menos 1 relacionamento entre os recursos

## Autenticação (Frontend) - N5
- Campos para email e senha
- Validação de email (regex)
- Armazenar o token no localstorage
- Lidar com os erros da API de forma amigável para o usuário
- Redirecionar para a área logada

## Cadastro de usuário (Frontend) - N5
- Campos obrigatórios:
  - Nome
  - Email
  - Senha
  - CPF
- Verificação dupla de senha
- Validação de CPF
- Validação de email
- Redirecionar para o login após o cadastro
- Lidar com as mensagens de erro da API

## Edição de usuário (Frontend) - N5
- Utilizar contexto para exibir informações do usuário globalmente
- Validação de CPF
- Validação de nível de senha
- Confirmação da senha
- Não permitir que o usuário altere o email

## CRUDS Completos (Frontend) - N5
- 3 CRUDS completos
- Paginação das listagens
- Validação dos campos obrigatórios
- Paginação e cadastro/edição em telas separadas

## Componentização (Frontend) - N5
- Componentes genéricos e reutilizáveis
- Telas compostas por vários componentes
- Separação dos componentes e páginas em pastas separadas
- Componentes exclusivos da página em funções separadas

## Código Limpo (Backend) - N5
- Nomes significativos (variáveis, funções, classes, métodos, atributos)
- Responsabilidade única
- Uso correto dos status HTTP
- Mensagem coerente com o status HTTP
- Funções com no máximo 10 linhas
- Máximo 3 parâmetros por função

## Uso de TypeScript e POO (Tech Forge) - N5
- Criação de types globais (front e back)
- Não utilizar `any` e `unknown` (front e back)
- Declarar os tipos (front e back)
- Programação orientada a objetos (backend)

## Testes (Tech Forge) - N5
- O aluno implementou todos os casos de teste com etapas de verificação suficientes para garantir o cumprimento dos requisitos informados no enunciado
- Todos os testes passaram
