const express = require('express');
const bodyParser = require('body-parser');
const donorRoutes = require('./routes/donors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(bodyParser.json());

// Middleware para logging de requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rotas
app.use('/api/donors', donorRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        validatorUrl: null,
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        docExpansion: 'list',
        filter: true,
        showRequestHeaders: true,
        showCommonExtensions: true,
        tryItOutEnabled: true,
        requestInterceptor: function(request) {
            // Remove validações automáticas
            return request;
        },
        // Configurações para mostrar servidores
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor de Desenvolvimento Local'
            },
            {
                url: 'https://api-doador-sangue.herokuapp.com/api',
                description: 'Servidor de Produção'
            }
        ],
        // Personalizar a interface para mostrar "Servers" em vez de "Schemes"
        defaultModelsExpandDepth: -1,
        defaultModelExpandDepth: 1,
        displayRequestDuration: true,
        showExtensions: true,
        showCommonExtensions: true
    },
    customCss: `
        .swagger-ui .scheme-container { 
            display: none !important; 
        } 
        .swagger-ui .servers-container { 
            display: block !important; 
        }
        .swagger-ui .servers-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .swagger-ui .servers-select {
            margin-bottom: 20px;
        }
    `,
    customSiteTitle: 'API de Controle de Doadores de Sangue - Documentação'
}));

// Rota GET / para informações da API
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "API de Controle de Doadores de Sangue",
        version: "1.0.0",
        endpoints: {
            doadores: "/api/donors",
            documentacao: "/api-docs"
        }
    });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint não encontrado',
        error: 'ENDPOINT_NAO_ENCONTRADO',
        path: req.originalUrl
    });
});

// Middleware de tratamento de erros global removido para evitar códigos 400 e 500

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});