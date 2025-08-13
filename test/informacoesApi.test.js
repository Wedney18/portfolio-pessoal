const request = require('supertest');
const { expect } = require('chai');

describe('Informações da API', () => {
  describe('GET /endpoint disponível', () => {
    it('Deve retornar 200 com as informações da API e endpoints disponíveis', async () => {
      const respostaInformacoesApi = await request('http://localhost:3000')
        .get('/')
        .set('Content-Type', 'application/json');

      expect(respostaInformacoesApi.status).to.equal(200);
      expect(respostaInformacoesApi.body).to.deep.equal({
        success: true,
        message: 'API de Controle de Doadores de Sangue',
        version: '1.0.0',
        endpoints: {
          doadores: '/api/donors',
          documentacao: '/api-docs'
        }
      });
    });
  });

  describe('GET /endpoint indisponível', () => {
    it('Deve retornar 404 para um endpoint que não existe', async () => {
      const respostaInformacoesApi2 = await request('http://localhost:3000')
        .get('/endpoint-invalido')
        .set('Content-Type', 'application/json');

      expect(respostaInformacoesApi2.status).to.equal(404);
      expect(respostaInformacoesApi2.body).to.deep.equal({
        success: false,
        message: 'Endpoint não encontrado',
        error: 'ENDPOINT_NAO_ENCONTRADO',
        path: '/endpoint-invalido'
      });
    });
  });
});
