# API de Controle de Doadores de Sangue

API RESTful para gerenciamento de informações de doadores de sangue para um hospital.

## 🚀 Funcionalidades

- ✅ Adicionar novos doadores
- ✅ Listar doadores por tipo sanguíneo
- ✅ Informações da API
- ✅ Remover doadores


## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## 🏃‍♂️ Como executar

```bash
npm start
```


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