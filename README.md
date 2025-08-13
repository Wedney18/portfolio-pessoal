# API de Controle de Doadores de Sangue de um Hospital

API REST  para gerenciamento de informações de doadores de sangue para um hospital.

## 🚀 Funcionalidades

- ✅ Informações da API
- ✅ Adicionar novos doadores
- ✅ Listar todos os doadores
- ✅ Remover doador

# Tecnologias Utilizadas
Node.js - Runtime JavaScript
Express.js - Framework 
Swagger - Documentação da API
Mocha - Framework de testes para JavaScript
Supertest - Biblioteca do Node.js usada principalmente para testar APIs HTTP de forma automatizada
Chai - Biblioteca de asserções (ou "afirmações") para JavaScript


## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório em: https://github.com/Wedney18/portfolio-pessoal.git
2. Instale as dependências:
```bash
npm install
```

## 🏃‍♂️ Como executar

```bash
npm start
```
# Endpoints da API
# Base URL
http://localhost:3001


# Endpoints Disponíveis
• GET /Informações da API           
• POST /donors Adicionar novo doador              
• GET /donors - Listar todos os doadores               
• DELETE /donors/{id} - Remover doador


## 📚 Documentação

A documentação interativa está disponível em: `http://localhost:3000/api-docs`


## 📊 Estrutura do Projeto

```
src/
├── app.js              # Configuração principal da aplicação
├── controllers/
│   └── donorsController.js  # Lógica de negócio
├── models/
│   └── donor.js        # Modelo de dados
├── routes/
│   └── donors.js       # Definição de rotas
└── swagger/
    └── swagger.json    # Documentação da API
```


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
